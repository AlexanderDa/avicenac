// lastName
// firstName
// dni
// passport
// bornDate
// sex
// profession
// maritalStatus
// address
// telephone
// mobile
// emailAddress

import Model from './Model'

export default class PatientModel extends Model {
  public lastName! : string
  public firstName! : string
  public dni! : string | undefined
  public passport! : string | undefined
  public bornDate! : string
  public sex! : string
  public profession! : string
  public maritalStatus! : string
  public address! : string
  public telephone! : string | undefined
  public mobile! : string | undefined
  public emailAddress! : string
}
