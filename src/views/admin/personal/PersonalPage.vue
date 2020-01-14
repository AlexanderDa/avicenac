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
        <q-btn flat round dense icon="add" @click="wizard=true" />
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
      <q-toolbar class="shadow-1">
        <q-toolbar-title>{{(elementIndex!==-1?'Editar profesional':'Nuevo profesional')}}</q-toolbar-title>
        <q-space />
        <q-btn flat round dense icon="list" @click="reset()" />
      </q-toolbar>
      <q-scroll-area class="scrollable-form">
        <q-form @submit="submit()">
          <q-stepper
            v-model="step"
            ref="stepper"
            animated
            done-color="green"
            active-color="primaty"
            inactive-color="secondary"
          >
            <q-step
              :name="1"
              caption="Optional"
              title="Cuenta"
              icon="account_circle"
              :done="step > 1"
            >
              <q-form :disable="elementIndex>-1">
                <div class="row">
                  <div class="col col-xs-12 col-sm-6 flex flex-center">
                    <q-avatar size="200px" rounded>
                      <img v-if="user.image" :src="user.image" />
                      <img v-else src="@/assets/user.svg" alt />
                    </q-avatar>
                  </div>
                  <div class="col col-xs-12 col-sm-6">
                    <q-input
                      v-model="user.emailAddress"
                      :rules="rules.email"
                      label="Correo electrónico *"
                      :readonly="elementIndex>-1"
                      clearable
                      outlined
                      dense
                      lazy-rules
                    >
                      <template v-slot:after>
                        <q-btn
                          style="margin-left:-7px;height:100%;"
                          :disabled="elementIndex>-1"
                          color="secondary"
                          icon="search"
                          @click="findAccount()"
                        />
                      </template>
                    </q-input>

                    <q-input
                      style="margin-bottom:15px"
                      label="Rol de usuario *"
                      :value="getRole(user.roleId)"
                      readonly
                      outlined
                      dense
                    />
                    <q-input
                      label="Estado *"
                      :value="user.isActive?'Activo':'Inactivo'"
                      :class="user.isActive?'bg-green':'bg-red'"
                      readonly
                      outlined
                      dense
                    />
                  </div>
                </div>
              </q-form>
            </q-step>

            <q-step
              :name="2"
              title="Información personal"
              icon="create_new_folder"
              :done="step > 2"
            >
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
                  v-if="!user.createdAt"
                  class="col col-xs-12"
                  v-model="user.emailAddress"
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

                <q-toggle label="¿Es contratado?" color="secondary" v-model="element.isHired" />
              </div>
            </q-step>

            <!--q-step :name="3" title="Create an ad" icon="add_comment">
            </q-step-->

            <template v-slot:navigation>
              <q-stepper-navigation>
                <q-space></q-space>
                <q-btn v-show="step === 2 " color="secondary" type="submit" label="Guardar" />
                <q-btn v-show="step<2"
                  @click="$refs.stepper.next()"
                  color="secondary"
                  label="Siguiente"
                />

                <q-btn
                  v-if="step > 1"
                  flat
                  color="secondary"
                  @click="$refs.stepper.previous()"
                  label="Back"
                  class="q-ml-sm"
                />
              </q-stepper-navigation>
            </template>
          </q-stepper>
        </q-form>
      </q-scroll-area>
    </div>
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
