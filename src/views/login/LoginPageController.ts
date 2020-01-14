import Vue from 'vue'
import Component from 'vue-class-component'
import validator from 'validator'
import AccountService from '@/services/AccountService'
import Notify from '@/components/Notify'

@Component({ name: 'LoginPage' })
export default class LoginPageController extends Vue {
  private emailAddress: string = ''
  private password: string = ''
  private loading: boolean = false
  private showPass: boolean = true

  // Form rules
  private rules: any = {
    email: [
      (v: string) => (v && v.length > 0) || 'Por favor ingrese un correo.',
      (v: string) => validator.isEmail(v) || 'El  correo ingresado no es valido.'
    ],
    password: [
      (v: string) => (v && v.length > 0) || 'Por favor ingrese la contraseña.'
    ]
  }

  login () {
    const service: AccountService = new AccountService()
    this.loading = !this.loading
    service.login(this.emailAddress, this.password)
      .then((token: string) => {
        // @ts-ignore
        Vue.http.headers.common['Authorization'] = token
        sessionStorage.setItem('token', token)
        this.$router.push({ name: 'RootPage' })
      })
      .catch((err: any) => {
        const res: any = err.body.error
        let notify = {
          color: 'yellow',
          textColor: 'white',
          icon: 'warning',
          message: ''
        }
        switch (res.message) {
          case 'BAD_ACCOUNT':
            notify.message = 'La cuenta de usuario no existe.'
            this.$q.notify(notify)
            break
          case 'BAD_PASS':
            notify.message = 'La contraseña es incorrecta.'
            this.$q.notify(notify)
            this.password = ''
            break
          case 'INACTIVE_USER':
            notify.message = 'Usted no está autorizado.'
            this.$q.notify(notify)
            this.password = ''
            this.emailAddress = ''
            break

          case 'INACTIVE_ACCOUNT':
            new Notify().warning('Cuenta sin activar', 'Por favor verifique su correo y active la cuenta')
            break

          default:
            notify.message = 'ERROR INTERNO.'
            notify.color = 'red'
            this.$q.notify(notify)
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
