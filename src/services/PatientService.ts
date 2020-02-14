import Vue from 'vue'
import PatientModel from '@/models/PatientModel'
import Service, { API_URL } from '@/services/Service'
import moment from 'moment'
import { Filter, encodeFilter, StringFilter } from '@/util'
moment.locale('es')

export interface PatientFilter {
  lastName?: string | StringFilter
  firstName?: string | StringFilter
  dni?: string | StringFilter
  passport?: string | StringFilter
  bornDate?: string
  sex?: string
  profession?: string
  maritalStatus?: string
  address?: string
  telephone?: string
  mobile?: string
  emailAddress?: string
}

export default class PatientService extends Vue implements Service<PatientModel, PatientFilter> {
  async create (element: PatientModel): Promise<PatientModel> {
    let created: PatientModel = new PatientModel()
    try {
      const res: any = await this.$http.post(
        `${API_URL}/patient`,
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
        `${API_URL}/patients/count`
      )
      total = res.body.count
    } catch (err) {
      throw err
    }
    return total
  }

  async find (filter?: Filter<PatientFilter>): Promise<PatientModel[]> {
    let list: PatientModel[] = []
    try {
      const res: any = await this.$http.get(
        `${API_URL}/patients${encodeFilter(filter)}`
      )
      list = res.body
    } catch (err) {
      throw err
    }
    return list
  }

  async findById (id: number): Promise<PatientModel> {
    let found: PatientModel = new PatientModel()
    try {
      const res: any = await this.$http.get(
        `${API_URL}/patient/${id}`
      )
      found = res.body
    } catch (err) {
      throw err
    }
    return found
  }

  async findByCredentials (credential: string): Promise<PatientModel> {
    let found: PatientModel = new PatientModel()
    const filter = { where: { or: [{ dni: credential }, { passport: credential }] } }

    try {
      const res: any = await this.$http.get(
        `${API_URL}/patients${encodeFilter(filter)}`
      )
      found = (res.body[0]) ? res.body[0] : undefined
    } catch (err) {
      throw err
    }
    return found
  }

  async updateById (element: PatientModel): Promise<boolean> {
    let updated: boolean = false
    try {
      const res: any = await this.$http.patch(
        `${API_URL}/patient/${element.id}`,
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
        `${API_URL}/patient/${id}`
      )
      success = res.ok
    } catch (err) {
      throw err
    }
    return success
  }

  formBody (element: PatientModel): PatientModel {
    let patient: PatientModel = new PatientModel()
    patient.lastName = element.lastName
    patient.firstName = element.firstName
    patient.dni = element.dni || undefined
    patient.passport = element.passport || undefined
    patient.bornDate = moment(element.bornDate).format()
    patient.sex = element.sex
    patient.profession = element.profession
    patient.maritalStatus = element.maritalStatus
    patient.address = element.address
    patient.telephone = element.telephone || undefined
    patient.mobile = element.mobile || undefined
    patient.emailAddress = element.emailAddress || undefined
    return patient
  }
}
