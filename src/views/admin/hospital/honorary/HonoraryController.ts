import Vue from 'vue'
import Component from 'vue-class-component'
import Frame from '@/components/Frame.vue'
import Empty from '@/components/Empty.vue'
import DeletePromt from '@/components/DeletePromt.vue'
import HonoraryModel from '@/models/HonoraryModel'
import Crud from '@/views/Crud'
import HonoraryService from '@/services/HonoraryService'
import Notify from '@/components/Notify'

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
  private elements: HonoraryModel[] = []
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
  beforeMount (): void {
    this.pagination = { rowsPerPage: 0 }
    this.headers = [
      { name: 'description', field: 'description', label: 'Nombre', align: 'left', sortable: true },
      { name: 'value', field: 'value', label: 'Valor', align: 'left' },
      { name: 'rate', field: 'rate', label: 'Tarifa', align: 'left' },
      { name: 'mps', field: 'mps', label: 'mps', align: 'left' },
      { name: 'action', field: 'action', label: 'Acciones', align: 'center' }
    ]
  }
  created (): void {
    this.findElements()
  }

  /********************************************************
 *                    API Services                       *
 ********************************************************/
  async createElement (): Promise<void> {
    const service: HonoraryService = new HonoraryService()
    await service.create(this.element)
      .then((element: HonoraryModel) => {
        this.elements.push(element)
        new Notify().onCreateSuccess('Honorario registrado.')
      })
      .catch((err) => new Notify().onCreateError(err, 'honorario'))
  }

  async findElements (): Promise<void> {
    const service: HonoraryService = new HonoraryService()
    await service.find()
      .then((elements: HonoraryModel[]) => {
        this.elements = elements
      })
      .catch((err) => new Notify().onLoadError(err))
  }

  async updateElement (): Promise<void> {
    const service: HonoraryService = new HonoraryService()
    // this.thereActives()
    await service.updateById(this.element)
      .then(() => {
        Object.assign(this.elements[this.elementIndex], this.element)
        new Notify().onUpdateSuccess('Honorario actualizado')
      })
      .catch((err) => new Notify().onUpdateError(err, 'honorario'))
  }

  async deleteElement (element: HonoraryModel): Promise<void> {
    const service: HonoraryService = new HonoraryService()
    await service.deleteById(element.id)
      .then(() => {
        const index = this.elements.indexOf(element)
        this.elements.splice(index, 1)
        new Notify().onDeleteSuccess('Honorario eliminado.')
      })
      .catch((err) => new Notify().onDeleteError(err, 'honorario'))
  }

  async submit (): Promise<void> {
    if (this.elementIndex > -1) await this.updateElement()
    else await this.createElement()
    this.reset()
  }

  /********************************************************
 *                       Methods                         *
 ********************************************************/

  toEditElement (element: HonoraryModel): void {
    this.elementIndex = this.elements.indexOf(element)
    this.element = Object.assign({}, element)
    this.dialog = true
  }

  reset (): void {
    this.dialog = false
    this.element = Object.assign({}, new HonoraryModel())
    this.elementIndex = -1
  }
}
