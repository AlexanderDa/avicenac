<template>
  <q-page class="bg-grey-1">
    <q-tabs v-model="tab" dense class="bg-white shadow-1 text-secondary">
      <q-tab name="surgeryroom" icon="airline_seat_flat_angled" label="Quirófanos" />
      <q-tab name="periods" icon="event" label="Periodos" />
      <q-tab name="honoraries" icon="payment" label="Honorarios" />
    </q-tabs>

      <q-tab-panels class="hospital-page bg-grey-1" v-model="tab" animated >
        <q-tab-panel name="surgeryroom">
          <Surgeryroom/>
        </q-tab-panel>

        <q-tab-panel name="periods">
          <Period class="crud-table"/>
        </q-tab-panel>

        <q-tab-panel name="honoraries">
          <Honorary class="crud-table"/>
        </q-tab-panel>
      </q-tab-panels>
  </q-page>
</template>

<script lang="ts">
import HospitalPage from './HospitalPageController'
export default HospitalPage
</script>
<style lang="sass">
  @import "./HospitalPage.sass"
</style>
