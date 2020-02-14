<template>
  <div>patient: {{select}}
    <q-select
      :option-label="(item) =>   item === null ?
                          null :`${item.lastName || ''} ${item.firstName || ''} `"
      :options="patients"
      label="Buscar paciente"
      :placeholder="!selected?'Nombres o credenciales':''"
      v-model="selected"
      @new-value="findPatient"
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
import PatientModel from '../../models/PatientModel'
import Notify from '../Notify'
import PatientService, { PatientFilter } from '../../services/PatientService'
import { Filter } from '../../util'

@Component({
  name: 'SearchPatient'
})
export default class SearchPatientComponent extends Vue {
  @Prop({ default: false }) onlyid!: boolean;
  private selected: number | null = null;
  private patients: PatientModel[] = [];

  async findPatient (value: string): Promise<void> {
    const service: PatientService = new PatientService()
    const filter: Filter<PatientFilter> = {
      where: {
        or: [
          { firstName: { ilike: `%${value}%` } },
          { lastName: { ilike: `%${value}%` } },
          { dni: { ilike: `%${value}%` } },
          { passport: { ilike: `%${value}%` } }
        ]
      }
    }
    await service.find(filter)
      .then((elements: any[]) => {
        if (elements.length > 0) {
          this.patients = elements
          // @ts-ignore
          this.$refs.perSelect.virtualScrollSliceRange.to = this.patients.length
        } else {
          new Notify().warning('Sin resultado')
        }
      })
    // @ts-ignore
    this.$refs.perSelect.showPopup()
  }

  @Watch('selected')
  onSelectedChange (newValue: number) {
    if (!newValue) this.patients = []

    this.emitSelected()
  }

  @Emit('selected')
  emitSelected () {
    let selected: PatientModel = new PatientModel()
    if (this.selected) {
      selected = this.patients.filter(
        (element: PatientModel) => element.id === this.selected
      )[0]
    }
    return this.onlyid === false ? selected : selected.id
  }
}
</script>
