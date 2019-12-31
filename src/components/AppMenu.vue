<template>
  <q-btn flat round dense icon="account_circle">
    <q-menu>
      <div class="row no-wrap q-pa-md">
        <div class="column items-center">
          <q-avatar size="72px" class="shadow-1">
            <img src="@/assets/user.svg" />
          </q-avatar>

          <div class="q-mt-md q-mb-xs">
            <b>username</b>
          </div>
          <q-btn
            style="width:150px;margin-top:3px"
            v-for="(item,index) in items"
            @click="changePage(item.page)"
            :key="index"
            :icon="item.icon"
            :label="item.title"
            align="left"
            color="primary"
            outline
            no-caps
          />
        </div>
      </div>
    </q-menu>
  </q-btn>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { ListRouterItem } from '@/util'
@Component({
  name: 'AppMenu'
})
export default class AppMenuComponent extends Vue {
  @Prop({
    default: () => [
      { icon: 'settings', title: 'Mi cuenta', page: 'AccountPage' },
      { icon: 'logout', title: 'Salir', page: 'RootPage' }
    ]
  })
  public items!: ListRouterItem[];

  public async changePage (page: string) {
    if (page === 'RootPage') {
      // await localStorage.removeItem('token')
      // Vue.http.headers.common['Authorization'] = null
      this.$router.push({ name: page })
    }
    this.$router.push({ name: page })
  }
}
</script>
