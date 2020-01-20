<template>
  <div>
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

      <template v-slot:body-cell-roleId="props">
        <q-td :props="props">{{getRole(props.value)}}</q-td>
      </template>

      <template v-slot:body-cell-isActive="props">
        <q-td :props="props">
          <q-badge
            :color="props.value?'positive':'negative'"
            :label="props.value?'Activo':'Inactivo'"
          />
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
            <q-input
              class="col-xs-12 col-sm-6"
              v-model="element.firstName"
              :rules="rules.required"
              label="Nombres *"
              outlined
              dense
              lazy-rules
            />

            <q-input
              class="col-xs-12 col-sm-6"
              v-model="element.lastName"
              :rules="rules.required"
              label="Apellidos *"
              outlined
              dense
              lazy-rules
            />

            <q-input
              class="col-xs-12 col-sm-6"
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
              class="col-xs-12 col-sm-6"
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
              class="col-xs-12 col-sm-6"
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
              class="col-xs-12 col-sm-6"
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
              class="col-xs-12 col-sm-6"
              v-model="element.bornDate"
              :rules="[]"
              label="Fecha de nacimiento *"
              mask="####/##/##"
              outlined
              dense
              lazy-rules
            />
            <q-select
              class="col-xs-12 col-sm-6"
              v-model="element.sex"
              label="Sexo *"
              :options="['Masculino','Femenino']"
              :rules="rules.required"
              behavior="menu"
              outlined
              dense
            />

            <q-select
              class="col-xs-12"
              v-model="element.maritalStatus"
              label="Estado civil *"
              :options="( element.sex === 'Masculino')
              ?['Soltero','Casado','Divorciado','Viudo']
              :['Soltera','Casada','Divorciada','Viuda']"
              :rules="rules.required"
              behavior="menu"
              outlined
              dense
            />

            <q-input
              class="col-xs-12"
              v-model="element.profession"
              :rules="rules.required"
              label="Profesión u ocupación *"
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
              v-model="element.address"
              :rules="rules.required"
              label="Dirección *"
              outlined
              dense
              lazy-rules
            />
          </div>
          <div>
            <q-btn label="guardar" type="submit" color="secondary" />
            <q-btn label="limpiar" type="reset" color="secondary" flat class="q-ml-sm" />
          </div>
        </q-form>
      </Frame>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import PatientPageController from './PatientPageController'
export default PatientPageController
</script>
