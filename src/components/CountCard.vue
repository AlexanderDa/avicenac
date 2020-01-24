<template>
  <q-card class="q-ma-sm" bordered style="width:225px">
    <div class="text-overline">{{title}}</div>
    <div class="row flex flex-center">
      <div class="q-pa-sm">
        <q-btn round :ripple="false" :icon="icon" size="20px" :color="color"></q-btn>
      </div>
      <div class="text-grey" style="width:120px;text-align:right">
        <span class="text-h4">{{count}}</span>
      </div>
    </div>
  </q-card>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Component({
  name: 'Frame'
})
export default class CountCardComponent extends Vue {
  @Prop() public title!: string;
  @Prop() public icon!: string;
  @Prop({ default: 'secondary' }) public color!: string;
  @Prop() public count!: number;
}
</script>
