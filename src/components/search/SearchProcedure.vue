<template>
  <div>
    <q-select
      option-label="name"
      :options="procedures"
      label="Buscar procedimiento"
      :placeholder="!selected?'Procedimiento':''"
      v-model="selected"
      @new-value="findSurgicalProcedure"
      option-value="id"
      ref="perSelect"
      :rules="[]"
      input-debounce="0"
      hide-dropdown-icon
      map-options
      lazy-rules
      emit-value
      clearable
      use-input
      outlined
      dense
    >
      <template v-slot:prepend>
        <q-icon name="search" />
      </template>
    </q-select>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Watch, Emit, Prop } from 'vue-property-decorator'
import SurgicalProcedureModel from '../../models/SurgicalProcedureModel'
import Notify from '../Notify'
import SurgicalProcedureService, {
  SurgicalProcedureFilter
} from '../../services/SurgicalProcedureService'
import { Filter } from '../../util'

@Component({
  name: 'SearchSurgicalProcedure'
})
export default class SearchSurgicalProcedureComponent extends Vue {
  @Prop({ default: false }) onlyid!: boolean;
  private selected: number | null = null;
  private procedures: SurgicalProcedureModel[] = [];

  async findSurgicalProcedure (value: string): Promise<void> {
    const service: SurgicalProcedureService = new SurgicalProcedureService()
    const filter: Filter<SurgicalProcedureFilter> = {
      where: { or: [{ name: { ilike: `%${value}%` } }] }
    }
    await service.find(filter).then((elements: any[]) => {
      if (elements.length > 0) {
        this.procedures = elements
        // @ts-ignore
        this.$refs.perSelect.virtualScrollSliceRange.to = this.procedures.length
      } else {
        new Notify().warning('Sin resultado')
      }
    })
    // @ts-ignore
    this.$refs.perSelect.showPopup()
  }

  @Watch('selected')
  onSelectedChange (newValue: number) {
    if (!newValue) this.procedures = []
    this.emitSelected()
  }

  @Emit('selected')
  emitSelected () {
    let selected: SurgicalProcedureModel = new SurgicalProcedureModel()
    if (this.selected) {
      selected = this.procedures.filter(
        (element: SurgicalProcedureModel) => element.id === this.selected
      )[0]
    }
    return this.onlyid === false ? selected : selected.id
  }
}
</script>
