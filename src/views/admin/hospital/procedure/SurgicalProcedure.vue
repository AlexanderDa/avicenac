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
          <q-input
            v-model="element.name"
            label="Procedimiento *"
            :rules="rules.name"
            outlined
            dense
            lazy-rules
          />
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
import ProcedureController from './SurgicalProcedureController'
export default ProcedureController
</script>
