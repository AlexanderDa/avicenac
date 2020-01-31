<template>
  <q-page>
    <q-table
      :virtual-scroll-sticky-start="10"
      :pagination.sync="pagination"
      :rows-per-page-options="[0]"
      :data="elements"
      row-key="label"
      :columns="headers"
      :filter="search"
      virtual-scroll
    >
      <template v-slot:top>
        <q-space />
        <q-input placeholder="Buscar" v-model="search" filled dense clearable>
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-space />
        <q-btn flat round dense icon="refresh" @click="findElements()" />
        <q-btn flat round dense icon="add" @click="dialog=true" />
      </template>

      <template v-slot:body-cell-image="props">
        <q-td :props="props">
          <q-avatar rounded>
            <img v-if="props.value" :src="props.value" />
            <img v-else src="@/assets/user.svg" />
          </q-avatar>
        </q-td>
      </template>

      <template v-slot:body-cell-action="props">
        <q-td :props="props" class="text-grey">
          <q-btn size="12px" flat round dense icon="edit" @click="toEditElement(props.row)" />
          <DeletePromt @onDelete="deleteElement(props.row)" />
        </q-td>
      </template>

      <template v-slot:no-data>
        <Empty class="full-width row flex-center" :title="(search)?'Sin resultados':'Sin datos'" />
      </template>
    </q-table>

    <q-dialog v-model="dialog" persistent>
      <Frame :title="elementIndex!==-1?'Editar':'Nuevo'" icon="event" width="300">
        <q-btn slot="action" flat round dense icon="close" @click="reset()" />
        <q-form slot="content" @submit="submit" class="q-gutter-md">
          <div class="row">
            <div class="col col-xs-12 col-sm-6">avatar</div>
            <div class="col col-xs-12 col-sm-6">
              <q-input
                v-model="element.firstName"
                :rules="rules.required"
                label="Nombres *"
                outlined
                dense
                lazy-rules
              />
              <q-input
                v-model="element.lastName"
                :rules="rules.required"
                label="Apellidos *"
                outlined
                dense
                lazy-rules
              />
            </div>
            <q-input
              class="col col-xs-12 col-sm-6"
              v-model="element.dni"
              :rules="rules.numeric"
              label="Cédula *"
              mask="#########-#"
              unmasked-value
              outlined
              dense
              lazy-rules
            />
            <q-input
              class="col col-xs-12 col-sm-6"
              v-model="element.passport"
              :rules="[
              v =>
                ((element.dni && element.dni.length > 0) || (v && v.length > 0)) ||
                `Cédula o pasaporte requerido`
            ]"
              label="Pasaporte"
              outlined
              dense
              lazy-rules
            />
            <q-input
              class="col col-xs-12 col-sm-6"
              v-model="element.mobile"
              :rules="rules.numeric"
              label="Número celular *"
              mask="### ### ####"
              unmasked-value
              outlined
              dense
              lazy-rules
            />
            <q-input
              class="col col-xs-12 col-sm-6"
              v-model="element.telephone"
              :rules="[
              v =>
                ((element.mobile && element.mobile.length > 0) || (v && v.length > 0)) ||
                `Teléfono celular o teléfono fijo requerido`
            ]"
              label="Teléfono fijo "
              mask="( ### ) ### ####"
              unmasked-value
              outlined
              dense
              lazy-rules
            />
            <q-input
              class="col col-xs-12"
              v-model="element.emailAddress"
              :rules="rules.email"
              label="Correo electrónico *"
              outlined
              dense
              lazy-rules
            />
            <q-input
              class="col col-xs-12"
              v-model="element.regProfessional"
              :rules="[]"
              label="Registro profesional *"
              outlined
              dense
              lazy-rules
            />
            <q-input
              class="col col-xs-12"
              v-model="element.address"
              :rules="rules.required"
              label="Dirección *"
              outlined
              dense
              lazy-rules
            />

            <q-btn label="guardar" type="submit" color="secondary" />
            <q-btn label="limpiar" type="reset" color="secondary" flat class="q-ml-sm" />
          </div>
        </q-form>
      </Frame>
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import PersonalPage from './PersonalPageController'
export default PersonalPage
</script>

<style lang="sass">
.scrollable-form
  height: calc( 100vh - 105px )
</style>
