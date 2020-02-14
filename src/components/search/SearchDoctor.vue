<template>
  <div>
    <q-select
      :option-label="(item) =>   item === null ?
                          null :`${item.lastName || ''} ${item.firstName || ''} `"
      :options="doctors"
      label="Buscar doctor"
      :placeholder="!selected?'Nombres o credenciales':''"
      v-model="selected"
      @new-value="findDoctor"
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
import DoctorModel from '../../models/DoctorModel'
import Notify from '../Notify'
import DoctorService, { DoctorFilter } from '../../services/DoctorService'
import { Filter } from '../../util'

@Component({
  name: 'SearchDoctor'
})
export default class SearchDoctorComponent extends Vue {
  @Prop({ default: false }) onlyid!: boolean;
  private selected: number | null = null;
  private doctors: DoctorModel[] = [];

  async findDoctor (value: string): Promise<void> {
    const service: DoctorService = new DoctorService()
    const filter: Filter<DoctorFilter> = {
      where: {
        or: [
          { firstName: { ilike: `%${value}%` } },
          { lastName: { ilike: `%${value}%` } },
          { dni: { ilike: `%${value}%` } },
          { passport: { ilike: `%${value}%` } }
        ]
      }
    }
    await service.find(filter).then((elements: any[]) => {
      if (elements.length > 0) {
        this.doctors = elements
        // @ts-ignore
        this.$refs.perSelect.virtualScrollSliceRange.to = this.doctors.length
      } else {
        new Notify().warning('Sin resultado')
      }
    })
    // @ts-ignore
    this.$refs.perSelect.showPopup()
  }

  @Watch('selected')
  onSelectedChange (newValue: number) {
    if (!newValue) this.doctors = []
    this.emitSelected()
  }

  @Emit('selected')
  emitSelected () {
    let selected: DoctorModel = new DoctorModel()
    if (this.selected) {
      selected = this.doctors.filter(
        (element: DoctorModel) => element.id === this.selected
      )[0]
    }
    return this.onlyid === false ? selected : selected.id
  }
}
</script>
