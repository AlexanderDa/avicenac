<template>
  <div>
    <q-select
      :option-label="(item) =>   item === null ?
                          null :`${item.lastName || ''} ${item.firstName || ''} `"
      :options="personals"
      label="Buscar personal"
      :placeholder="!selected?'Nombres o credenciales':''"
      v-model="selected"
      @new-value="findPersonal"
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
import PersonalModel from '../../models/PersonalModel'
import Notify from '../Notify'
import PersonalService from '../../services/PersonalService'

@Component({
  name: 'SearchPersonal'
})
export default class SearchPersonalComponent extends Vue {
  @Prop({ default: false }) onlyid!: boolean;
  private selected: number | null = null;
  private personals: PersonalModel[] = [];

  async findPersonal (value: string): Promise<void> {
    const service: PersonalService = new PersonalService()
    await service
      .find({
        where: {
          or: [
            { firstName: { ilike: `%${value}%` } },
            { lastName: { ilike: `%${value}%` } },
            { dni: { ilike: `%${value}%` } },
            { passport: { ilike: `%${value}%` } }
          ]
        }
      })
      .then((elements: any[]) => {
        if (elements.length > 0) {
          this.personals = elements
          // @ts-ignore
          this.$refs.perSelect.virtualScrollSliceRange.to = this.personals.length
        } else {
          new Notify().warning('Sin resultado')
        }
      })
    // @ts-ignore
    this.$refs.perSelect.showPopup()
  }

  @Watch('selected')
  onSelectedChange (newValue: number) {
    if (!newValue) this.personals = []
    this.emitSelected()
  }

  @Emit('selected')
  emitSelected () {
    let selected: PersonalModel = new PersonalModel()
    if (this.selected) {
      selected = this.personals.filter(
        (element: PersonalModel) => element.id === this.selected
      )[0]
    }
    return this.onlyid === false ? selected : selected.id
  }
}
</script>
