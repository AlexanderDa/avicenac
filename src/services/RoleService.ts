import Vue from 'vue'
import { API_URL } from '@/services/Service'
import RoleModel from '@/models/RoleModel'

export default class RoleService extends Vue {
  async find (): Promise<RoleModel[]> {
    let list: RoleModel[] = []
    try {
      const res: any = await this.$http.get(
        `${API_URL}/roles`
      )
      list = res.body
    } catch (err) {
      throw err
    }
    return list
  }
}
