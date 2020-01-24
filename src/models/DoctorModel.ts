import Model from './Model'

export default class PersonalModel extends Model {
  public readonly lastName!: string;
  public readonly firstName!: string;
  public readonly dni!: string;
  public readonly passport!: string;
  public readonly telephone!: string;
  public readonly mobile!: string;
  public readonly regProfessional!: string;
  public readonly emailAddress!: string;
  public readonly address!: string;
  public isHired!: boolean;
  public personalId!: number;
}
