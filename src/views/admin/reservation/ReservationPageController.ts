import Vue from 'vue'
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import Crud from '@/views/Crud'
import ReservationModel from '@/models/ReservationModel'
import ReservationService from '@/services/ReservationService'
// @ts-ignore
import { QCalendar } from '@quasar/quasar-ui-qcalendar'
import Frame from '@/components/Frame.vue'
import Empty from '@/components/Empty.vue'
import moment from 'moment'
import PeriodService from '@/services/PeriodService'
import PeriodModel from '@/models/PeriodModel'
import SurgeryRoomModel from '@/models/SurgeryRoomModel'
import SurgeryRoomService from '@/services/SurgeryRoomService'

@Component({
  name: 'ReservationPage',
  components: {
    QCalendar,
    Frame,
    Empty
  }
})
export default class ReservationPageController extends Vue implements Crud<ReservationModel> {
  /********************************************************
  *                      Attributes                       *
  ********************************************************/

  // GUI
  private dialog: boolean = false
  private view: string = 'week'
  private selectedDate: string = ''
  private dateMenu: boolean = false

  // Element data
  private elements: ReservationModel[] = []
  private elementIndex: number = -1
  private element: ReservationModel = new ReservationModel()
  private periods: PeriodModel[] = []
  private surgeryRooms: SurgeryRoomModel[] = []

  // Validations
  private rules: any = {
    name: [
      (v: string) => (v && v.length > 0) || 'Atributo requerido.'
    ],
    date: [
      (v: string) => (v && v.length > 0) || 'Atributo requerido.',
      (v: string) => moment(v, 'YYYY/MM/DD HH:mm', true).isValid() || 'Fecha no valida.'
    ]
  }

  /********************************************************
  *                     Initializable                     *
  ********************************************************/

  beforeMount () {
    // this.selectedDate = moment(new Date()).format('YYYY/MM/DD').toString()
  }

  created (): void {
    this.findPeriods()
    this.findSurgeryRooms()
    this.findElements()
  }

  /********************************************************
  *                    API Services                       *
  ********************************************************/

  async createElement (): Promise<void> {
    const service: ReservationService = new ReservationService()
    // this.thereActives()
    await service.create(this.element)
      .then((element: ReservationModel) => {
        this.elements.push(element)
      })
  }

  async findElements (): Promise<void> {
    const service: ReservationService = new ReservationService()
    await service.find()
      .then((elements: ReservationModel[]) => {
        this.elements = elements
      })
  }

  async updateElement (): Promise<void> {
    const service: ReservationService = new ReservationService()
    await service.updateById(this.element)
      .then(() => {
        Object.assign(this.elements[this.elementIndex], this.element)
      })
      .catch(() => { })
  }

  async deleteElement (element: ReservationModel): Promise<void> {
    const service: ReservationService = new ReservationService()
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

  async findPeriods (): Promise<void> {
    const service: PeriodService = new PeriodService()
    await service.find({ where: { isActive: true } })
      .then((elements: PeriodModel[]) => {
        this.periods = elements
      })
  }

  async findSurgeryRooms (): Promise<void> {
    const service: SurgeryRoomService = new SurgeryRoomService()
    await service.find()
      .then((elements: SurgeryRoomModel[]) => {
        this.surgeryRooms = elements
      })
  }

  /********************************************************
  *                        Events                         *
  ********************************************************/

  onCellClicked (day: any): void {
    this.dialog = true
    if (this.periods.length === 1) { this.element.periodId = this.periods[0].id }
    this.element.reservationDate = day.date + ' ' + day.time.split(':')[0] + ':00'
  }

  /********************************************************
  *                       Methods                         *
  ********************************************************/
  toEditElement (element: ReservationModel): void {
    this.elementIndex = this.elements.indexOf(element)
    this.element = Object.assign({}, element)
    this.dialog = true
  }

  reset (): void {
    this.dialog = false
    this.element = Object.assign({}, new ReservationModel())
    this.elementIndex = -1
  }

  today (justToday: boolean): void {
    this.selectedDate = moment(new Date()).format('YYYY-MM-DD').toString()
    this.view = justToday ? 'day' : this.view
  }

  get selectedDateLabel (): string {
    return moment(this.selectedDate).isValid()
      ? moment(this.selectedDate, 'YYYY/MM/DD HH:mm')
        .format('MMMM YYYY').toUpperCase()
      : moment(new Date(), 'YYYY/MM/DD HH:mm')
        .format('MMMM YYYY').toUpperCase()
  }

  get reservationDateLabel (): string {
    let label: string = ''
    if (moment(this.element.reservationDate, 'YYYY-MM-DD HH:mm', true).isValid()) {
      label = moment(this.element.reservationDate, 'YYYY-MM-DD HH:mm').format('LLLL').toUpperCase()
    }
    return label
  }

  @Watch('selectedDate')
  private onSelectedDate (): void {
    if (this.dateMenu) {
      this.dateMenu = false
    }
  }
}
