import Vue from 'vue'
import Component from 'vue-class-component'
import UserService from '@/services/UserService'
import PatientService from '@/services/PatientService'
import DoctorService from '@/services/DoctorService'
import CountCard from '@/components/CountCard.vue'

@Component({
  name: 'DashboardPage',
  components: { CountCard }
})
export default class DashboardPageController extends Vue {
  private users: number = 0
  private patients: number = 0
  private doctors: number = 0

  created (): void {
    this.countUser()
    this.countPatients()
    this.countDoctors()
  }

  private async countUser (): Promise<void> {
    const service: UserService = new UserService()
    service.count()
      .then((count: number) => { this.users = count })
  }

  private async countPatients (): Promise<void> {
    const service: PatientService = new PatientService()
    service.count()
      .then((count: number) => { this.patients = count })
  }

  private async countDoctors (): Promise<void> {
    const service: DoctorService = new DoctorService()
    service.count()
      .then((count: number) => { this.doctors = count })
  }
}
