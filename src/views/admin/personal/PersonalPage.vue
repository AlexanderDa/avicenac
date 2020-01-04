<template>
  <q-page>
    <q-table
      v-if="!wizard"
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
        <q-btn flat round dense icon="add" @click="wizard=!wizard" />
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

    <div v-if="wizard">
      <q-toolbar  class="shadow-1">
      <q-toolbar-title>{{(elementIndex!==-1?'Editar profesional':'Nuevo profesional')}}</q-toolbar-title>
      <q-space/>
      <q-btn flat round dense icon="list" @click="wizard=!wizard" />
    </q-toolbar>
    <q-stepper  v-model="step" header-nav ref="stepper" color="primary" animated>
      <q-step :name="1" title="Información" icon="person" :done="done1">
        <q-form @submit="validatePerfilForm()" class="row">
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
            :rules="rules.required"
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

          <q-toggle label="¿Es contratado?" color="secondary" v-model="element.isHired" />
          <!--q-toggle
            label="¿Puede acceder al sistema?"
            color="secondary"

          /-->

          <q-stepper-navigation>
            <!--@click="() => { done1 = true; step = 2 }"-->
            <q-btn type="submit" color="secondary" label="Continue" />
          </q-stepper-navigation>
        </q-form>
        {{element}}
      </q-step>

      <q-step :name="2" title="Cuenta" caption="Optional" icon="account_circle" :done="done2">
        An ad group contains one or more ads which target a shared set of keywords.
        <q-stepper-navigation>
          <q-btn @click="() => { done2 = true; step = 3 }" color="primary" label="Continue" />
          <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>

    </div>
  </q-page>
</template>

<script lang="ts">
import PersonalPage from './PersonalPageController'
export default PersonalPage
</script>
