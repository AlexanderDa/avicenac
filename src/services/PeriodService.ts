import Vue from 'vue'
import PeriodModel from '@/models/PeriodModel'
import Service, { API_URL } from '@/services/Service'
import moment from 'moment'
import { Filter, encodeFilter } from '@/util'
moment.locale('es')

interface PeriodFilter {
  startDate?: string
  finishDate?: string
  label?: string
  isActive?: boolean;
}

export default class PeriodService extends Vue implements Service<PeriodModel, PeriodFilter> {
  async create (element: PeriodModel): Promise<PeriodModel> {
    let created: PeriodModel = new PeriodModel()
    try {
      const res: any = await this.$http.post(
        `${API_URL}/period`,
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
        `${API_URL}/periods/count`
      )
      total = res.body.count
    } catch (err) {
      throw err
    }
    return total
  }

  async find (filter?: Filter<PeriodFilter>): Promise<PeriodModel[]> {
    let list: PeriodModel[] = []
    try {
      const res: any = await this.$http.get(
        `${API_URL}/periods${encodeFilter(filter)}`
      )
      list = res.body
    } catch (err) {
      throw err
    }
    return list
  }

  async findById (id: number): Promise<PeriodModel> {
    let found: PeriodModel = new PeriodModel()
    try {
      const res: any = await this.$http.get(
        `${API_URL}/period/${id}`
      )
      found = res.body
    } catch (err) {
      throw err
    }
    return found
  }

  async updateById (element: PeriodModel): Promise<boolean> {
    let updated: boolean = false
    try {
      const res: any = await this.$http.patch(
        `${API_URL}/period/${element.id}`,
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
        `${API_URL}/period/${id}`
      )
      success = res.ok
    } catch (err) {
      throw err
    }
    return success
  }

  formBody (element: PeriodModel): PeriodModel {
    let period: PeriodModel = new PeriodModel()
    period.startDate = moment(element.startDate, 'YYYY/MM').format()
    period.finishDate = moment(element.finishDate, 'YYYY/MM').format()
    period.label = element.label
    period.isActive = element.isActive
    return period
  }
}
