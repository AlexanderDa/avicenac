import Vue from 'vue'
import Component from 'vue-class-component'
import Crud from '@/views/Crud'
import Empty from '@/components/Empty.vue'
import DeletePromt from '@/components/DeletePromt.vue'
import PersonalModel from '@/models/PersonalModel'
import validator from 'validator'

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
  private done1: boolean = false
  private done2: boolean = false
  private done3: boolean = false
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

  created (): void {
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
      // { name: 'isHiren', field: 'isHiren', label: '', align: 'left' },
      { name: 'action', field: 'action', label: 'Acciones', align: 'center' }
    ]
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
      {
        id: 1,
        image: 'https://avatars2.githubusercontent.com/u/29008617?s=460&v=4',
        lastName: 'Bonilla Adriano',
        firstName: 'alexander David',
        dni: '0604059741',
        mobile: '0979728686',
        emailAddress: 'aldaboad@gmail.com',
        address: 'Av cevallos'
      }
    ]
  }
  updateElement (): void {
    Object.assign(this.elements[this.elementIndex], this.element)
  }
  deleteElement (element: PersonalModel): void {
    const index = this.elements.indexOf(element)
    this.elements.splice(index, 1)
  }

  /********************************************************
 *                       Methods                         *
 ********************************************************/

  toEditElement (element: PersonalModel): void {
    this.elementIndex = this.elements.indexOf(element)
    this.element = Object.assign({}, element)
    this.wizard = true
  }
  submit (): void {
    if (this.elementIndex > -1) this.updateElement()
    else this.createElement()
    this.reset()
  }
  reset (): void {
    this.wizard = false
    this.element = Object.assign({}, new PersonalModel())
    this.elementIndex = -1
  }

  private validatePerfilForm (): void {

  }
}
