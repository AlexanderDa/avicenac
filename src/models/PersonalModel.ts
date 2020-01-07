import Model from './Model'

export default class PersonalModel extends Model {
    public lastName!: string;
    public firstName!: string;
    public dni!: string ;
    public passport!: string ;
    public telephone!: string ;
    public mobile!: string ;
    public regProfessional!: string ;
    public emailAddress!: string;
    public address!: string;
    public isHired!: boolean ;
    public readonly image!: string ;
    public userId!: number;
}
