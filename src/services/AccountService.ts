import Vue from 'vue'
import { API_URL } from '@/services/Service'
import UserModel from '@/models/UserModel'

export default class AccountService extends Vue {
  async login (email: string, password: string): Promise<string> {
    let token: string
    try {
      const res: any = await this.$http.post(
        `${API_URL}/account/login`,
        { email, password })
      token = `Bearer ${res.body.token}`
    } catch (err) {
      throw err
    }
    return token
  }

  async activate (emailAddress: string, password: string, activationCode: string): Promise<string> {
    let token: string
    try {
      const res: any = await this.$http.put(
        `${API_URL}/account/activation`,
        { emailAddress, activationCode, password })
      token = `Bearer ${res.body.token}`
    } catch (err) {
      throw err
    }
    return token
  }

  async me (): Promise<UserModel> {
    let user: UserModel = new UserModel()
    try {
      const res: any = await this.$http.get(
        `${API_URL}/account/me`
      )
      user = res.body
    } catch (err) {
      throw err
    }
    return user
  }

  async findByEmail (emailAddress: string): Promise<UserModel> {
    let user: UserModel = new UserModel()
    try {
      const res: any = await this.$http.get(
        `${API_URL}/account/${emailAddress}`
      )
      user = res.body
    } catch (err) {
      throw err
    }
    return user
  }
}
