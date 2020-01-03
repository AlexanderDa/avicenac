import Vue from 'vue'
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import Frame from '@/components/Frame.vue'
import Empty from '@/components/Empty.vue'
import DeletePromt from '@/components/DeletePromt.vue'
import PeriodModel from '@/models/PeriodModel'
import Crud from '@/views/Crud'
import moment from 'moment'
moment.locale('es')

@Component({
  name: 'Period',
  components: {
    Frame,
    Empty,
    DeletePromt
  }
})
export default class PeriodController extends Vue implements Crud<PeriodModel> {
  /********************************************************
  *                      Attributes                       *
  ********************************************************/

  // GUI
  private dialog: boolean = false
  private search: string = ''
  private headers: any[] = []
  private pagination: any = {}

  // Element data
  private elements: PeriodModel[] = [
    { id: 1, label: 'ENERO 2001 ~ DICIEMBRE 2001', startDate: '2001/01', finishDate: '2001/12', isActive: false },
    { id: 2, label: 'ENERO 2002 ~ DICIEMBRE 2002', startDate: '2002/01', finishDate: '2002/12', isActive: false },
    { id: 3, label: 'ENERO 2003 ~ DICIEMBRE 2003', startDate: '2003/01', finishDate: '2003/12', isActive: false },
    { id: 4, label: 'ENERO 2004 ~ DICIEMBRE 2004', startDate: '2004/01', finishDate: '2004/12', isActive: false },
    { id: 5, label: 'ENERO 2005 ~ DICIEMBRE 2005', startDate: '2005/01', finishDate: '2005/12', isActive: false },
    { id: 6, label: 'ENERO 2006 ~ DICIEMBRE 2006', startDate: '2006/01', finishDate: '2006/12', isActive: false },

    { id: 7, label: 'ENERO 2007 ~ DICIEMBRE 2007', startDate: '2007/01', finishDate: '2007/12', isActive: false },
    { id: 8, label: 'ENERO 2008 ~ DICIEMBRE 2008', startDate: '2008/01', finishDate: '2008/12', isActive: false },
    { id: 9, label: 'ENERO 2009 ~ DICIEMBRE 2009', startDate: '2009/01', finishDate: '2009/12', isActive: false },
    { id: 10, label: 'ENERO 2010 ~ DICIEMBRE 2010', startDate: '2010/01', finishDate: '2010/12', isActive: false },
    { id: 11, label: 'ENERO 2011 ~ DICIEMBRE 2011', startDate: '2011/01', finishDate: '2011/12', isActive: false },
    { id: 12, label: 'ENERO 2012 ~ DICIEMBRE 2012', startDate: '2012/01', finishDate: '2012/12', isActive: false },

    { id: 13, label: 'ENERO 2013 ~ DICIEMBRE 2013', startDate: '2013/01', finishDate: '2013/12', isActive: false },
    { id: 14, label: 'ENERO 2014 ~ DICIEMBRE 2014', startDate: '2014/01', finishDate: '2014/12', isActive: false },
    { id: 15, label: 'ENERO 2015 ~ DICIEMBRE 2015', startDate: '2015/01', finishDate: '2015/12', isActive: false },
    { id: 16, label: 'ENERO 2016 ~ DICIEMBRE 2016', startDate: '2016/01', finishDate: '2016/12', isActive: false },
    { id: 17, label: 'ENERO 2017 ~ DICIEMBRE 2017', startDate: '2017/01', finishDate: '2017/12', isActive: false },
    { id: 18, label: 'ENERO 2018 ~ DICIEMBRE 2018', startDate: '2018/01', finishDate: '2018/12', isActive: true }

  ]
  private elementIndex: number = -1
  private element: PeriodModel = new PeriodModel()

  // Validations
  private rules: any = {
    name: [
      (v: string) => (v && v.length > 0) || 'Atributo requerido.'
    ],
    date: [
      (v: string) => (v && v.length > 0) || 'Atributo requerido.',
      (v: string) => moment(v, 'YYYY/MM', true).isValid() || 'Fecha no valida.'
    ]
  }

  /********************************************************
  *                     Initializable                     *
  ********************************************************/

  created (): void {
    this.pagination = { rowsPerPage: 0 }
    this.headers = [
      { name: 'label', field: 'label', label: 'Periodo', align: 'left', sortable: true },
      { name: 'startDate', field: 'startDate', label: 'Fecha de inicio', align: 'left', sortable: true },
      { name: 'finishDate', field: 'finishDate', label: 'Fecha de cierre', align: 'left', sortable: true },
      { name: 'isActive', field: 'isActive', label: 'Estado', align: 'center' },
      { name: 'action', field: 'action', label: 'Acciones', align: 'center' }
    ]
  }

  /********************************************************
 *                    API Services                       *
 ********************************************************/
  createElement (): void {
    this.elements.push(this.element)
  }
  findElements (): void {
    throw new Error('Method not implemented.')
  }
  updateElement (): void {
    Object.assign(this.elements[this.elementIndex], this.element)
  }
  deleteElement (element: PeriodModel): void {
    const index = this.elements.indexOf(element)
    this.elements.splice(index, 1)
  }

  /********************************************************
 *                       Methods                         *
 ********************************************************/

  toEditElement (element: PeriodModel): void {
    this.elementIndex = this.elements.indexOf(element)
    this.element = Object.assign({}, element)
    this.dialog = true
  }
  submit (): void {
    if (this.elementIndex > -1) this.updateElement()
    else this.createElement()
    this.reset()
  }
  reset (): void {
    this.dialog = false
    this.element = Object.assign({}, new PeriodModel())
    this.elementIndex = -1
  }

  @Watch('element.startDate')
  private onStartDateChange (): void {
    this.labelDate()
  }

  @Watch('element.finishDate')
  private onFinishDateChange (): void {
    this.labelDate()
  }

  private labelDate (): void {
    const format: string = 'MMMM YYYY'
    const startDate: string = this.element.startDate.toString()
    const finishDate: string = this.element.finishDate.toString()
    if (moment(startDate, 'YYYY/MM', true).isValid() && moment(finishDate, 'YYYY/MM', true).isValid()) {
      this.element.label = `${moment(startDate, 'YYYY/MM').format(format)} ~ ${moment(finishDate, 'YYYY/MM').format(format)}`.toUpperCase()
    }
  }
}
