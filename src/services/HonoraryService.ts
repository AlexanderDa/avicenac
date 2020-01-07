import Vue from 'vue'
import HonoraryModel from '@/models/HonoraryModel'
import Service from '@/services/Service'

export default class HonoraryService extends Vue implements Service<HonoraryModel> {
  async create (element: HonoraryModel): Promise<HonoraryModel> {
    let created: HonoraryModel = new HonoraryModel()
    try {
      const res: any = await this.$http.post(
        `${process.env.VUE_APP_API_URL}/honorary`,
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
        `${process.env.VUE_APP_API_URL}/honoraries/count`
      )
      total = res.body.count
    } catch (err) {
      throw err
    }
    return total
  }

  async find (): Promise<HonoraryModel[]> {
    let list: HonoraryModel[] = []
    try {
      const res: any = await this.$http.get(
        `${process.env.VUE_APP_API_URL}/honoraries`
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
        `${process.env.VUE_APP_API_URL}/honorary/${id}`
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
        `${process.env.VUE_APP_API_URL}/honorary/${element.id}`,
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
        `${process.env.VUE_APP_API_URL}/honorary/${id}`
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
