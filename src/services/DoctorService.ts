import Vue from 'vue'
import Service, { API_URL } from '@/services/Service'
import DoctorModel from '@/models/DoctorModel'
import { Filter, encodeFilter } from '@/util'

interface DoctorFilter{
  lastName: string;
  firstName: string;
  dni: string ;
  passport: string ;
  telephone: string ;
  mobile: string ;
  regProfessional: string ;
  emailAddress: string;
  address: string;
  isHired: boolean ;
}

export default class DoctorService extends Vue implements Service<DoctorModel, DoctorFilter> {
  async create (element: DoctorModel): Promise<DoctorModel> {
    let created: DoctorModel = new DoctorModel()
    try {
      const res: any = await this.$http.post(
        `${API_URL}/doctor`,
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
        `${API_URL}/doctors/count`
      )
      total = res.body.count
    } catch (err) {
      throw err
    }
    return total
  }

  async find (filter?: Filter<DoctorFilter>): Promise<DoctorModel[]> {
    let list: DoctorModel[] = []
    try {
      const res: any = await this.$http.get(
        `${API_URL}/doctors${encodeFilter(filter)}`
      )
      list = res.body
    } catch (err) {
      throw err
    }
    return list
  }

  async findById (id: number): Promise<DoctorModel> {
    let found: DoctorModel = new DoctorModel()
    try {
      const res: any = await this.$http.get(
        `${API_URL}/doctor/${id}`
      )
      found = res.body
    } catch (err) {
      throw err
    }
    return found
  }

  async findByCredentials (credential: string): Promise<DoctorModel> {
    let found: DoctorModel = new DoctorModel()
    const filter = { where: { or: [{ dni: credential }, { passport: credential }] } }

    try {
      const res: any = await this.$http.get(
        `${API_URL}/doctors${encodeFilter(filter)}`
      )
      found = (res.body[0]) ? res.body[0] : undefined
    } catch (err) {
      throw err
    }
    return found
  }

  async updateById (element: DoctorModel): Promise<boolean> {
    let updated: boolean = false
    try {
      const res: any = await this.$http.patch(
        `${API_URL}/doctor/${element.id}`,
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
        `${API_URL}/doctor/${id}`
      )
      success = res.ok
    } catch (err) {
      throw err
    }
    return success
  }

  formBody (element: DoctorModel): DoctorModel {
    let doctor: DoctorModel = new DoctorModel()
    doctor.isHired = element.isHired
    doctor.personalId = element.personalId
    return doctor
  }
}
