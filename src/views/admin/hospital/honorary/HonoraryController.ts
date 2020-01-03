import Vue from 'vue'
import Component from 'vue-class-component'
import Frame from '@/components/Frame.vue'
import Empty from '@/components/Empty.vue'
import DeletePromt from '@/components/DeletePromt.vue'
import HonoraryModel from '@/models/HonoraryModel'
import Crud from '@/views/Crud'

@Component({
  name: 'Honorary',
  components: {
    Frame,
    Empty,
    DeletePromt
  }
})
export default class HonoraryController extends Vue implements Crud<HonoraryModel> {
  /********************************************************
  *                      Attributes                       *
  ********************************************************/

  // GUI
  private dialog: boolean = false
  private search: string = ''
  private headers: any[] = []
  private pagination: any = {}

  // Element data
  private elements: HonoraryModel[] = [
    { id: 1, description: 'LATAM', value: 10, rate: 5.5, mps: 1.25 },
    { id: 2, description: 'IEES', value: 10, rate: 5.5, mps: 1.25 },
    { id: 3, description: ' MED-EC S.A.', value: 10, rate: 5.5, mps: 1.25 },
    { id: 4, description: 'PLUS MEDICAL', value: 10, rate: 5.5, mps: 1.25 },
    { id: 5, description: 'INMEDICAL', value: 10, rate: 5.5, mps: 1.25 }
  ]
  private elementIndex: number = -1
  private element: HonoraryModel = new HonoraryModel()

  // Validations
  private rules: any = {
    description: [
      (v: string) => (v && v.length > 0) || 'Atributo requerido.'
    ],
    number: [
      (v: number) => (v && v > 0) || 'Atributo requerido.'
    ]
  }

  /********************************************************
  *                     Initializable                     *
  ********************************************************/

  created (): void {
    this.pagination = { rowsPerPage: 0 }
    this.headers = [
      { name: 'description', field: 'description', label: 'Nombre', align: 'left', sortable: true },
      { name: 'value', field: 'value', label: 'Valor', align: 'left' },
      { name: 'rate', field: 'rate', label: 'Tarifa', align: 'left' },
      { name: 'mps', field: 'mps', label: 'mps', align: 'left' },
      { name: 'action', field: 'action', label: 'Acciones', align: 'center' }
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
  deleteElement (element: HonoraryModel): void {
    const index = this.elements.indexOf(element)
    this.elements.splice(index, 1)
  }

  /********************************************************
 *                       Methods                         *
 ********************************************************/

  toEditElement (element: HonoraryModel): void {
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
    this.element = Object.assign({}, new HonoraryModel())
    this.elementIndex = -1
  }
}
