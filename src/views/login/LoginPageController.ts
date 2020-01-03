import Vue from 'vue'
import Component from 'vue-class-component'
import validator from 'validator'

@Component({ name: 'LoginPage' })
export default class LoginPageController extends Vue {
  private emailAddress: string | null = null
  private password: string | null = null
  private loading: boolean = false
  private showPass: boolean = true

  // Form rules
  private rules:any = {
    email: [
      (v: string) => (v && v.length > 0) || 'Por favor ingrese un correo.',
      (v: string) => validator.isEmail(v) || 'El  correo ingresado no es valido.'
    ],
    password: [
      (v: string) => (v && v.length > 0) || 'Por favor ingrese la contraseña.'
    ]
  }

  login () {
    this.loading = !this.loading
    this.$q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Submitted'
    })
    setTimeout(() => { this.loading = false }, 3000)
  }

  onReset () {
    this.emailAddress = null
    this.password = null
  }
}
