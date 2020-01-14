import Vue from 'vue'
import Component from 'vue-class-component'
import validator from 'validator'
import AccountService from '@/services/AccountService'
import Notify from '@/components/Notify'

interface Query {
  userName: string
  activationCode: string
  emailAddress: string
}

@Component({ name: 'ActivationPage' })
export default class ActivationPageController extends Vue {
  private emailAddress: string = ''
  private activationCode: string = ''
  private password: string = ''
  private passwordConfirm: string = ''
  private loading: boolean = false
  private userName: string = ''

  beforeMount () {
    if (this.$route.query.query) {
      // @ts-ignore
      const query: Query = JSON.parse(this.$route.query.query)
      this.userName = query.userName
      this.emailAddress = query.emailAddress
      this.activationCode = query.activationCode
    } else {
      this.$q.dialog({
        title: 'Alerta',
        message: 'El código de activación no es valido.'
      }).onOk(() => {
        this.$router.push('/')
      })
    }
  }

  activation () {
    const service: AccountService = new AccountService()
    this.loading = !this.loading
    service.activate(this.emailAddress, this.password, this.activationCode)
      .then((token: string) => {
        // @ts-ignore
        Vue.http.headers.common['Authorization'] = token
        sessionStorage.setItem('token', token)
        this.$router.push({ name: 'RootPage' })
      })
      .catch((err: any) => {
        const res: any = err.body.error
        switch (res.message) {
          case 'BAD_ACCOUNT':
            new Notify().error('La cuenta de usuario no existe.')
            break
          case 'BAD_CODE':
            new Notify().error('Código de activación no valido.')
            break

          case 'ACTIVED_ACCOUNT':
            new Notify().warning('La cuenta ya está activada.')
            break

          default:
            new Notify().error('ERROR', 'No se pudo activar la cuenta.')
            break
        }
      })
      .finally(() => { this.loading = false })
  }

  onReset () {
    this.emailAddress = ''
    this.password = ''
  }
}
