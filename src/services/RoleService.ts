import Vue from 'vue'
import RoleModel from '@/models/RoleModel'

export default class RoleService extends Vue {
  async find (): Promise<RoleModel[]> {
    let list: RoleModel[] = []
    try {
      const res: any = await this.$http.get(
        `${process.env.VUE_APP_API_URL}/roles`
      )
      list = res.body
    } catch (err) {
      throw err
    }
    return list
  }
}
