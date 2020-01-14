<template>
  <div>
    <WebAppLayout v-show="platform==='web'" :sideBarItems="menuItems">
      <router-view />
    </WebAppLayout>
    <DesktopAppLayout v-show="platform==='desktop'" :sideBarItems="menuItems">
      <router-view />
    </DesktopAppLayout>
  </div>
</template>

<script lang="ts">
import AdminLayout from './AdminLayoutController'
export default AdminLayout
</script>
