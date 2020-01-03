<template>
  <div class="column flex flex-center">
    <img src="@/assets/empty.svg" style="max-width: 100px" />
    <span class="text-grey-5">{{title}}</span>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Component({
  name: 'Frame'
})
export default class EmptyComponent extends Vue {
  @Prop({ default: 'Sin datos' }) public title!: string;
}
</script>
