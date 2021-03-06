import Vue from 'vue'
import Component from 'vue-class-component'
import Frame from '@/components/Frame.vue'
import Empty from '@/components/Empty.vue'
import DeletePromt from '@/components/DeletePromt.vue'
import SurgeryRoomModel from '@/models/SurgeryRoomModel'
import Crud from '@/views/Crud'
import SurgeryRoomService from '@/services/SurgeryRoomService'
import Notify from '@/components/Notify'
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
  private elements: SurgeryRoomModel[] = []
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
  beforeMount (): void {
    this.pagination = { rowsPerPage: 0 }
    this.headers = [
      { name: 'name', field: 'name', label: 'Nombre', align: 'left', sortable: true },
      { name: 'isActive', field: 'isActive', label: 'Estado', align: 'center', sortable: true },
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
    const service: SurgeryRoomService = new SurgeryRoomService()
    // this.thereActives()
    await service.create(this.element)
      .then((element: SurgeryRoomModel) => {
        this.elements.push(element)
        new Notify().onCreateSuccess('Quírofano registrado.')
      })
      .catch((err) => new Notify().onCreateError(err, 'quirófano'))
  }

  async findElements (): Promise<void> {
    const service: SurgeryRoomService = new SurgeryRoomService()
    await service.find()
      .then((elements: SurgeryRoomModel[]) => {
        this.elements = elements
      })
      .catch((err) => new Notify().onLoadError(err))
  }

  async updateElement (): Promise<void> {
    const service: SurgeryRoomService = new SurgeryRoomService()
    await service.updateById(this.element)
      .then(() => {
        Object.assign(this.elements[this.elementIndex], this.element)
        new Notify().onUpdateSuccess('Quirófano actualizado')
      })
      .catch((err) => new Notify().onUpdateError(err, 'quirófano'))
  }

  async deleteElement (element: SurgeryRoomModel): Promise<void> {
    const service: SurgeryRoomService = new SurgeryRoomService()
    await service.deleteById(element.id)
      .then(() => {
        const index = this.elements.indexOf(element)
        this.elements.splice(index, 1)
        new Notify().onDeleteSuccess('Quirófano eliminado.')
      })
      .catch((err) => new Notify().onDeleteError(err, 'quirófano'))
  }

  async submit (): Promise<void> {
    if (this.elementIndex > -1) await this.updateElement()
    else await this.createElement()
    this.reset()
  }

  /********************************************************
 *                       Methods                         *
 ********************************************************/

  toEditElement (element: SurgeryRoomModel): void {
    this.elementIndex = this.elements.indexOf(element)
    this.element = Object.assign({}, element)
    this.dialog = true
  }

  reset (): void {
    this.dialog = false
    this.element = Object.assign({}, new SurgeryRoomModel())
    this.elementIndex = -1
  }
}
