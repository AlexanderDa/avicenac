import Model from './Model'

export default class PeriodModel extends Model {
    public startDate: string = ''
    public finishDate: string = ''
    public label!: string
    public isActive!: boolean ;
}
