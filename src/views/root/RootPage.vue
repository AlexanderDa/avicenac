<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-page class="flex flex-center">
        <div class="column">
          <div class="col">
            <img src="@/assets/logo.svg" width="150" />
          </div>
          <div class="col flex flex-center" style="padding-top:50px">
            <q-circular-progress
              indeterminate
              size="100px"
              :thickness="0.1"
              show-value
              color="primary"
              track-color="grey-3"
              class="text-grey-5"
            >
              <span style="font-size:15px">Cargando</span>
            </q-circular-progress>
          </div>
        </div>
      </q-page>
    </q-page-container>
    <AppFooter />
  </q-layout>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import AppFooter from '@/components/AppFooter.vue'
import AccountService from '../../services/AccountService'
import UserModel from '../../models/UserModel'

@Component({
  name: 'HomePage',
  components: {
    AppFooter
  }
})
export default class HomePageController extends Vue {
  created () {
    const service: AccountService = new AccountService()
    service
      .me()
      .then((me: UserModel) => {
        switch (me.roleId) {
          case 1:
            this.$router.push({ name: 'Admin' })
            break
          case 2:
            this.$router.push({ name: 'MainMedicoPage' })
            break
          default:
            this.$router.push({ name: 'LoginPage' })
            break
        }
      })
      .catch(() => {
        this.$router.push({ name: 'LoginPage' })
      })
  }
}
</script>
