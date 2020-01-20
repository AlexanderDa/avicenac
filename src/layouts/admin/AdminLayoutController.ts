import Vue from 'vue'
import Component from 'vue-class-component'
import WebAppLayout from '@/components/app/WebAppLayout.vue'
import DesktopAppLayout from '@/components/app/DesktopAppLayout.vue'
import { ListRouterItem } from '@/util'

@Component({
  name: 'AdminLayout',
  components: {
    WebAppLayout,
    DesktopAppLayout
  }
})
export default class AdminLayoutController extends Vue {
  private platform: string | null = null
  private menuItems: ListRouterItem[] = [
    { icon: 'dashboard', title: 'Dashboard', page: 'DashboardPage' },
    { icon: 'account_circle', title: 'Usuarios', page: 'UserPage' },
    { icon: 'person', title: 'Pacientes', page: 'PatientPage' },
    { icon: 'work', title: 'Personal', page: 'PersonalPage' },
    { icon: 'event_note', title: 'Reservación', page: 'ReservationPage' },
    { icon: 'business', title: 'Hospital', page: 'HospitalPage' }
  ]

  private beforeMount (): void {
    // @ts-ignore
    this.platform = process.platform.toString() === 'browser' ? 'web' : 'desktop'
  }
}
