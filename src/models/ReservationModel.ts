import Model from './Model'
import DoctorModel from './DoctorModel'
import HonoraryModel from './HonoraryModel'
import PeriodModel from './PeriodModel'
import SurgeryRoomModel from './SurgeryRoomModel'
import SurgicalProcedureModel from './SurgicalProcedureModel'
import PatientModel from './PatientModel'

export default class ReservationModel extends Model {
  public reservationDate: string = ''
  public doctorId!: number
  public honoraryId!: number
  public periodId!: number
  public surgeryroomId!: number
  public procedureId!: number
  public patientId!: number
  public doctor?: DoctorModel
  public honorary?: HonoraryModel
  public period?: PeriodModel
  public surgeryroom?: SurgeryRoomModel
  public procedure?: SurgicalProcedureModel
  public patient?: PatientModel
}
