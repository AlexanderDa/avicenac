import Model from './Model'

export default class ReservationModel extends Model {
  public creationDate!: string
  public reservationDate: string = ''
  public doctorId!: number
  public honoraryId!: number
  public periodId!: number
  public surgeryroomId!: number
}
