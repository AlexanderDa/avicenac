<template>
  <div>
    <q-select
      v-model="selected"
      :label="label"
      :options="periods"
      :rules="[]"
      behavior="menu"
      option-value="id"
      option-label="label"
      map-options
      emit-value
      outlined
      dense
    />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch, Emit } from 'vue-property-decorator'
import SurgicalProcedureModel from '../../models/SurgicalProcedureModel'
import Notify from '../Notify'
import SurgicalProcedureService from '../../services/SurgicalProcedureService'
import PeriodModel from '../../models/PeriodModel'
import PeriodService from '../../services/PeriodService'
import { Filter } from '../../util'

@Component({
  name: 'SelectPeriod'
})
export default class SelectPeriodComponent extends Vue {
  @Prop() value!: number;
  @Prop({ default: false }) onlyid!: boolean;
  @Prop({ default: 'Periodo' }) label!: string;

  private selected: number | null = null;
  private periods: PeriodModel[] = [];

  beforeMount () {

  }

  async created (): Promise<void> {
    await this.findPeriod()
  }

  async findPeriod (): Promise<void> {
    const service: PeriodService = new PeriodService()
    await service
      .find({ where: { isActive: true } })
      .then((elements: PeriodModel[]) => {
        this.periods = elements
        if (elements.length === 1) {
          this.selected = elements[0].id
        }
      })
  }

  @Watch('value')
  onInputChange () {
    this.selected = this.value
  }

  @Watch('selected')
  onSelectedChange () {
    this.emitSelected()
  }

  @Emit('input')
  emitSelected (): PeriodModel | number {
    let selected: PeriodModel = new PeriodModel()
    if (this.selected) {
      selected = this.periods.filter(
        (element: PeriodModel) => element.id === this.selected
      )[0]
    }
    return this.onlyid === false ? selected : selected.id
  }
}
</script>
