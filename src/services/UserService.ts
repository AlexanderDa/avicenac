import Vue from 'vue'
import UserModel from '@/models/UserModel'
import Service, { API_URL } from '@/services/Service'
import { Filter, encodeFilter } from '@/util'

interface UserFilter{
  emailAddress?: string;
  isActive?: boolean;
  confirmed?: boolean
  roleId?: number;
}

export default class UserService extends Vue implements Service<UserModel, UserFilter> {
  async create (element: UserModel): Promise<UserModel> {
    let created: UserModel = new UserModel()
    try {
      const res: any = await this.$http.post(
        `${API_URL}/user`,
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
        `${API_URL}/users/count`
      )
      total = res.body.count
    } catch (err) {
      throw err
    }
    return total
  }

  async find (filter?: Filter<UserFilter>): Promise<UserModel[]> {
    let list: UserModel[] = []
    try {
      const res: any = await this.$http.get(
        `${API_URL}/users${encodeFilter(filter)}`
      )
      list = res.body
    } catch (err) {
      throw err
    }
    return list
  }

  async findById (id: number): Promise<UserModel> {
    let found: UserModel = new UserModel()
    try {
      const res: any = await this.$http.get(
        `${API_URL}/user/${id}`
      )
      found = res.body
    } catch (err) {
      throw err
    }
    return found
  }

  async updateById (element: UserModel): Promise<boolean> {
    let updated: boolean = false
    try {
      const res: any = await this.$http.patch(
        `${API_URL}/user/${element.id}`,
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
        `${API_URL}/user/${id}`
      )
      success = res.ok
    } catch (err) {
      throw err
    }
    return success
  }

  formBody (element: UserModel): UserModel {
    let user: UserModel = new UserModel()
    user.emailAddress = element.emailAddress
    user.roleId = element.roleId
    user.isActive = element.isActive
    return user
  }
}
