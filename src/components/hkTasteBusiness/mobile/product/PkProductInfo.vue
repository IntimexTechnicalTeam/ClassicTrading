<template>
<div class="in_panel_header">
    <div class="in_panel_subTitle">{{panelDetail.Name}}</div>
    <div class="in_panel_subTitle"><inPrices :primePrices="panelDetail.ListPrice+AddPrice" :currentPrices="panelDetail.SalePrice+AddPrice"  :currency="panelDetail.Currency" size="huge" :heightLine="true" styla="margin: 1rem 0;" :max="panelDetail.MaxPurQty" :min="panelDetail.MinPurQty"></inPrices></div>
    <div class="in_pannel_addtofav"><img :src="panelDetail.IsFavorite ? '/images/mobile/mobile_03.jpg': '/images/mobile/mobile_29.jpg'" @click="addFavorite"/></div>
    <div class="in_unitInfo" v-if="panelDetail.UnitInfo.Desc!==null">{{$t('product.Unit')}}:{{panelDetail.UnitInfo.Desc}}</div>
    <div class="in_panel_product">
        <div class="ProductCode">
            <div class="leftpart">{{$t('product.ProductCode')}}:{{panelDetail.Code}}</div>
            <div class="rightpart"><HkProductShare></HkProductShare></div>
        </div>
    </div>
</div>
</template>
<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import PanelDetail from '@/model/PanelDetail';
import inPrices from '@/components/base/mobile/InsPrices.vue';
import HkProductShare from '@/components/hkTasteBusiness/mobile/product/HkProductShare.vue';
@Component({ components: { inPrices, HkProductShare } })
export default class PkProductInfo extends Vue {
  @Prop() private readonly panelDetail!: PanelDetail;
  @Prop() private readonly ProductSku!: string;
  @Prop() private readonly AddPrice!: string;
  addFavorite () {
    let ps;
    if (this.panelDetail.IsFavorite) {
      ps = this.$Api.product.removeFavorite(this.ProductSku).then((result) => {
        if (result.Succeeded) {
          this.$message({
            message: this.$t('MyFavorite.RemoveSuccess') as string,
            type: 'error',
            customClass: 'NormalBg'
          });
          this.panelDetail.IsFavorite = false;
        } else if (result.ReturnValue.Code === 1000) {
          Vue.prototype.$Confirm(this.$t('product.logouted'), this.$t('product.loginow'), () => { this.$Login(this.addFavorite); });
        }
      });
    } else {
      ps = this.$Api.product.addFavorite(this.ProductSku).then((result) => {
        if (result.Succeeded) {
          // Vue.prototype.$Confirm(this.$t('Message.Message'), this.$t('product.successInAdding'));
          this.$message({
            message: this.$t('MyFavorite.AddSuccess') as string,
            type: 'success',
            customClass: 'NormalBg'
          });
          this.panelDetail.IsFavorite = true;
        } else if (result.ReturnValue.Code === 1000) {
          Vue.prototype.$Confirm(this.$t('product.logouted'), this.$t('product.loginow'), () => { this.$Login(this.addFavorite); });
        }
      });
    }
    return ps;
  }
}
</script>
<style lang="less">
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
.favorite-box .el-card__body{
  padding: 0px!important;
}
</style>
<style scoped lang="less">
.in_unitInfo{
  font-size: 1.2rem;
  color: #b2b2b2;
  text-align: right;
  width: 90%;
  margin: 0 auto;
}
.in_panel_header{
  width: 100%;
  display: block;
}
.in_panel_product{
    width: 100%;
    border-bottom: 1px solid #e0e0e0;
    padding-top: 3rem;
    display:flex;
}
.in_pannel_addtofav{
    width: 95%;
    margin: 0 auto;
    text-align: center;
}
.in_pannel_addtofav img{
    width:2.5rem;
}
.in_panel_product .ProductCode{
    width: 90%;
    margin: 0 auto;
}
.in_panel_product .ProductCode .leftpart{
    width:65%;
    float: left;
    font-size: 1.2rem;
    word-break: break-all;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    padding-top: .5rem;
    color:#b2b2b2;
    align-items: baseline;
    margin-right: 5%;
    span{
      width: 45%;
      padding-top: 0rem;
      display:flex;
    }
}
.in_panel_product .ProductCode .rightpart{
    width: 30%;
    float: left;
    text-align: right;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 1.2rem;
    color:#b2b2b2;
}
.in_panel_subTitle{
    font-size: 2rem;
    position: relative;
    width: 90%;
    margin: 0 auto;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #333;
  >img{
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(0,-50%);
  }
}
</style>
