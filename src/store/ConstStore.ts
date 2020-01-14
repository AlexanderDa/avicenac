import { VuexModule, Module } from 'vuex-module-decorators'

@Module
export default class ConstStore extends VuexModule {
  private calendar: any = {
    /* starting with Sunday */
    days: 'Domingo:Lunes:Martes:Miércoles:Jueves:Viernes:Sábado'.split(':'),
    daysShort: 'Dom:Lun:Mar:Mié:Jue:Vie:Sáb'.split(':'),
    months: 'Enero:Febrero:Marzo:Abril:Mayo:Junio:Julio:Agosto:Septiembre:Octubre:Noviembre:Diciembre'.split(':'),
    monthsShort: 'Ene:Feb:Mar:Abr:May:Jun:Jul:Ago:Sep:Oct:Nov:Dic'.split(':'),
    firstDayOfWeek: 1
  }
}
