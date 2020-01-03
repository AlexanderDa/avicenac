import Vue from 'vue'
import Component from 'vue-class-component'

@Component({ name: 'PersonalPage' })
export default class PersonalPageController extends Vue {
  private search: string | null = null
}
