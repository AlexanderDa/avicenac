<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <span style="margin-left:15px">Avicena</span>
        </q-toolbar-title>
        <AppMenu :items="appMenuItems" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" behavior="desktop" mini bordered content-class="bg-grey-3">

        <q-list v-for="(item, index) in sideBarItems" :key="index">
          <q-item
            clickable
            :active="item.page === $route.name"
            active-class="bg-grey-4"
            @click="$router.push({ name: item.page })"
          >
            <q-item-section avatar>
              <q-icon :name="item.icon" />
            </q-item-section>
            <q-tooltip anchor="center right" :delay="1000">{{item.title}}</q-tooltip>
          </q-item>

          <q-separator v-if="item.separator" />
        </q-list>
    </q-drawer>

    <q-page-container>
      <slot name="default" />
    </q-page-container>
  </q-layout>
</template>
<script lang="ts">
/* import AppLayoutController from './AppLayoutController'
export default AppLayoutController */
import Vue from 'vue'
import Component from 'vue-class-component'
import AppMenu from '@/components/AppMenu.vue'
import { Prop } from 'vue-property-decorator'
import { ListRouterItem } from '@/util'

@Component({
  name: 'WebAppLayout',
  components: {
    AppMenu
  }
})
export default class WebAppLayoutComponent extends Vue {
  public drawer: boolean = false;
  @Prop() public sideBarItems!: ListRouterItem[];
  @Prop() public appMenuItems!: ListRouterItem[];

  private beforeMount (): void {
    this.drawer = this.sideBarItems.length > 0
  }
}
</script>
