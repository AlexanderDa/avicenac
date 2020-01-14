import Vue from 'vue'
import HonoraryModel from '@/models/HonoraryModel'
import Service, { API_URL } from '@/services/Service'
import { Filter, encodeFilter } from '@/util'

interface HonoraryFilter{
   description?: string
   value?: number
   rate?: number
   mps?: number
}

export default class HonoraryService extends Vue implements Service<HonoraryModel, HonoraryFilter> {
  async create (element: HonoraryModel): Promise<HonoraryModel> {
    let created: HonoraryModel = new HonoraryModel()
    try {
      const res: any = await this.$http.post(
        `${API_URL}/honorary`,
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
        `${API_URL}/honoraries/count`
      )
      total = res.body.count
    } catch (err) {
      throw err
    }
    return total
  }

  async find (filter?: Filter<HonoraryFilter>): Promise<HonoraryModel[]> {
    let list: HonoraryModel[] = []
    try {
      const res: any = await this.$http.get(
        `${API_URL}/honoraries${encodeFilter(filter)}`
      )
      list = res.body
    } catch (err) {
      throw err
    }
    return list
  }

  async findById (id: number): Promise<HonoraryModel> {
    let found: HonoraryModel = new HonoraryModel()
    try {
      const res: any = await this.$http.get(
        `${API_URL}/honorary/${id}`
      )
      found = res.body
    } catch (err) {
      throw err
    }
    return found
  }

  async updateById (element: HonoraryModel): Promise<boolean> {
    let updated: boolean = false
    try {
      const res: any = await this.$http.patch(
        `${API_URL}/honorary/${element.id}`,
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
        `${API_URL}/honorary/${id}`
      )
      success = res.ok
    } catch (err) {
      throw err
    }
    return success
  }

  formBody (element: HonoraryModel): HonoraryModel {
    let honorary: HonoraryModel = new HonoraryModel()
    honorary.description = element.description
    honorary.value = Number(element.value)
    honorary.rate = Number(element.rate)
    honorary.mps = Number(element.mps)
    return honorary
  }
}
