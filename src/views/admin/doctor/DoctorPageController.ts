import Vue from 'vue'
import moment from 'moment'
import Component from 'vue-class-component'
import validator from 'validator'
import Frame from '@/components/Frame.vue'
import Empty from '@/components/Empty.vue'
import DeletePromt from '@/components/DeletePromt.vue'
import DoctorModel from '@/models/DoctorModel'
import Crud from '@/views/Crud'
import RoleModel from '@/models/RoleModel'
import DoctorService from '@/services/DoctorService'
import Notify from '@/components/Notify'
import PersonalService from '@/services/PersonalService'

@Component({
  name: 'DoctorPage',
  components: {
    Frame,
    Empty,
    DeletePromt
  }
})
export default class DoctorPageController extends Vue implements Crud<DoctorModel> {
  /********************************************************
  *                      Attributes                       *
  ********************************************************/

  // GUI
  private dialog: boolean = false
  private search: string = ''
  private headers: any[] = []
  private pagination: any = {}
  private personalCredential: string = ''

  // Element data
  private elements: DoctorModel[] = []
  private elementIndex: number = -1
  private element: DoctorModel = new DoctorModel()

  // Validations
  private rules: any = {
    required: [(v: string) => (v && v.length > 0) || 'Atributo requerido.'],
    numeric: [
      (v: string) => {
        let validation: any = true
        if (v && v.length > 0) { validation = v.length === 10 || 'formato invalido' }
        return validation
      }
    ],
    email: [
      (v: string) => (v && v.length > 0) || 'Atributo requerido.',
      (v: string) => validator.isEmail(v) || 'El  correo ingresado no es valido.'
    ]
  }

  /********************************************************
  *                     Initializable                     *
  ********************************************************/

  beforeMount (): void {
    this.pagination = { rowsPerPage: 0 }
    this.headers = [
      { name: 'lastName', field: 'lastName', label: 'Apellidos', align: 'left', sortable: true },
      { name: 'firstName', field: 'firstName', label: 'Nombres', align: 'left', sortable: true },
      { name: 'dni', field: 'dni', label: 'Cédula', align: 'left', sortable: true },
      { name: 'passport', field: 'passport', label: 'Pasaporte', align: 'left', sortable: true },
      { name: 'address', field: 'address', label: 'Dirección', align: 'left', sortable: false },
      { name: 'telephone', field: 'telephone', label: 'Teléfono', align: 'left', sortable: false },
      { name: 'mobile', field: 'mobile', label: 'Celular', align: 'left', sortable: false },
      { name: 'emailAddress', field: 'emailAddress', label: 'Correo', align: 'left', sortable: false },
      { name: 'action', field: 'action', label: 'Acciones', align: 'center' }
    ]
  }

  async created (): Promise<void> {
    await this.$store.dispatch('loadRoles')
    await this.findElements()
  }

  /********************************************************
  *                    API Services                       *
  ********************************************************/
  async createElement (): Promise<void> {
    const service: DoctorService = new DoctorService()
    await service.create(this.element)
      .then((element: DoctorModel) => {
        this.elements.push(element)
        new Notify().onCreateSuccess('Doctor registrado.')
      })
      .catch((err) => {
        switch (err.body.error.message) {
          case 'NO_DOCTOR':
            new Notify().warning('No es doctor', `${this.element.firstName} no es doctor.`)
            break

          default:
            new Notify().error('Error', 'El registro no se pudo guardar.')
            break
        }
      })
  }

  async findElements (): Promise<void> {
    const service: DoctorService = new DoctorService()
    await service.find()
      .then((elements: DoctorModel[]) => {
        this.elements = elements
      })
      .catch((err) => new Notify().onLoadError(err))
  }

  async updateElement (): Promise<void> {
    const service: DoctorService = new DoctorService()
    await service.updateById(this.element)
      .then(() => {
        Object.assign(this.elements[this.elementIndex], this.element)
        new Notify().onUpdateSuccess('Doctor actualizado')
      })
      .catch((err) => new Notify().onUpdateError(err, 'doctor'))
  }

  async deleteElement (element: DoctorModel): Promise<void> {
    const service: DoctorService = new DoctorService()
    await service.deleteById(element.id)
      .then(() => {
        const index = this.elements.indexOf(element)
        this.elements.splice(index, 1)
        new Notify().onDeleteSuccess('Doctor eliminado.')
      })
      .catch((err) => new Notify().onDeleteError(err, 'doctor'))
  }

  async submit (): Promise<void> {
    if (this.elementIndex > -1) await this.updateElement()
    else await this.createElement()
    this.reset()
  }

  async findPersonal (): Promise<void> {
    const service: PersonalService = new PersonalService()
    service.findByCredentials(this.personalCredential)
      .then((element: any) => {
        this.element = element
        this.element.personalId = element.id
      })
  }

  /********************************************************
  *                       Methods                         *
  ********************************************************/

  toEditElement (element: DoctorModel): void {
    this.elementIndex = this.elements.indexOf(element)
    this.element = Object.assign({}, element)
    this.dialog = true
  }

  reset (): void {
    this.dialog = false
    this.element = Object.assign({}, new DoctorModel())
    this.elementIndex = -1
    this.personalCredential = ''
  }

  getRole (roleId: number): string {
    let role: string = ''
    this.$store.state.RoleStore.list.forEach((element: RoleModel) => {
      if (element.id === roleId) { role = element.name }
    })
    return role
  }
}
