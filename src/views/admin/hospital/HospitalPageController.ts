import Vue from 'vue'
import Component from 'vue-class-component'
import Period from '@/views/admin/hospital/period/Period.vue'
import Surgeryroom from '@/views/admin/hospital/surgeryroom/Surgeryroom.vue'
import Honorary from '@/views/admin/hospital/honorary/Honorary.vue'
import SurgicalProcedure from '@/views/admin/hospital/procedure/SurgicalProcedure.vue'
@Component({
  name: 'HospitalPage',
  components: {
    Period,
    Honorary,
    Surgeryroom,
    SurgicalProcedure
  }
})
export default class HospitalPageController extends Vue {
  private tab: string = 'surgeryroom'
}
