import Vue from 'vue'
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import Frame from '@/components/Frame.vue'
import Empty from '@/components/Empty.vue'
import DeletePromt from '@/components/DeletePromt.vue'
import SurgicalProcedureModel from '@/models/SurgicalProcedureModel'
import Crud from '@/views/Crud'
import moment from 'moment'
import SurgicalProcedureService from '@/services/SurgicalProcedureService'
import Notify from '@/components/Notify'
moment.locale('es')

@Component({
  name: 'SurgicalProcedure',
  components: {
    Frame,
    Empty,
    DeletePromt
  }
})
export default class SurgicalProcedureController extends Vue implements Crud<SurgicalProcedureModel> {
  /********************************************************
  *                      Attributes                       *
  ********************************************************/

  // GUI
  private dialog: boolean = false
  private search: string = ''
  private headers: any[] = []
  private pagination: any = {}

  // Element data
  private elements: SurgicalProcedureModel[] = []
  private elementIndex: number = -1
  private element: SurgicalProcedureModel = new SurgicalProcedureModel()

  // Validations
  private rules: any = {
    name: [
      (v: string) => (v && v.length > 0) || 'Atributo requerido.'
    ]
  }

  /********************************************************
  *                     Initializable                     *
  ********************************************************/

  beforeMount () {
    this.pagination = { rowsPerPage: 0 }
    this.headers = [
      { name: 'name', field: 'name', label: 'Procedimiento', align: 'left', sortable: true },
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
    const service: SurgicalProcedureService = new SurgicalProcedureService()
    // this.thereActives()
    await service.create(this.element)
      .then((element: SurgicalProcedureModel) => {
        this.elements.push(element)
        new Notify().onCreateSuccess('Procedimiento registrado.')
      })
      .catch((err) => new Notify().onCreateError(err, 'procedimiento'))
  }

  async findElements (): Promise<void> {
    const service: SurgicalProcedureService = new SurgicalProcedureService()
    await service.find({ order: ['name asc'] })
      .then((elements: SurgicalProcedureModel[]) => {
        this.elements = elements
      })
      .catch((err) => new Notify().onLoadError(err))
  }

  async updateElement (): Promise<void> {
    const service: SurgicalProcedureService = new SurgicalProcedureService()
    // this.thereActives()
    await service.updateById(this.element)
      .then(() => {
        Object.assign(this.elements[this.elementIndex], this.element)
        new Notify().onUpdateSuccess('Procedimiento actualizado')
      })
      .catch((err) => new Notify().onUpdateError(err, 'procedimiento'))
  }

  async deleteElement (element: SurgicalProcedureModel): Promise<void> {
    const service: SurgicalProcedureService = new SurgicalProcedureService()
    await service.deleteById(element.id)
      .then(() => {
        const index = this.elements.indexOf(element)
        this.elements.splice(index, 1)
        new Notify().onDeleteSuccess('Procedimiento eliminado.')
      })
      .catch((err) => new Notify().onDeleteError(err, 'procedimiento'))
  }

  async submit (): Promise<void> {
    if (this.elementIndex > -1) await this.updateElement()
    else await this.createElement()
    this.reset()
  }

  /********************************************************
  *                       Methods                         *
  ********************************************************/

  toEditElement (element: SurgicalProcedureModel): void {
    this.elementIndex = this.elements.indexOf(element)
    this.element = Object.assign({}, element)
    this.dialog = true
  }

  reset (): void {
    this.dialog = false
    this.element = Object.assign({}, new SurgicalProcedureModel())
    this.elementIndex = -1
  }
}
