<template>
  <div id="Header">
    <!-- <footerLayout1 /> -->
    <component :is="layout" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {
    headerLayout1: () => import('@/components/hkTasteBusiness/pc/header/InsHeaderLayout1.vue')
  }
})
export default class InsHeader extends Vue {
  layout: string = 'headerLayout1';
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
