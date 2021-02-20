<template>
<div class="productDetailWarper PcVersion">
  <div class="productDetail_container">
    <div class="productDetail_main">
      <inPreview style="width:50%" :imgList="ImgList" :pageNum="userAgent === 'mobile' ?  1 : 4"></inPreview>
      <div style="width:45%;margin-left:5%;float:right;">
          <PkProductInfo :panelDetail.sync="PanelDetail"  :ProductSku="ProductCode" width="100%" :AddPrice="getNewsPrice" style="margin-top:3rem;"></PkProductInfo>
          <PkProductDetailCate :source="ExtAttrList" :cateTree="CatalogTree"  width="100%"></PkProductDetailCate>
          <inPanel :panelDetail.sync="PanelDetail" :ProductSku="ProductCode" @getPrice="showPrice" width="100%"></inPanel>
      </div>
    </div>
    <div class="tab_warpper">
      <div class="tab_header">
        <div class="detail_title" @click="IsDetail=true" v-bind:class="{isActive:IsDetail}">{{$t('product.ProductIntroduction')}}</div>
        <div class="comment_title" @click="IsDetail=false" v-bind:class="{isActive:!IsDetail}">{{$t('product.comments.title')}}</div>
      </div>
      <div class="clear"></div>
      <div class="product_detail" v-html="Tabs.Detail" v-show="IsDetail" v-if="Tabs.Detail!==''"></div>
      <div class="product_detail"  v-show="IsDetail" v-if="Tabs.Detail==''">{{$t('messageTips.NoContent')}}</div>
      <inComments :ProductSku="ProductCode" v-show="!IsDetail"></inComments>
    </div>
  </div>
    <div class="maincontent">
    <inYouWouldLike
      styla="margin-bottom:50px;"
      :pageNum="4"
      :title="$i18n.t('product.youWouldLike')"
      :ProductSku="ProductCode"
    ></inYouWouldLike>
    </div>
