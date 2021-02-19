<template>
  <div class="main-code">
    <select id="code-select" v-model="codeId" @change="changeCurrency(codeId)">
      <option value="1" style="color:#000">HKD</option>
      <option value="2" style="color:#000">USD</option>
      <option value="3" style="color:#000">RMB</option>
    </select>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class InsCodeSelect extends Vue {
  codeId:number=1;
  changeCurrency (val) {
    this.$Api.member.setCurrency(val).then((result) => {
      this.$message({
        message: this.$t('changeCurSuccess') as string,
        type: 'success',
        customClass: 'NormalBg'
      });
      this.$store.dispatch('setCurrency', result.ReturnValue);
      this.Reload();
    }).catch((error) => {
      console.log(error);
    });
  }

  LoadData () {
    this.$Api.shoppingCart.LoadData().then((result) => {
      this.codeId = result.Currency.Id;
    });
  }
  mounted () {
    this.LoadData();
  }
}
</script>
<style lang="less" >
.NormalBg{
  z-index: 9999999!important;
  background: #ebe3e3!important;
  .el-message__content{
    color:#282828!important;
  }
  .el-icon-success{
    color:#282828!important;
  }
}
</style>
<style scoped lang="less">
.main-code {
  display: inline-block;

  select {
    width: 60px;
    font-size: 15px;
    background: none;
    color: #fff;
    border: none;
    outline: none;
    background:  url(/images/mobile/downicon.png) 95% 8px no-repeat;
    background-size: 15px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: 0;
    height: 30px;
    cursor: pointer;
  }
}
</style>
