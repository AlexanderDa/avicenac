import Vue from 'vue'
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import Crud from '@/views/Crud'
import Empty from '@/components/Empty.vue'
import DeletePromt from '@/components/DeletePromt.vue'
import PersonalModel from '@/models/PersonalModel'
import validator from 'validator'
import PersonalService from '@/services/PersonalService'
import UserModel from '@/models/UserModel'
import UserService from '@/services/UserService'
import AccountService from '@/services/AccountService'
import RoleModel from '@/models/RoleModel'
import Notify from '@/components/Notify'

@Component({
  name: 'PersonalPage',
  components: { Empty, DeletePromt }
})
export default class PersonalPageController extends Vue implements Crud<PersonalModel> {
  /********************************************************
  *                      Attributes                       *
  ********************************************************/

  // GUI
  private wizard: boolean = false
  private step: number = 1
  private search: string = ''
  private headers: any[] = []
  private pagination: any = {}

  // Element data
  private elements: PersonalModel[] = []
  private elementIndex: number = -1
  private element: PersonalModel = new PersonalModel()
  private user: UserModel = new UserModel()

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
    this.element.emailAddress = this.user.emailAddress
    this.element.userId = this.user.id
    if (this.elementIndex > -1) await this.updateElement()
    else await this.createElement()
    this.reset()
  }

  async findUser (userId: number): Promise<void> {
    const service: UserService = new UserService()
    await service.findById(userId)
      .then((element: UserModel) => {
        this.user = element
      })
  }

  async findAccount (): Promise<void> {
    const service: AccountService = new AccountService()
    await service.findByEmail(this.user.emailAddress)
      .then((element: UserModel) => {
        this.user = element
      })
  }

  /********************************************************
 *                       Methods                         *
 ********************************************************/

  async toEditElement (element: PersonalModel): Promise<void> {
    this.elementIndex = this.elements.indexOf(element)
    this.element = Object.assign({}, element)
    if (this.element.userId) { await this.findUser(element.userId) }
    this.wizard = true
  }

  reset (): void {
    this.wizard = false
    this.step = 1
    this.$router.replace({ query: {} })
    this.element = Object.assign({}, new PersonalModel())
    this.user = Object.assign({}, new UserModel())
    this.elementIndex = -1
  }

  private validatePerfilForm (): void {

  }

  getRole (roleId: number): string {
    let role: string = ''
    this.$store.state.RoleStore.list.forEach((element: RoleModel) => {
      if (element.id === roleId) { role = element.name }
    })
    return role
  }

  @Watch('user.emailAddress')
  private onClearEmailAddress (newValue: string) {
    if (!(newValue && newValue.length > 0)) this.user = new UserModel()
  }
}
