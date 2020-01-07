import Model from './Model'

export default class UserModel extends Model {
  public emailAddress!: string;
  public isActive!: boolean;
  public readonly image?: string | undefined;
  public readonly confirmed?: boolean
  public roleId!: number;
}
