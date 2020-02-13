import Vue from 'vue'
import Service, { API_URL } from '@/services/Service'
import PersonalModel from '@/models/PersonalModel'
import { Filter, encodeFilter, StringFilter } from '@/util'

interface PersonalFilter {
  lastName?: StringFilter;
  firstName?: StringFilter;
  dni?: StringFilter;
  passport?: StringFilter;
  telephone?: string;
  mobile?: string;
  regProfessional?: string;
  emailAddress?: string;
  address?: string;
  isHired?: boolean;
}

export default class PersonalService extends Vue implements Service<PersonalModel, PersonalFilter> {
  async create (element: PersonalModel): Promise<PersonalModel> {
    let created: PersonalModel = new PersonalModel()
    try {
      const res: any = await this.$http.post(
        `${API_URL}/personal`,
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
        `${API_URL}/personals/count`
      )
      total = res.body.count
    } catch (err) {
      throw err
    }
    return total
  }

  async find (filter?: Filter<PersonalFilter>): Promise<PersonalModel[]> {
    let list: PersonalModel[] = []
    try {
      const res: any = await this.$http.get(
        `${API_URL}/personals${encodeFilter(filter)}`
      )
      list = res.body
    } catch (err) {
      throw err
    }
    return list
  }

  async findById (id: number): Promise<PersonalModel> {
    let found: PersonalModel = new PersonalModel()
    try {
      const res: any = await this.$http.get(
        `${API_URL}/personal/${id}`
      )
      found = res.body
    } catch (err) {
      throw err
    }
    return found
  }

  async findByCredentials (credential: string): Promise<PersonalModel> {
    let found: PersonalModel = new PersonalModel()
    const filter = { where: { or: [{ dni: credential }, { passport: credential }] } }

    try {
      const res: any = await this.$http.get(
        `${API_URL}/personals${encodeFilter(filter)}`
      )
      found = (res.body[0]) ? res.body[0] : undefined
    } catch (err) {
      throw err
    }
    return found
  }

  async updateById (element: PersonalModel): Promise<boolean> {
    let updated: boolean = false
    try {
      const res: any = await this.$http.patch(
        `${API_URL}/personal/${element.id}`,
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
        `${API_URL}/personal/${id}`
      )
      success = res.ok
    } catch (err) {
      throw err
    }
    return success
  }

  formBody (element: PersonalModel): PersonalModel {
    let personal: PersonalModel = new PersonalModel()
    personal.lastName = element.lastName
    personal.firstName = element.firstName
    personal.dni = element.dni || undefined
    personal.passport = element.passport || undefined
    personal.telephone = element.telephone || undefined
    personal.mobile = element.mobile || undefined
    personal.regProfessional = element.regProfessional || undefined
    personal.emailAddress = element.emailAddress
    personal.address = element.address
    personal.userId = element.userId || undefined
    return personal
  }
}
