import Vue from 'vue'
import moment from 'moment'
import Component from 'vue-class-component'
import validator from 'validator'
import Frame from '@/components/Frame.vue'
import Empty from '@/components/Empty.vue'
import DeletePromt from '@/components/DeletePromt.vue'
import PatientModel from '@/models/PatientModel'
import Crud from '@/views/Crud'
import RoleModel from '@/models/RoleModel'
import PatientService from '@/services/PatientService'
import EmailService from '@/services/EmailService'
import Notify from '@/components/Notify'

@Component({
  name: 'PatientPage',
  components: {
    Frame,
    Empty,
    DeletePromt
  }
})
export default class PatientPageController extends Vue implements Crud<PatientModel> {
  /********************************************************
  *                      Attributes                       *
  ********************************************************/

  // GUI
  private dialog: boolean = false
  private search: string = ''
  private headers: any[] = []
  private pagination: any = {}

  // Element data
  private elements: PatientModel[] = []
  private elementIndex: number = -1
  private element: PatientModel = new PatientModel()

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
      (v: string) => (v) ? validator.isEmail(v) || 'El  correo ingresado no es valido.' : true
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
      { name: 'bornDate', field: 'bornDate', label: 'Fecha de nacimiento', align: 'left', sortable: false },
      { name: 'sex', field: 'sex', label: 'Sexo', align: 'left', sortable: false },
      { name: 'profession', field: 'profession', label: 'Profesion', align: 'left', sortable: true },
      { name: 'maritalStatus', field: 'maritalStatus', label: 'Estado civil', align: 'left', sortable: true },
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
    const service: PatientService = new PatientService()
    await service.create(this.element)
      .then((element: PatientModel) => {
        element.bornDate = moment(element.bornDate).format('YYYY/MM/DD')
        this.elements.push(element)
        new Notify().onCreateSuccess('Paciente registrado.')
      })
      .catch((err) => new Notify().onCreateError(err, 'paciente'))
  }

  async findElements (): Promise<void> {
    const service: PatientService = new PatientService()
    await service.find()
      .then((elements: PatientModel[]) => {
        elements.forEach((element: PatientModel) => {
          element.bornDate = moment(element.bornDate).format('YYYY/MM/DD')
        })
        this.elements = elements
      })
      .catch((err) => new Notify().onLoadError(err))
  }

  async updateElement (): Promise<void> {
    const service: PatientService = new PatientService()
    await service.updateById(this.element)
      .then(() => {
        Object.assign(this.elements[this.elementIndex], this.element)
        new Notify().onUpdateSuccess('Paciente actualizado')
      })
      .catch((err) => new Notify().onUpdateError(err, 'paciente'))
  }

  async deleteElement (element: PatientModel): Promise<void> {
    const service: PatientService = new PatientService()
    await service.deleteById(element.id)
      .then(() => {
        const index = this.elements.indexOf(element)
        this.elements.splice(index, 1)
        new Notify().onDeleteSuccess('Paciente eliminado.')
      })
      .catch((err) => new Notify().onDeleteError(err, 'paciente'))
  }

  async submit (): Promise<void> {
    if (this.elementIndex > -1) await this.updateElement()
    else await this.createElement()
    this.reset()
  }

  /********************************************************
  *                       Methods                         *
  ********************************************************/

  toEditElement (element: PatientModel): void {
    this.elementIndex = this.elements.indexOf(element)
    this.element = Object.assign({}, element)
    this.dialog = true
  }

  reset (): void {
    this.dialog = false
    this.element = Object.assign({}, new PatientModel())
    this.elementIndex = -1
  }

  getRole (roleId: number): string {
    let role: string = ''
    this.$store.state.RoleStore.list.forEach((element: RoleModel) => {
      if (element.id === roleId) { role = element.name }
    })
    return role
  }
}
