import Vue from 'vue'
import SurgeryRoomModel from '@/models/SurgeryRoomModel'
import Service from '@/services/Service'

export default class SurgeryRoomService extends Vue implements Service<SurgeryRoomModel> {
  async create (element: SurgeryRoomModel): Promise<SurgeryRoomModel> {
    let created: SurgeryRoomModel = new SurgeryRoomModel()
    try {
      const res: any = await this.$http.post(
        `${process.env.VUE_APP_API_URL}/surgeryroom`,
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
        `${process.env.VUE_APP_API_URL}/surgeryrooms/count`
      )
      total = res.body.count
    } catch (err) {
      throw err
    }
    return total
  }

  async find (): Promise<SurgeryRoomModel[]> {
    let list: SurgeryRoomModel[] = []
    try {
      const res: any = await this.$http.get(
        `${process.env.VUE_APP_API_URL}/surgeryrooms`
      )
      list = res.body
    } catch (err) {
      throw err
    }
    return list
  }

  async findById (id: number): Promise<SurgeryRoomModel> {
    let found: SurgeryRoomModel = new SurgeryRoomModel()
    try {
      const res: any = await this.$http.get(
        `${process.env.VUE_APP_API_URL}/surgeryroom/${id}`
      )
      found = res.body
    } catch (err) {
      throw err
    }
    return found
  }

  async updateById (element: SurgeryRoomModel): Promise<boolean> {
    let updated: boolean = false
    try {
      const res: any = await this.$http.patch(
        `${process.env.VUE_APP_API_URL}/surgeryroom/${element.id}`,
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
        `${process.env.VUE_APP_API_URL}/surgeryroom/${id}`
      )
      success = res.ok
    } catch (err) {
      throw err
    }
    return success
  }

  formBody (element: SurgeryRoomModel): SurgeryRoomModel {
    let surgeryroom: SurgeryRoomModel = new SurgeryRoomModel()
    surgeryroom.name = element.name
    return surgeryroom
  }
}
