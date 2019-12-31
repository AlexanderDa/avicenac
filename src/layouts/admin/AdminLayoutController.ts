import Vue from 'vue'
import Component from 'vue-class-component'
import WebAppLayout from '@/components/WebAppLayout.vue'
import { ListRouterItem } from '@/util'

@Component({
  name: 'AdminLayout',
  components: { WebAppLayout }
})
export default class AdminLayoutController extends Vue {
  private platform: string | null = null
  private menuItems: ListRouterItem[] = [
    { icon: 'dashboard', title: 'Dashboard', page: 'DashboardPage' }
  ]

  private beforeMount (): void {
    // @ts-ignore
    this.platform = process.platform.toString() === 'browser' ? 'web' : 'desktop'
  }
}
