<template>
  <q-btn v-if="!clicked" size="12px"  flat round dense icon="delete" @click="onFirstClick()" />
  <q-btn v-else size="12px" flat round dense icon="info" @click="onConfirmedClick()" color="orange">
    <q-tooltip v-model="tooltip">Haga clic para confirmar.</q-tooltip>
  </q-btn>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Emit, Watch } from 'vue-property-decorator'

@Component({ name: 'del-btn' })
export default class DeletePromt extends Vue {
  private clicked: boolean = false;
  private tooltip: boolean = false;

  onFirstClick () {
    this.clicked = true
    setTimeout(() => {
      this.tooltip = true
    }, 500)
    setTimeout(() => {
      this.clicked = false
    }, 3000)
  }

  @Emit('onDelete')
  onConfirmedClick () {
    this.clicked = false
    return null
  }
}
</script>
