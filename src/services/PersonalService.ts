import Vue from 'vue'
import PersonalModel from '@/models/PersonalModel'
import Service from '@/services/Service'
import moment from 'moment'
moment.locale('es')

export default class PersonalService extends Vue implements Service<PersonalModel> {
  async create (element: PersonalModel): Promise<PersonalModel> {
    let created: PersonalModel = new PersonalModel()
    try {
      const res: any = await this.$http.post(
        `${process.env.VUE_APP_API_URL}/personal`,
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
        `${process.env.VUE_APP_API_URL}/personals/count`
      )
      total = res.body.count
    } catch (err) {
      throw err
    }
    return total
  }

  async find (): Promise<PersonalModel[]> {
    let list: PersonalModel[] = []
    try {
      const res: any = await this.$http.get(
        `${process.env.VUE_APP_API_URL}/personals`
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
        `${process.env.VUE_APP_API_URL}/personal/${id}`
      )
      found = res.body
    } catch (err) {
      throw err
    }
    return found
  }

  async updateById (element: PersonalModel): Promise<boolean> {
    let updated: boolean = false
    try {
      const res: any = await this.$http.patch(
        `${process.env.VUE_APP_API_URL}/personal/${element.id}`,
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
        `${process.env.VUE_APP_API_URL}/personal/${id}`
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
    personal.dni = element.dni || ''
    personal.passport = element.passport || ''
    personal.telephone = element.telephone || ''
    personal.mobile = element.mobile || ''
    personal.regProfessional = element.regProfessional
    personal.emailAddress = element.emailAddress
    personal.address = element.address
    personal.isHired = element.isHired
    personal.userId = element.userId
    return personal
  }
}
