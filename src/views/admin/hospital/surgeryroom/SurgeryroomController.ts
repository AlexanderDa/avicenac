import Vue from 'vue'
import Component from 'vue-class-component'
import Frame from '@/components/Frame.vue'
import Empty from '@/components/Empty.vue'
import DeletePromt from '@/components/DeletePromt.vue'
import SurgeryRoomModel from '@/models/SurgeryroomModel'
import Crud from '@/views/Crud'
@Component({
  name: 'Surgeryroom',
  components: {
    Frame,
    Empty,
    DeletePromt
  }
})
export default class SurgeryroomController extends Vue implements Crud<SurgeryRoomModel> {
  /********************************************************
  *                      Attributes                       *
  ********************************************************/

  // GUI
  private dialog: boolean = false
  private search: string = ''
  private headers: any[] = []
  private pagination: any = {}

  // Element data
  private elements: SurgeryRoomModel[] = [
    { id: 1, name: 'Quirófano 1' },
    { id: 2, name: 'Quirófano 2' },
    { id: 3, name: 'Quirófano 3' },
    { id: 4, name: 'Quirófano 4' },
    { id: 5, name: 'Quirófano 5' },
    { id: 6, name: 'Quirófano 6' },
    { id: 7, name: 'Quirófano 7' },
    { id: 8, name: 'Quirófano 8' },
    { id: 9, name: 'Quirófano 9' },
    { id: 10, name: 'Quirófano 10' }
  ]
  private elementIndex: number = -1
  private element: SurgeryRoomModel = new SurgeryRoomModel()

  // Validations
  private rules: any = {
    name: [
      (v: string) => (v && v.length > 0) || 'Atributo requerido.'
    ]
  }

  /********************************************************
  *                     Initializable                     *
  ********************************************************/

  created (): void {
    this.pagination = { rowsPerPage: 0 }
    this.headers = [
      { name: 'name', field: 'name', label: 'Nombre', align: 'left', sortable: true }
    ]
  }

  /********************************************************
 *                    API Services                       *
 ********************************************************/
  createElement (): void {
    this.elements.push(this.element)
  }
  findElements (): void {
    throw new Error('Method not implemented.')
  }
  updateElement (): void {
    Object.assign(this.elements[this.elementIndex], this.element)
  }
  deleteElement (element: SurgeryRoomModel): void {
    const index = this.elements.indexOf(element)
    this.elements.splice(index, 1)
  }

  /********************************************************
 *                       Methods                         *
 ********************************************************/

  toEditElement (element: SurgeryRoomModel): void {
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
    this.element = Object.assign({}, new SurgeryRoomModel())
    this.elementIndex = -1
  }
}
