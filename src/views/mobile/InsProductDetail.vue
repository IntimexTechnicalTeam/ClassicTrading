<template>
  <div class="productDetail_container mobileDeatail">
    <div class="productDetail_main" :style="'flex-wrap: wrap;'">
      <ProductSwiper width="100%"  :imgList="ImgList" :ProductTitleName="ProductTitleName"></ProductSwiper>
      <PkProductInfo :panelDetail="PanelDetail"  :ProductSku="ProductSku" :AddPrice="getNewsPrice" width="100%" style="margin-top:2rem;"></PkProductInfo>
      <PkProductDetailCate :source="ExtAttrList" :cateTree="CatalogTree" width="100%" style="margin-top:2rem;"></PkProductDetailCate>
      <inPanel :panelDetail="PanelDetail" width="100%" :ProductSku="ProductSku"  @getPrice="showPrice" itemscopestyle="margin-top:2rem;"></inPanel>
    </div>
    <div class="tab_warpper">
      <div class="tab_header">
        <div class="detail_title" @click="IsDetail=true" v-bind:class="{isActive:IsDetail}">{{$t('product.ProductIntroduction')}}</div>
        <div class="comment_title" @click="IsDetail=false" v-bind:class="{isActive:!IsDetail}">{{$t('product.comments.title')}}</div>
      </div>
      <div class="clear"></div>
      <div class="product_detail" v-show="IsDetail && Tabs.Detail!=''">
        <div v-html="Tabs.Detail" style="padding:2rem;"></div>
      </div>
      <div class="product_detail" v-show="IsDetail" v-if="Tabs.Detail==''"><h3>{{$t('messageTips.NoContent')}}</h3></div>
      <inComments :ProductSku="ProductSku" v-show="!IsDetail"></inComments>
    </div>
    <div class id="tab"></div>
    <inYouWouldLike
      :pageNum="2"
      :title="$i18n.t('product.youWouldLike')"
      :ProductSku="ProductSku"
    ></inYouWouldLike>
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import inTab from '@/components/business/mobile/product/InsTab.vue';
import inYouWouldLike from '@/components/business/mobile/product/InsYouWouldLike2.vue';
import YouWouldLike from '@/model/youWouldLike';
import PanelDetail from '@/model/PanelDetail';
import inPanel from '@/components/business/mobile/product/InsPanel.vue';
import inPreview from '@/components/business/mobile/product/InsPreview.vue';
import ProductSwiper from '@/components/hkTasteBusiness/mobile/product/PkProductSwiperN.vue';
import PkProductDetailCate from '@/components/hkTasteBusiness/mobile/product/HkProductDetailCate.vue';
import PkProductInfo from '@/components/hkTasteBusiness/mobile/product/PkProductInfo.vue';
import ProductAttr from '@/model/ProductAttr';
import Button from '@/model/Button';
import Tab from '@/model/Tab';
import inAccordion from '@/components/base/mobile/InsAccordion.vue';
import inComments from '@/components/business/mobile/product/InsComments.vue';
import inProductUpOrDown from '@/components/business/mobile/product/InsProductUpOrDown.vue';
import ProductListSwiper from '@/components/hkTasteBusiness/mobile/product/HkProductListSwiper.vue';
@Component({ components: {
  inPreview,
  inPanel,
  inTab,
  inYouWouldLike,
  inAccordion,
  inComments,
  ProductSwiper,
  PkProductDetailCate,
  PkProductInfo,
  inProductUpOrDown,
  ProductListSwiper
} })
export default class ProductDetail extends Vue {
  private Slider: YouWouldLike[] = [];
  private Tabs: Tab = new Tab('none');
  private PanelDetail: PanelDetail = new PanelDetail('', '', '', 0, 0, '');
  private Src: string = '';
  private ImgList: string[] = [];
  private ExtAttrList: any[] = [];
  private ProductSku:string = '0';
  private IsDetail:boolean = true;
  private Score:number=0;
  private CatalogTree: any[] = [];
  private getNewsPrice:number=0;
  private PriceA:number=0;
  private PriceB:number=0;
  private PriceC:number=0;
  private ProductTitleName:string = '';
  getProduct () {
    this.ProductSku = this.$route.params.id ? this.$route.params.id : '0';
    // 获取产品详情数据
    this.$Api.product.GetProduct(this.ProductSku).then((result) => {
      this.PanelDetail = result.PanelDetail;
      this.ExtAttrList = result.PanelDetail.ExtAttrList;
      this.CatalogTree = result.PanelDetail.CatalogTree;
      this.ImgList = result.AdditionalImage;
      this.Tabs = result.Tab;
      this.Score = result.PanelDetail.Score;
      this.ProductTitleName = result.PanelDetail.Name;
      this.$HiddenLayer();
      this.$nextTick(() => {
        document.title = result.PanelDetail.Name;
      });
    });
  }
  get currentlang () {
    return this.$i18n.locale;
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
  @Watch('$route', { deep: true })
  onWatchRoute (o, n) {
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
.mobileDeatail{
.product_detail h3{
  font-size:1.4rem;
  font-weight:100;
  padding: 2rem;
}
.product_detail p{
  font-size: 1.4rem;
  color:#666666;
  line-height: 2rem;
  word-break: break-word;
}
.el-rate__decimal {
    display: inline-block;
    overflow: hidden;
    font-size: 18px;
}
.prices_warrper{
    width: 100%;
    display: inline-block;
    text-align: center;
}
  .currentPricesMain{
    .huge{
      display: inline-block;
      &:nth-child(1){
        font-size: 1.6rem;
        color: @base_color;
      }
      &:nth-child(2){
        font-size:1.6rem;
        color:@base_color;
      }
    }
  }
  .primePricesMain{
     margin-right: 1rem;
    .huge{
      display: inline-block;
      &:nth-child(1){
        font-size: 1.4rem;
        color: #b2b2b2;
        text-decoration: line-through;
      }
      &:nth-child(2){
        font-size: 1.4rem;
        color: #b2b2b2;
      }
    }
  }
}
</style>
<style scoped lang="less">
.fontNormal{
  text-align: center;
  font-size: 16px;
  color:#2c3e50;
  padding-top: 10px;
  padding-bottom: 10px;
}
.video-box{
  position: relative;
  width: 100%;
  float: left;
}
.video-box video{
    display: inline-block;
    vertical-align: baseline;
    height: 300px;
    width:100%;
}
.video-box .video-img{
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 999;
  background: url(/images/mobile/VideoBg.png) no-repeat;
  background-size:contain;
  cursor:pointer;
}
.VideoMain{
  width: 90%;
  margin: 0 auto;
  video{
    width:100%;
    height:20rem;
  }
}
.ProducBanner{
    width: 100%;
    background-size: 100% 100%;
    display: inline-block;
    box-sizing: border-box;
  }
.ProductRate{
  width: 90%;
  margin: 0 auto;
  margin-top: .5rem;
}
.isActive{
  color:#3d475f!important;
  position: relative;
  &::after{
    content: '';
    width: 12rem;
    background: url('/images/mobile/mobile_36.png') no-repeat center center;
    height: 20px;
    display: block;
    position: absolute;
    left: 50%;
    bottom: -20%;
    transform: translate(-50%);
    background-size: contain;
  }
}
.productDetail_container {
  width: 100%;
  background: #fff;
  background-size: 100% 100%;
  display: inline-block;
  box-sizing: border-box;
  padding-bottom: 5rem;
  .tab_warpper{
    margin: 2rem 0 0 0;
    .tab_header{
      width: 90%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      .comment_title,.detail_title{
        color:#999999;
        text-align: center;
        font-size: 1.4rem;
        padding-top: 1rem;
        padding-bottom: 1rem;
        float: left;
        border-radius: 3px;
        font-weight: 700;
        width: 50%;
      }
    }
    .product_detail{
      width: 90%;
      margin:0 auto;
      background: #fff;
      min-height: 20rem;
      border-radius: 3px;
      margin-top: 1rem;
      margin-bottom: 1rem;
      p{
        font-size: 1.6rem;
     }
    }
  }
}
.productDetail_main {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
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
