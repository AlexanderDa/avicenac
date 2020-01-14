import Vue from 'vue'
import { API_URL } from '@/services/Service'

export default class EmailService extends Vue {
  async welcome (email: string): Promise<boolean> {
    let dispatched: boolean = false
    try {
      const res: any = await this.$http.post(
        `${API_URL}/email/welcome/${email}`
      )
      dispatched = res.ok
    } catch (err) {
      throw err
    }
    return dispatched
  }
}
