import Model from './Model'

export default class PersonalModel extends Model {
    public lastName!: string;
    public firstName!: string;
    public dni!: string | undefined;
    public passport!: string | undefined;
    public telephone!: string | undefined;
    public mobile!: string | undefined;
    public regProfessional!: string | undefined;
    public emailAddress!: string;
    public address!: string;
    public readonly image!: string ;
    public userId!: number | undefined;
}