</div>
</template>
<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import inTab from '@/components/business/pc/product/InsTab.vue';
import inYouWouldLike from '@/components/business/pc/product/InsYouWouldLike.vue';
import YouWouldLike from '@/model/youWouldLike';
import PanelDetail from '@/model/PanelDetail';
import inPanel from '@/components/hkTasteBusiness/pc/product/InsPanel.vue';
import inPreview from '@/components/business/pc/product/InsPreviewN.vue';
import inProductUpOrDown from '@/components/business/pc/product/InsProductUpOrDown.vue';
import ProductAttr from '@/model/ProductAttr';
import Tab from '@/model/Tab';
import inComments from '@/components/business/pc/product/InsComments.vue';
import PkProductDetailCate from '@/components/hkTasteBusiness/pc/product/HkProductDetailCate.vue';
import PkProductInfo from '@/components/hkTasteBusiness/pc/product/PkProductInfo.vue';
import ProductListSwiper from '@/components/hkTasteBusiness/pc/product/HkProductListSwiper.vue';
@Component({ components: {
  inPreview,
  inPanel,
  inTab,
  inYouWouldLike,
  inComments,
  inProductUpOrDown,
  PkProductDetailCate,
  PkProductInfo,
  ProductListSwiper
} })
export default class InsProductDetail extends Vue {
  private Slider: YouWouldLike[] = [];
  private Tabs: Tab[] = [new Tab('none')];
  private PanelDetail: PanelDetail = new PanelDetail('', '', '', 0, 0, '');
  private Src: string = '';
  private IsDetail:boolean = true;
  private ImgList: string[] = [];
  private ProductCode:string = '0';
  private ExtAttrList: any[] = [];
  private ProductSku:string = '0';
  private Score:number=0;
  private CatalogTree: any[] = [];
  private getNewsPrice:number=0;
  private PriceA:number=0;
  private PriceB:number=0;
  private PriceC:number=0;
  get pc () {
    return this.$route.params.id;
  }
  showPrice (val) {
    if (val[0]) {
      this.PriceA = val[0].AdditionalPrice;
    }
    if (val[1]) {
      this.PriceB = val[1].AdditionalPrice;
    }
    if (val[2]) {
      this.PriceC = val[2].AdditionalPrice;
    }
    this.getNewsPrice = this.PriceA + this.PriceB + this.PriceC;
  }
  created () {
    this.getProduct();
  }
  getProduct () {
    var that = this;
    that.ProductCode = that.$route.params.id ? that.$route.params.id : '0';
    // 获取产品详情数据
    that.$Api.product.GetProduct(that.pc).then((result) => {
      that.$nextTick(() => {
        document.title = result.PanelDetail.Name;
      });
      that.PanelDetail = result.PanelDetail;
      that.ExtAttrList = result.PanelDetail.ExtAttrList;
      that.CatalogTree = result.PanelDetail.CatalogTree;
      that.Score = result.PanelDetail.Score;
      that.ImgList = result.AdditionalImage;
      that.Tabs = result.Tab;
      that.$HiddenLayer();
    });
  }
  get currentlang () {
    return this.$i18n.locale;
  }
  mounted () {

  }
  @Watch('pc', { deep: true })
  onWatchRoute (o, n) {
    this.$store.dispatch('setProductDetailSku', this.pc);
    this.getProduct();
  }
  gotoSlider () {
    this.$nextTick(() => {
      let target = document.getElementById('tab') as HTMLElement;
      target.scrollIntoView();
    });
  }
}
</script>
<style  lang="less">
.PcVersion .product_detail h3,.PcVersion .product_detail p{
  font-size:16px;
  font-weight:100;
  color:#666666;
  line-height: 25px;
  word-break: break-word;
}
.PcVersion .el-rate__decimal {
    display: inline-block;
    overflow: hidden;
    font-size: 18px;
}
.PcVersion .productDetail_container .in_pdWindow_item_description{
    .currentPricesMain{
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .primePricesMain{
      display: flex;
      align-items: center;
      justify-content: center;
    }
}
.PcVersion .productDetail_container {
  .currentPricesMain{
     display: block;
    .huge{
      display: inline-block;
      &:nth-child(1){
        font-size: 22px;
        color:#3d475f;
      }
      &:nth-child(2){
        font-size:22px;
        color:#3d475f;
      }
    }
  }
  .primePricesMain{
    display: block;
    margin-right: 10px;
    .huge{
      display: inline-block;
      &:nth-child(1){
        font-size: 16px;
        color: #b2b2b2;
      }
      &:nth-child(2){
        font-size: 16px;
        color: #b2b2b2;
      }
    }
  }
}
</style>
<style lang="less" scoped>
.fontNormal{
  text-align: center;
  font-size: 16px;
  color:#2c3e50;
  padding-top: 10px;
  padding-bottom: 10px;
}
.ProducBanner{
    width: 100%;
    background-size: 100% 100%;
    display: inline-block;
    box-sizing: border-box;
    .innerBanner{
      width: 100%;
      margin:0 auto;
      img{
        width: 100%;
      }
    }
  }
.productDetailWarper{
  width: 100%;
  display: inline-block;
  background: #fff;
  background-size: 100% 100%;
  box-sizing: border-box;
}
.commentsLine{
    width: 100%;
    height: 1px;
    background: #000;
    margin-top: 100px;
}
.isActive{
  color:#3d475f!important;
  position: relative;
  &::after{
    content: '';
    width: 180px;
    background: url('/images/pc/productLine.png') no-repeat center center;
    height: 10px;
    display: block;
    position: absolute;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%);
  }
}
.productDetail_container {
  margin:0 auto;
  width:1200px;
  display: block;
  .tab_warpper{
    margin: 3rem 0 0 0;
    .tab_header{
      display: block;
      width: 100%;
      justify-content: space-between;
      .comment_title,.detail_title{
        color:#999999;
        text-align: center;
        font-size: 24px;
        padding-top: 1rem;
        padding-bottom: 1rem;
        float: left;
        border-radius: 3px;
        font-weight: 700;
        cursor: pointer;
      }
      .detail_title{
        margin-right:5rem;
      }
    }
    .product_detail{
      width: 1160px;
      margin:0 auto;
      background: #fff;
      min-height: 20rem;
      border-radius: 3px;
      margin-top: 1rem;
      margin-bottom: 1rem;
      padding: 20px;
      p{
        font-size: 1.6rem;
     }
    }
  }
}
.productDetail_main {
  box-sizing: border-box;
  width: 100%;
  display: inline-block;
}
.productDetail_price_warpper {
  display: flex;
  flex-wrap: nowrap;
  height: 60px;
  line-height: 60px;
  justify-content: space-between;
  background-color: #f5f5f5;
  padding: 0 10px;
  margin: 10px 0;
}
.productDetail_price {
  display: flex;
  flex-wrap: nowrap;
}
.productDetail_price_lable {
  font-size: 24px;
}
.productDetail_precentPrice_content {
  margin-left: 20px;
  font-size: 24px;
}
.productDetail_precentPrice_content_heightLine {
  color: red;
}
.productDetail_primePrice_content {
  margin-left: 20px;
  font-size: 24px;
  text-decoration: line-through;
}
</style>
