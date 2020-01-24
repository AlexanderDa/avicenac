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
              v-if="elementIndex===-1"
              class="col-xs-12"
              @keyup.space="findPersonal()"
              v-model="personalCredential"
              placeholder="Cédula o pasaporte"
              :rules="[
              // v => element.patientId || 'Paciente requerido.'
            ]"
              label="Personal"
              mask="##########"
              unmasked-value
              bottom-slots
              clearable
              outlined
              dense
            >
              <template v-slot:after>
                <q-btn
                  style="margin-left:-7px;height:100%;"
                  color="secondary"
                  icon="search"
                  @click="findPersonal()"
                />
              </template>
            </q-input>

            <q-input
              class="col-xs-12 col-sm-6"
              v-model="element.firstName"
              :rules="[]"
              label="Nombres *"
              readonly
              outlined
              dense
              lazy-rules
            />

            <q-input
              class="col-xs-12 col-sm-6"
              v-model="element.lastName"
              :rules="[]"
              label="Apellidos *"
              readonly
              outlined
              dense
              lazy-rules
            />

            <q-input
              class="col-xs-12 col-sm-6"
              v-model="element.dni"
              :rules="[]"
              label="Cédula *"
              mask="#########-#"
              unmasked-value
              readonly
              outlined
              dense
              lazy-rules
            />
            <q-input
              class="col-xs-12 col-sm-6"
              v-model="element.passport"
              :rules="[]"
              label="Pasaporte"
              readonly
              outlined
              dense
              lazy-rules
            />

            <q-input
              class="col-xs-12 col-sm-6"
              v-model="element.mobile"
              :rules="[]"
              label="Número celular *"
              mask="### ### ####"
              unmasked-value
              readonly
              outlined
              dense
              lazy-rules
            />
            <q-input
              class="col-xs-12 col-sm-6"
              v-model="element.telephone"
              :rules="[]"
              label="Teléfono fijo "
              mask="( ### ) ### ####"
              unmasked-value
              readonly
              outlined
              dense
              lazy-rules
            />
            <q-input
              class="col col-xs-12"
              v-model="element.emailAddress"
              :rules="[]"
              label="Correo electrónico *"
              readonly
              outlined
              dense
              lazy-rules
            />
            <q-input
              class="col col-xs-12"
              v-model="element.address"
              :rules="[]"
              label="Dirección *"
              readonly
              outlined
              dense
              lazy-rules
            />
            <q-toggle label="¿Es contratado?" color="secondary" v-model="element.isHired" />
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
import DoctorPageController from './DoctorPageController'
export default DoctorPageController
</script>
