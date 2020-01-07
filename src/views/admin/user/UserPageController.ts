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
  private headers: any[] = []
  private pagination: any = {}

  // Element data
  private elements: UserModel[] = []
  private elementIndex: number = -1
  private element: UserModel = new UserModel()

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

  created (): void {
    this.$store.dispatch('loadRoles')
    this.findElements()
  }

  /********************************************************
 *                    API Services                       *
 ********************************************************/
  async createElement (): Promise<void> {
    const service: UserService = new UserService()
    await service.create(this.element)
      .then((element: UserModel) => {
        this.elements.push(element)
      })
  }

  async findElements (): Promise<void> {
    const service: UserService = new UserService()
    await service.find()
      .then((elements: UserModel[]) => {
        this.elements = elements
      })
  }

  async updateElement (): Promise<void> {
    const service: UserService = new UserService()
    await service.updateById(this.element)
      .then(() => {
        Object.assign(this.elements[this.elementIndex], this.element)
      })
      .catch(() => { })
  }

  async deleteElement (element: UserModel): Promise<void> {
    const service: UserService = new UserService()
    await service.deleteById(element.id)
      .then(() => {
        const index = this.elements.indexOf(element)
        this.elements.splice(index, 1)
      })
      .catch(() => { })
  }

  async submit (): Promise<void> {
    if (this.elementIndex > -1) await this.updateElement()
    else await this.createElement()
    this.reset()
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
  }

  getRole (roleId: number): string {
    let role: string = ''
    this.$store.state.RoleStore.list.forEach((element: RoleModel) => {
      if (element.id === roleId) { role = element.name }
    })
    return role
  }
}
