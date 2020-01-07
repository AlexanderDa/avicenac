import Vue from 'vue'
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import Frame from '@/components/Frame.vue'
import Empty from '@/components/Empty.vue'
import DeletePromt from '@/components/DeletePromt.vue'
import PeriodModel from '@/models/PeriodModel'
import Crud from '@/views/Crud'
import moment from 'moment'
import PeriodService from '@/services/PeriodService'
moment.locale('es')

@Component({
  name: 'Period',
  components: {
    Frame,
    Empty,
    DeletePromt
  }
})
export default class PeriodController extends Vue implements Crud<PeriodModel> {
  /********************************************************
  *                      Attributes                       *
  ********************************************************/

  // GUI
  private dialog: boolean = false
  private search: string = ''
  private headers: any[] = []
  private pagination: any = {}

  // Element data
  private elements: PeriodModel[] = []
  private elementIndex: number = -1
  private element: PeriodModel = new PeriodModel()

  // Validations
  private rules: any = {
    name: [
      (v: string) => (v && v.length > 0) || 'Atributo requerido.'
    ],
    date: [
      (v: string) => (v && v.length > 0) || 'Atributo requerido.',
      (v: string) => moment(v, 'YYYY/MM', true).isValid() || 'Fecha no valida.'
    ]
  }

  /********************************************************
  *                     Initializable                     *
  ********************************************************/

  beforeMount () {
    this.pagination = { rowsPerPage: 0 }
    this.headers = [
      { name: 'label', field: 'label', label: 'Periodo', align: 'left', sortable: true },
      { name: 'startDate', field: 'startDate', label: 'Fecha de inicio', align: 'left', sortable: true },
      { name: 'finishDate', field: 'finishDate', label: 'Fecha de cierre', align: 'left', sortable: true },
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

  async createElement (): Promise<void> {
    const service: PeriodService = new PeriodService()
    // this.thereActives()
    await service.create(this.element)
      .then((element: PeriodModel) => {
        element.startDate = moment(element.startDate).format('YYYY/MM')
        element.finishDate = moment(element.finishDate).format('YYYY/MM')
        this.elements.push(element)
      })
  }

  async findElements (): Promise<void> {
    const service: PeriodService = new PeriodService()
    await service.find()
      .then((elements: PeriodModel[]) => {
        elements.forEach((element: PeriodModel) => {
          element.startDate = moment(element.startDate).format('YYYY/MM')
          element.finishDate = moment(element.finishDate).format('YYYY/MM')
        })
        this.elements = elements
      })
  }

  async updateElement (): Promise<void> {
    const service: PeriodService = new PeriodService()
    // this.thereActives()
    await service.updateById(this.element)
      .then(() => {
        Object.assign(this.elements[this.elementIndex], this.element)
      })
      .catch(() => { })
  }

  async deleteElement (element: PeriodModel): Promise<void> {
    const service: PeriodService = new PeriodService()
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

  toEditElement (element: PeriodModel): void {
    this.elementIndex = this.elements.indexOf(element)
    this.element = Object.assign({}, element)
    this.dialog = true
  }

  reset (): void {
    this.dialog = false
    this.element = Object.assign({}, new PeriodModel())
    this.elementIndex = -1
  }

  @Watch('element.startDate')
  private onStartDateChange (): void {
    this.labelDate()
  }

  @Watch('element.finishDate')
  private onFinishDateChange (): void {
    this.labelDate()
  }

  private labelDate (): void {
    const format: string = 'MMMM YYYY'
    const startDate: string = this.element.startDate
    const finishDate: string = this.element.finishDate.toString()
    if (moment(startDate, 'YYYY/MM', true).isValid() && moment(finishDate, 'YYYY/MM', true).isValid()) {
      this.element.label = `${moment(startDate, 'YYYY/MM').format(format)} ~ ${moment(finishDate, 'YYYY/MM').format(format)}`.toUpperCase()
    }
  }
}
