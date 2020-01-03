<template>
  <div>
    <q-table
      card-container-class="table-single-card"
      :pagination.sync="pagination"
      :rows-per-page-options="[0]"
      :data="elements"
      row-key="label"
      :columns="headers"
      :filter="search"
      virtual-scroll
      grid
    >
      <template v-slot:top>
        <q-toolbar class="shadow-1 bg-white">
        <q-space />
        <q-input placeholder="Buscar" v-model="search" filled dense clearable>
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-space />
        <q-btn flat round dense icon="refresh" @click="findElements()" />
        <q-btn flat round dense icon="add" @click="dialog=true" />
        </q-toolbar>
      </template>

      <template v-slot:item="props">
        <q-card class="q-ma-md " style="width:300px;" >
          <q-separator />
          <q-list dense >
            <q-item v-for="col in props.cols.filter(col => col.name !== 'desc')" :key="col.name">
              <q-item-section>
                <q-item-label>{{ col.label }}</q-item-label>
                <q-item-label caption>{{ col.value }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item class="text-grey">
              <q-space></q-space>
              <q-btn size="12px" flat round dense icon="edit" @click="toEditElement(props.row)" />
              <DeletePromt @onDelete="deleteElement(props.row)" />
            </q-item>
          </q-list>
        </q-card>
      </template>

      <template v-slot:no-data>
        <Empty class="full-width row flex-center" :title="(search)?'Sin resultados':'Sin datos'" />
      </template>
    </q-table>

    <q-dialog v-model="dialog" persistent>
      <Frame
        :title="elementIndex!==-1?'Editar':'Nuevo'"
        icon="airline_seat_flat_angled"
        width="300"
      >
        <q-btn slot="action" flat round dense icon="close" @click="reset()" />
        <q-form slot="content" @submit="submit" class="q-gutter-md">
          <q-input
            outlined
            dense
            v-model="element.name"
            label="Nombre *"
            lazy-rules
            :rules="rules.name"
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
import SurgeryroomPage from './SurgeryroomController'
export default SurgeryroomPage
</script>
