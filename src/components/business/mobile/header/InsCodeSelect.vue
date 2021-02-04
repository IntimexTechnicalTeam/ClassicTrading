<template>
  <div class="main-code">
    <select id="code-select" v-model="codeId" @change="changeCurrency(codeId)">
      <option value="1">HKD</option>
      <option value="2">USD</option>
      <option value="3">RMB</option>
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
        type: 'success'
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

  // get codeId () {
  //   if (this.$Storage.get('currency')) {
  //     return this.$Storage.get('currency').Id;
  //   } else {
  //     return 1;
  //   }
  // }

  // set codeId (val) {
  //   this.changeCurrency(val);
  // }

  mounted () {
    this.LoadData();
  }
}
</script>
<style scoped lang="less">
.main-code {
  display: inline-block;
  width: 100%;
  select {
    width: 100%;
    padding-left: 1rem;
    font-size: 16px;
    border: none;
    display: inline-block;
    vertical-align: middle;
    height: 2.5rem;
    color:#666666;
    background: #FFF url('/images/mobile/baseIcon.png') 90% .5rem no-repeat;
    background-size: 12px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: 0;
    border-radius: .2rem;
  }
}
</style>
