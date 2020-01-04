import Vue from 'vue'
import Component from 'vue-class-component'
import validator from 'validator'
import Frame from '@/components/Frame.vue'
import Empty from '@/components/Empty.vue'
import DeletePromt from '@/components/DeletePromt.vue'
import UserPageModel from '@/models/UserModel'
import Crud from '@/views/Crud'
import RoleModel from '@/models/RoleModel'

@Component({
  name: 'UserPage',
  components: {
    Frame,
    Empty,
    DeletePromt
  }
})
export default class UserPageController extends Vue implements Crud<UserPageModel> {
  /********************************************************
  *                      Attributes                       *
  ********************************************************/

  // GUI
  private dialog: boolean = false
  private search: string = ''
  private headers: any[] = []
  private pagination: any = {}

  // Element data
  private elements: UserPageModel[] = []
  private elementIndex: number = -1
  private element: UserPageModel = new UserPageModel()
  private roles: RoleModel[] = [{ id: 1, name: 'Administración' }, { id: 2, name: 'Médico' }, { id: 3, name: 'Enfermeria' }]

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
    this.findElements()
  }

  /********************************************************
 *                    API Services                       *
 ********************************************************/
  createElement (): void {
    this.elements.push(this.element)
  }
  findElements (): void {
    this.elements = [
      { id: 1, emailAddress: 'juan@gmail.com', isActive: false, username: 'juan', roleId: 1 },
      { id: 2, emailAddress: 'pedro@gmail.com', isActive: true, username: 'pedro', roleId: 2 },
      { id: 3, emailAddress: 'maria@gmail.com', isActive: true, username: 'maria', roleId: 1 },
      { id: 4, emailAddress: 'marco@gmail.com', isActive: true, username: 'marco', roleId: 1 },
      { id: 5, emailAddress: 'jose@gmail.com', isActive: true, username: 'jose', roleId: 1 }
    ]
  }
  updateElement (): void {
    Object.assign(this.elements[this.elementIndex], this.element)
  }
  deleteElement (element: UserPageModel): void {
    const index = this.elements.indexOf(element)
    this.elements.splice(index, 1)
  }

  /********************************************************
 *                       Methods                         *
 ********************************************************/

  toEditElement (element: UserPageModel): void {
    this.elementIndex = this.elements.indexOf(element)
    this.element = Object.assign({}, element)
    this.dialog = true
  }
  submit (): void {
    if (this.elementIndex > -1) this.updateElement()
    else this.createElement()
    this.reset()
  }
  reset (): void {
    this.dialog = false
    this.element = Object.assign({}, new UserPageModel())
    this.elementIndex = -1
  }

  getRole (roleId: number): string {
    let role: string = ''
    this.roles.forEach((element: RoleModel) => {
      if (element.id === roleId) { role = element.name }
    })
    return role
  }
}
