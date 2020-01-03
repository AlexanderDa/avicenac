<template>
  <q-page>
    <q-toolbar class="shadow-1">
      <q-toolbar-title>Personal</q-toolbar-title>
      <q-input filled clearable v-model="search" style="width:300px" placeholder="Buscar" dense />
      <q-space />
      <q-btn flat round dense icon="add" />
      <q-btn flat round dense icon="refresh" />
    </q-toolbar>
    {{search}}
  </q-page>
</template>

<script lang="ts">
import PersonalPage from './PersonalPageController'
export default PersonalPage
</script>
