<template>
  <div class="new_logo">
    <a href="/">
      <img src="@/assets/Images/forweb/logo.png" />
    </a>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class InsLogo extends Vue {}
</script>
<style scoped lang="less">
.new_logo {
  display: table-cell;
  padding-left: 5px;
  width: 10%;
  vertical-align: middle;
  background: #fff;
}
</style>
