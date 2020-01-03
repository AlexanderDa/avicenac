<template>
  <q-card :style="(width)?`min-width: ${width}px`:null">
    <q-toolbar class="bg-secondary text-white">
      <q-icon size="sm" :name="icon" />
      <q-toolbar-title>{{title}}</q-toolbar-title>
      <slot name="action" />
    </q-toolbar>
    <Empty v-if="empty || empty === ''" />
    <div v-else>
      <slot name="content.toScroll" />
      <q-card-section>
        <slot name="content" />
      </q-card-section>
    </div>
  </q-card>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Emit } from 'vue-property-decorator'
import Empty from '@/components/Empty.vue'

@Component({
  name: 'Frame',
  components: {
    Empty
  }
})
export default class FrameComponent extends Vue {
  @Prop() public title!: string;
  @Prop() public icon!: string;
  @Prop() public width!: number;
  @Prop() public empty!: boolean;
}
</script>
