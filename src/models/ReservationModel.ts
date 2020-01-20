import Model from './Model'

export default class ReservationModel extends Model {
  public reservationDate: string = ''
  public doctorId!: number
  public honoraryId!: number
  public periodId!: number
  public surgeryroomId!: number
  public procedureId!: number
  public patientId!: number
}
