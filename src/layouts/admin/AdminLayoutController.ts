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
    // { icon: 'dashboard', title: 'Dashboard', page: 'DashboardPage' },
    { icon: 'fas fa-user-circle', title: 'Usuarios', page: 'UserPage' },
    { icon: 'fas fa-user-injured', title: 'Pacientes', page: 'PatientPage' },
    { icon: 'fas fa-user-md', title: 'Doctores', page: 'DoctorPage' },
    { icon: 'fas fa-user-tie', title: 'Personal', page: 'PersonalPage' },
    { icon: 'fas fa-calendar-week', title: 'Reservación', page: 'ReservationPage' },
    { icon: 'far fa-hospital', title: 'Hospital', page: 'HospitalPage' }
  ]

  private beforeMount (): void {
    // @ts-ignore
    this.platform = process.platform.toString() === 'browser' ? 'web' : 'desktop'
  }
}
