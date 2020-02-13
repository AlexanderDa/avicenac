import Vue from 'vue'
import Component from 'vue-class-component'
import Crud from '@/views/Crud'
import Empty from '@/components/Empty.vue'
import Frame from '@/components/Frame.vue'
import DeletePromt from '@/components/DeletePromt.vue'
import PersonalModel from '@/models/PersonalModel'
import validator from 'validator'
import PersonalService from '@/services/PersonalService'
import RoleModel from '@/models/RoleModel'
import Notify from '@/components/Notify'

@Component({
  name: 'PersonalPage',
  components: { Frame, Empty, DeletePromt }
})
export default class PersonalPageController extends Vue implements Crud<PersonalModel> {
  /********************************************************
  *                      Attributes                       *
  ********************************************************/

  // GUI
  private dialog: boolean = false
  private search: string = ''
  private headers: any[] = []
  private pagination: any = {}

  // Element data
  private elements: PersonalModel[] = []
  private elementIndex: number = -1
  private element: PersonalModel = new PersonalModel()

  // Validations
  private rules: any = {
    required: [
      (v: string) => (v && v.length > 0) || 'Atributo requerido.'
    ],

    numeric: [
      (v: string) => {
        let validation: any = true
        if (v && v.length > 0) { validation = v.length === 10 || 'formato invalido' }
        return validation
      }
    ],
    email: [
      (v: string) => (v && v.length > 0) || 'Por favor ingrese un correo.',
      (v: string) => validator.isEmail(v) || 'El  correo ingresado no es valido.'
    ]
  }

  /********************************************************
  *                     Initializable                     *
  ********************************************************/
  beforeMount (): void {
    this.pagination = { rowsPerPage: 0 }
    this.headers = [
      { name: 'image', field: 'image', label: 'imagen', align: 'center' },
      { name: 'firstName', field: 'firstName', label: 'Nombres', align: 'left' },
      { name: 'lastName', field: 'lastName', label: 'Apellidos', align: 'left' },
      { name: 'dni', field: 'dni', label: 'Cédula', align: 'left' },
      { name: 'passport', field: 'passport', label: 'Pasaporte', align: 'left' },
      { name: 'telephone', field: 'telephone', label: 'Fijo', align: 'left' },
      { name: 'mobile', field: 'mobile', label: 'Celular', align: 'left' },
      { name: 'emailAddress', field: 'emailAddress', label: 'Email', align: 'left' },
      { name: 'regProfessional', field: 'regProfessional', label: 'Registro profesional', align: 'left' },
      { name: 'address', field: 'address', label: 'Dirección', align: 'left' },
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
    const service: PersonalService = new PersonalService()
    // this.thereActives()
    await service.create(this.element)
      .then((element: PersonalModel) => {
        this.elements.push(element)
        new Notify().onCreateSuccess('Personal registrado.')
      })
      .catch((err) => new Notify().onCreateError(err, 'usuario'))
  }

  async findElements (): Promise<void> {
    const service: PersonalService = new PersonalService()
    await service.find()
      .then((elements: PersonalModel[]) => {
        this.elements = elements
      })
      .catch((err) => new Notify().onLoadError(err))
  }

  async updateElement (): Promise<void> {
    const service: PersonalService = new PersonalService()
    await service.updateById(this.element)
      .then(() => {
        Object.assign(this.elements[this.elementIndex], this.element)
        new Notify().onUpdateSuccess('Personal actualizado')
      })
      .catch((err) => new Notify().onUpdateError(err, 'personal'))
  }

  async deleteElement (element: PersonalModel): Promise<void> {
    const service: PersonalService = new PersonalService()
    await service.deleteById(element.id)
      .then(() => {
        const index = this.elements.indexOf(element)
        this.elements.splice(index, 1)
        new Notify().onDeleteSuccess('Personal eliminado.')
      })
      .catch((err) => new Notify().onDeleteError(err, 'personal'))
  }

  async submit (): Promise<void> {
    if (this.elementIndex > -1) await this.updateElement()
    else await this.createElement()
    this.reset()
  }

  /********************************************************
 *                       Methods                         *
 ********************************************************/

  async toEditElement (element: PersonalModel): Promise<void> {
    this.elementIndex = this.elements.indexOf(element)
    this.element = Object.assign({}, element)
    this.dialog = true
  }

  reset (): void {
    this.dialog = false
    this.element = Object.assign({}, new PersonalModel())
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
