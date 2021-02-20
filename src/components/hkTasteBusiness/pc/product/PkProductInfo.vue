<template>
<div class="in_panel_header">
    <div class="p-name-box">
      <p style="width: 88%;">{{panelDetail.Name}}</p>
      <div class="in_pannel_addtofav"><img :src="panelDetail.IsFavorite ? '/images/mobile/mobile_01.png': '/images/mobile/mobile_25.png'" @click="addFavorite"/></div>
    </div>
    <div class="in_panel_subTitle"><inPrices :primePrices="panelDetail.ListPrice+AddPrice" :currentPrices="panelDetail.SalePrice+AddPrice"  :currency="panelDetail.Currency" size="huge" :heightLine="true" styla="margin: 1rem 0;" :max="panelDetail.MaxPurQty" :min="panelDetail.MinPurQty"></inPrices></div>
    <div class="in_unitInfo" v-if="panelDetail.UnitInfo.Desc!==null">{{$t('product.Unit')}}:{{panelDetail.UnitInfo.Desc}}</div>
    <div class="in_panel_product">
        <div class="ProductCode">
            <div class="leftpart">
              <div class="ProductRate"><Rate  v-model="panelDetail.Score" disabled  disabled-void-color="#ffbb07" disabled-void-icon-class="el-icon-star-off"></Rate></div>
              <p>{{$t("product.ProductCode")}}:{{panelDetail.Code}}</p>
            </div>
            <div class="rightpart"><HkProductShare></HkProductShare></div>
        </div>
    </div>
</div>
</template>
<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import PanelDetail from '@/model/PanelDetail';
import inPrices from '@/components/base/pc/InsPrices.vue';
import HkProductShare from '@/components/hkTasteBusiness/pc/product/HkProductShare.vue';
import { Rate } from 'element-ui';
@Component({ components: { inPrices, HkProductShare, Rate } })
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
  font-size: 16px;
  color: #b2b2b2;
  text-align: right;
}
.p-name-box {
    width: 100%;
    position: relative;
    margin-top: 10px;
}
.p-name-box p {
    width: 100%;
    color: #333333;
    font-size: 22px;
    line-height: 26px;
    overflow: hidden;
    -webkit-box-orient: vertical;
    word-wrap: break-word;
    text-align: left;
}
.p-name-box .in_pannel_addtofav{
    position: absolute;
    right: 30px;
    top: 0;
    display: block;
    width: 30px;
    height: 37px;
}
.p-name-box .in_pannel_addtofav img{
    width: 30px;
    cursor: pointer;
}
.in_panel_header{
  width: 100%;
  display: block;
}
.in_panel_product{
    width: 100%;
    display: inline-block;
    border-bottom: 1px solid #e0e0e0;
    margin-top: 20px;
    margin-bottom: 20px;
}

.in_panel_product .ProductCode{
    width: 100%;
    display: block;
    color: #838a97;
}
.in_panel_product .ProductCode .leftpart{
    width: 60%;
    float: left;
    font-size: 16px;
    padding-bottom: 10px;
    color:#b2b2b2;
}
.in_panel_product .ProductCode .leftpart{
  .ProductRate{
    width: 100%;
    display: block;
  }
  p{
    width: 100%;
    display: block;
  }
}
.in_panel_product .ProductCode .rightpart{
    width: 40%;
    float:left;
    text-align: right;
    color:#999999;
}
.in_panel_subTitle{
    font-size: 16px!important;
    position: relative;
    width: 88%;
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  >img{
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(0,-50%);
  }
}
</style>
