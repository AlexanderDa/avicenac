import Vue from 'vue'
import Component from 'vue-class-component'
import validator from 'validator'
import Frame from '@/components/Frame.vue'
import Empty from '@/components/Empty.vue'
import DeletePromt from '@/components/DeletePromt.vue'
import UserModel from '@/models/UserModel'
import Crud from '@/views/Crud'
import RoleModel from '@/models/RoleModel'
import UserService from '@/services/UserService'
import EmailService from '@/services/EmailService'
import Notify from '@/components/Notify'
import PersonalService from '@/services/PersonalService'
import PersonalModel from '@/models/PersonalModel'
import { Watch } from 'vue-property-decorator'

@Component({
  name: 'UserPage',
  components: {
    Frame,
    Empty,
    DeletePromt
  }
})
export default class UserPageController extends Vue implements Crud<UserModel> {
  /********************************************************
  *                      Attributes                       *
  ********************************************************/

  // GUI
  private dialog: boolean = false
  private search: string = ''
  private searchPersonal: string = ''
  private headers: any[] = []
  private pagination: any = {}

  // Element data
  private elements: UserModel[] = []
  private elementIndex: number = -1
  private element: UserModel = new UserModel()
  private personals: PersonalModel[] = []
  private selectedPersonal: number | null = null

  // Validations
  private rules: any = {
    role: [(v: number) => (v && v > 0) || 'Atributo requerido.'],
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
      { name: 'image', field: 'image', label: 'imagen', align: 'center' },
      { name: 'emailAddress', field: 'emailAddress', label: 'Correo electrónico', align: 'left' },
      { name: 'roleId', field: 'roleId', label: 'rol de usuario', align: 'left' },
      { name: 'isActive', field: 'isActive', label: 'Estado', align: 'center' },
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
    const service: UserService = new UserService()
    await service.create(this.element)
      .then(async (element: UserModel) => {
        this.elements.push(element)
        new Notify().onCreateSuccess('Usuario registrado.')
        await this.updatePersonalUserId(element.id)
      })
      .catch((err) => new Notify().onCreateError(err, 'usuario'))
  }

  async findElements (): Promise<void> {
    const service: UserService = new UserService()
    await service.find()
      .then((elements: UserModel[]) => {
        this.elements = elements
      })
      .catch((err) => new Notify().onLoadError(err))
  }

  async updateElement (): Promise<void> {
    const service: UserService = new UserService()
    await service.updateById(this.element)
      .then(() => {
        Object.assign(this.elements[this.elementIndex], this.element)
        new Notify().onUpdateSuccess('Usuario actualizado')
      })
      .catch((err) => new Notify().onUpdateError(err, 'usuario'))
  }

  async deleteElement (element: UserModel): Promise<void> {
    const service: UserService = new UserService()
    await service.deleteById(element.id)
      .then(() => {
        const index = this.elements.indexOf(element)
        this.elements.splice(index, 1)
        new Notify().onDeleteSuccess('Usuario eliminado.')
      })
      .catch((err) => new Notify().onDeleteError(err, 'usuario'))
  }

  async submit (): Promise<void> {
    if (this.elementIndex > -1) await this.updateElement()
    else await this.createElement()
    this.reset()
  }

  async sendWelcome (email: string): Promise<void> {
    const service: EmailService = new EmailService()
    await service.welcome(email)
      .then((res: boolean) => {
        if (res) { new Notify().success('Correo enviado.', `Mensaje de bienvenido para ${email}`) }
      })
      .catch((err) => {
        const error: string = err.body.error.message
        switch (error) {
          case 'NO_PRERSONAL':
            new Notify().warning('El usuario no tiene un profesional relacionado.')
            break

          case 'ACTIVE_ACCOUNT':
            new Notify().error('La cuenta ya está activada.')
            break

          case 'BAD_ACCOUNT':
            new Notify().error('La cuenta no existe.')
            break

          default:
            new Notify().error('ERROR', 'No se pudo enviar el correo.')
            break
        }
      })
  }

  async findPersonal (value: string): Promise<void> {
    const service: PersonalService = new PersonalService()
    await service.find({
      where: {
        or: [
          { firstName: { like: `%${value}%` } },
          { lastName: { like: `%${value}%` } },
          { dni: { like: `%${value}%` } },
          { passport: { like: `%${value}%` } }
        ]
      }
    })
      .then((elements: any[]) => {
        if (elements.length > 0) {
          this.personals = elements
          // @ts-ignore
          this.$refs.perSelect.virtualScrollSliceRange.to = this.personals.length
        } else {
          new Notify().warning('Sin resultado')
        }
      })
    // @ts-ignore
    this.$refs.perSelect.showPopup()
  }

  async updatePersonalUserId (userId:number): Promise<void> {
    const service: PersonalService = new PersonalService()
    if (this.selectedPersonal) {
      let personal: PersonalModel = this.filterPersonal(this.selectedPersonal)
      personal.userId = userId
      service.updateById(personal)
        .then(() => {
          new Notify().info('Cuenta asignada')
        })
        .catch(() => {
          new Notify().error('Sin asignar', 'La cuenta no fue asignada.')
        })
    }
  }
  /********************************************************
  *                       Methods                         *
  ********************************************************/

  toEditElement (element: UserModel): void {
    this.elementIndex = this.elements.indexOf(element)
    this.element = Object.assign({}, element)
    this.dialog = true
  }

  reset (): void {
    this.dialog = false
    this.element = Object.assign({}, new UserModel())
    this.elementIndex = -1
    this.personals = []
    this.selectedPersonal = null
  }

  getRole (roleId: number): string {
    let role: string = ''
    this.$store.state.RoleStore.list.forEach((element: RoleModel) => {
      if (element.id === roleId) { role = element.name }
    })
    return role
  }

  private filterPersonal (id: number): PersonalModel {
    let personal: PersonalModel = new PersonalModel()
    const filter = this.personals.filter(element => element.id === id)
    personal = filter[0]
    return personal
  }

  @Watch('selectedPersonal')
  private onSelectedPersonal (newValue: number): void {
    if (newValue) {
      const filter: PersonalModel = this.filterPersonal(newValue)
      this.element.emailAddress = filter.emailAddress
    } else {
      this.element.emailAddress = ''
    }
  }
}
