import Model from './Model'

export default class DoctorModel extends Model {
  public lastName!: string;
  public firstName!: string;
  public dni!: string;
  public passport!: string;
  public telephone!: string;
  public mobile!: string;
  public regProfessional!: string;
  public emailAddress!: string;
  public address!: string;
  public isHired!: boolean;
  public personalId!: number;
}
