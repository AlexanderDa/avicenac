<template>
  <q-page>

      <div class="row q-pa-md q-ma-md">
        <div class="col q-mt-lg">
          <div class="row q-col-gutter-lg">
            <CountCard title="Pacientes" icon="fas fa-user-injured" :count="patients" color="blue" />
            <CountCard title="Usuarios" icon="fas fa-user-circle" :count="users" color="purple" />
            <CountCard title="Doctores" icon="fas fa-user-md" :count="doctors" />
          </div>
        </div>
      </div>

  </q-page>
</template>

<script lang="ts">
import DashboardPage from './DashboardPageController'
export default DashboardPage
</script>
