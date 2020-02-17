import Vue from 'vue'
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import Crud from '@/views/Crud'
import ReservationModel from '@/models/ReservationModel'
import ReservationService from '@/services/ReservationService'
// @ts-ignore
import qcalendar, { QCalendar } from '@quasar/quasar-ui-qcalendar'
import Frame from '@/components/Frame.vue'
import Empty from '@/components/Empty.vue'
import SearchDoctor from '@/components/search/SearchDoctor.vue'
import SearchPatient from '@/components/search/SearchPatient.vue'
import SearchProcedure from '@/components/search/SearchProcedure.vue'
import SelectPeriod from '@/components/select/SelectPeriod.vue'
import moment from 'moment'
import SurgicalProcedureModel from '@/models/SurgicalProcedureModel'
import PatientModel from '@/models/PatientModel'
import DoctorModel from '@/models/DoctorModel'
import Notify from '@/components/Notify'
import { CellOption, isCssColor, luminosity } from '@/util'

interface ReservationInfo {
  doctor?: string
  patient?: string
  procedure?: string
  reservationDate?: string
}

@Component({
  name: 'ReservationPage',
  components: {
    QCalendar,
    Frame,
    Empty,
    SearchDoctor,
    SearchPatient,
    SearchProcedure,
    SelectPeriod
  }
})
export default class ReservationPageController extends Vue implements Crud<ReservationModel> {
  /********************************************************
  *                      Attributes                       *
  ********************************************************/

  // GUI
  private dialog: boolean = false
  private view: string = 'week'
  private patientCredential: string = ''
  private selectedDate: string = ''
  private dateMenu: boolean = false

  // Element data
  private elementcs: ReservationModel[] = []
  private elementIndex: number = -1
  private element: ReservationModel = new ReservationModel()
  private resInfo: ReservationInfo = {}

  private events: CellOption[] = []

  // Validations
  private rules: any = {
    date: [
      (v: string) => (v && v.length > 0) || 'Atributo requerido.',
      (v: string) => moment(v, 'YYYY/MM/DD HH:mm', true).isValid() || 'Fecha no valida.'
    ]
  }

  /********************************************************
  *                     Initializable                     *
  ********************************************************/

  beforeMount () {
    this.resInfo = { doctor: '', patient: '', procedure: '', reservationDate: '' }
    this.element.periodId = 1
  }

  async created (): Promise<void> {
    await this.findElements()
  }

  /********************************************************
  *                    API Services                       *
  ********************************************************/

  async createElement (): Promise<void> {
    const service: ReservationService = new ReservationService()
    // this.thereActives()
    await service.create(this.element)
      .then(async (element: ReservationModel) => {
        await service.find({ where: { id: element.id }, include: [{ relation: 'doctor' }] })
          .then((reservation: ReservationModel[]) => {
            this.addEvent(reservation[0])
            new Notify().success('Reservación almacenada.')
          })
      })
      .catch((err:any) => new Notify().onCreateError(err, 'reservación'))
  }

  async findElements (): Promise<void> {
    const service: ReservationService = new ReservationService()
    await service.find({ include: [{ relation: 'doctor' }] })
      .then((elements: ReservationModel[]) => {
        elements.forEach((reservation: ReservationModel) => this.addEvent(reservation))
      })
  }

  async updateElement (): Promise<void> {
    const service: ReservationService = new ReservationService()
    await service.updateById(this.element)
      .then(() => {
        // Object.assign(this.elements[this.elementIndex], this.element)
      })
      .catch(() => { })
  }

  async deleteElement (element: ReservationModel): Promise<void> {
    const service: ReservationService = new ReservationService()
    await service.deleteById(element.id)
      .then(() => {
        // const index = this.elements.indexOf(element)
        // this.elements.splice(index, 1)
      })
      .catch(() => { })
  }

  async submit (): Promise<void> {
    if (this.elementIndex > -1) await this.updateElement()
    else await this.createElement()
    this.reset()
  }

  /********************************************************
  *                        Events                         *
  ********************************************************/

  onCellClicked (day: any): void {
    this.dialog = true
    this.element.reservationDate = moment(day.date + ' ' + day.time.split(':')[0])
      .format('YYYY/MM/DD HH:mm')
  }

