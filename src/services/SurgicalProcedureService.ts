import Vue from 'vue'
import SurgicalProcedureModel from '@/models/SurgicalProcedureModel'
import Service, { API_URL } from '@/services/Service'
import moment from 'moment'
import { Filter, encodeFilter, StringFilter } from '@/util'
moment.locale('es')

export interface SurgicalProcedureFilter {
  name?: string | StringFilter
  description?: string | StringFilter
}

export default class SurgicalProcedureService extends Vue implements Service<SurgicalProcedureModel, SurgicalProcedureFilter> {
  async create (element: SurgicalProcedureModel): Promise<SurgicalProcedureModel> {
    let created: SurgicalProcedureModel = new SurgicalProcedureModel()
    try {
      const res: any = await this.$http.post(
        `${API_URL}/surgicalprocedure`,
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
        `${API_URL}/surgicalprocedures/count`
      )
      total = res.body.count
    } catch (err) {
      throw err
    }
    return total
  }

  async find (filter?: Filter<SurgicalProcedureFilter>): Promise<SurgicalProcedureModel[]> {
    let list: SurgicalProcedureModel[] = []
    try {
      const res: any = await this.$http.get(
        `${API_URL}/surgicalprocedures${encodeFilter(filter)}`
      )
      list = res.body
    } catch (err) {
      throw err
    }
    return list
  }

  async findById (id: number): Promise<SurgicalProcedureModel> {
    let found: SurgicalProcedureModel = new SurgicalProcedureModel()
    try {
      const res: any = await this.$http.get(
        `${API_URL}/surgicalprocedure/${id}`
      )
      found = res.body
    } catch (err) {
      throw err
    }
    return found
  }

  async updateById (element: SurgicalProcedureModel): Promise<boolean> {
    let updated: boolean = false
    try {
      const res: any = await this.$http.patch(
        `${API_URL}/surgicalprocedure/${element.id}`,
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
        `${API_URL}/surgicalprocedure/${id}`
      )
      success = res.ok
    } catch (err) {
      throw err
    }
    return success
  }

  formBody (element: SurgicalProcedureModel): SurgicalProcedureModel {
    let period: SurgicalProcedureModel = new SurgicalProcedureModel()
    period.name = element.name
    return period
  }
}
