import Vue from 'vue'
import ReservationModel from '@/models/ReservationModel'
import Service, { API_URL } from '@/services/Service'
import { Filter, encodeFilter } from '@/util'
import moment from 'moment'

interface ReservationFilter {
  creationDate: Date
  reservationDate: Date
  doctorId: number
  honoraryId: number
  periodId: number
  surgeryroomId: number
}

export default class ReservationService extends Vue
  implements Service<ReservationModel, ReservationFilter> {
  async create (element: ReservationModel): Promise<ReservationModel> {
    let created: ReservationModel = new ReservationModel()
    try {
      const res: any = await this.$http.post(
        `${API_URL}/reservation`,
        this.formBody(element))
      created = res.body
    } catch (err) {
      throw err
    }
    return created
  }

  async count (): Promise<number> {
    let total: number = 0
    try {
      const res: any = await this.$http.get(
        `${API_URL}/reservations/count`
      )
      total = res.body.count
    } catch (err) {
      throw err
    }
    return total
  }

  async find (filter?: Filter<ReservationFilter>): Promise<ReservationModel[]> {
    let list: ReservationModel[] = []
    try {
      const res: any = await this.$http.get(
        `${API_URL}/reservations${encodeFilter(filter)}`
      )
      list = res.body
    } catch (err) {
      throw err
    }
    return list
  }

  async findById (id: number): Promise<ReservationModel> {
    let found: ReservationModel = new ReservationModel()
    try {
      const res: any = await this.$http.get(
        `${API_URL}/reservation/${id}`
      )
      found = res.body
    } catch (err) {
      throw err
    }
    return found
  }

  async updateById (element: ReservationModel): Promise<boolean> {
    let updated: boolean = false
    try {
      const res: any = await this.$http.patch(
        `${API_URL}/reservation/${element.id}`,
        this.formBody(element)
      )
      updated = res.ok
    } catch (err) {
      throw err
    }
    return updated
  }

  async deleteById (id: number): Promise<boolean> {
    let success: boolean = false
    try {
      const res: any = await this.$http.delete(
        `${API_URL}/reservation/${id}`
      )
      success = res.ok
    } catch (err) {
      throw err
    }
    return success
  }

  formBody (element: ReservationModel): ReservationModel {
    let reservation: ReservationModel = new ReservationModel()
    reservation.reservationDate = moment(element.reservationDate).format()
    reservation.doctorId = element.doctorId
    reservation.honoraryId = element.honoraryId
    reservation.periodId = element.periodId
    reservation.surgeryroomId = element.surgeryroomId
    reservation.procedureId = element.procedureId
    reservation.patientId = element.patientId
    return reservation
  }
}