  /********************************************************
  *                       Methods                         *
  ********************************************************/
  toEditElement (element: ReservationModel): void {
    // this.elementIndex = this.elements.indexOf(element)
    this.element = Object.assign({}, element)
    this.dialog = true
  }

  reset (): void {
    this.dialog = false
    this.element = Object.assign({}, new ReservationModel())
    this.resInfo = Object.assign({}, { doctor: '', patient: '', procedure: '', reservationDate: '' })
    this.elementIndex = -1
  }

  today (justToday: boolean): void {
    this.selectedDate = moment(new Date()).format('YYYY-MM-DD').toString()
    this.view = justToday ? 'day' : this.view
  }

  // default calendar date
  get selectedDateLabel (): string {
    return moment(this.selectedDate).isValid()
      ? moment(this.selectedDate, 'YYYY/MM/DD HH:mm')
        .format('MMMM YYYY').toUpperCase()
      : moment(new Date(), 'YYYY/MM/DD HH:mm')
        .format('MMMM YYYY').toUpperCase()
  }

  @Watch('element.reservationDate')
  private onreservationDateChange (): void {
    let label: string = ''
    if (moment(this.element.reservationDate, 'YYYY/MM/DD HH:mm', true).isValid()) {
      label = moment(this.element.reservationDate, 'YYYY/MM/DD HH:mm').format('LLLL').toUpperCase()
    }
    this.resInfo.reservationDate = label
  }

  onPatientSelected (patient: PatientModel): void {
    if (patient.id) {
      this.element.patientId = patient.id
      this.resInfo.patient = `${patient.lastName} ${patient.firstName}`
    } else {
      this.element.patientId = 0
      this.resInfo.patient = ''
    }
  }

  onDoctorSelected (doctor: DoctorModel): void {
    if (doctor.id) {
      this.element.doctorId = doctor.id
      this.resInfo.doctor = `${doctor.lastName} ${doctor.firstName}`
    } else {
      this.element.doctorId = 0
      this.resInfo.doctor = ''
    }
  }

  onProcedureSelected (procedure: SurgicalProcedureModel): void {
    if (procedure.id) {
      this.element.procedureId = procedure.id
      this.resInfo.procedure = `${procedure.name}`
    } else {
      this.element.procedureId = 0
      this.resInfo.procedure = ''
    }
  }

  addEvent (reservation: ReservationModel) {
    this.events.push({
      id: reservation.id,
      title: reservation.doctor ? reservation.doctor.lastName : '',
      details: 'Always a nice to see my teacher',
      date: moment(reservation.reservationDate).format('YYYY-MM-DD'),
      time: moment(reservation.reservationDate).format('HH:mm'),
      duration: 60,
      bgcolor: '#ac0ffc'
    })
  }

  getReservations (date: string) {
    const events = []
    for (let i = 0; i < this.events.length; ++i) {
      let added = false
      const event = this.events[i]
      if (event.date === date) {
        if (event.time) {
          if (events.length > 0) {
            // check for overlapping times
            const startTime = qcalendar.parsed(event.date + ' ' + event.time)
            const endTime = qcalendar.addToDate(startTime, { minute: event.duration })
            for (let j = 0; j < events.length; ++j) {
              const startTime2 = qcalendar.parsed(events[j].date + ' ' + events[j].time)
              const endTime2 = qcalendar.addToDate(startTime2, { minute: events[j].duration })
              if (qcalendar.isBetweenDates(startTime, startTime2, endTime2) || qcalendar.isBetweenDates(endTime, startTime2, endTime2)) {
                events.push(event)
                added = true
                break
              }
            }
          }
        }
        if (!added) {
          events.push(event)
        }
      }
    }
    return events
  }

  badgeStyles (event: any, timeStartPos: any, timeDurationHeight: any) {
    const s: any = {}
    if (isCssColor(event.bgcolor)) {
      s['background-color'] = event.bgcolor
      s.color = luminosity(event.bgcolor) > 0.5 ? 'black' : 'white'
    }
    if (timeStartPos) {
      s.top = timeStartPos(event.time) + 'px'
    }
    if (timeDurationHeight) {
      s.height = timeDurationHeight(event.duration) + 'px'
    }
    s['align-items'] = 'flex-start'
    return s
  }
}
