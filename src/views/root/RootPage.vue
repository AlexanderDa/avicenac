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
    <AppFooter/>
  </q-layout>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import AppFooter from '@/components/AppFooter.vue'

@Component({
  name: 'HomePage',
  components: {
    AppFooter
  }
})
export default class HomePageController extends Vue {}
</script>
