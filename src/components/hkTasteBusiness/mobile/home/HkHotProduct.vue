<template>
  <div class="productBox mobileProductBox">
    <p class="ProductTitle"><img src="/images/mobile/mobile_07.png"><span :class="{'TextCn':currentlang=='C'}">{{bannerTitle}}</span></p>
    <div class="swiper-container swiper-container-hot">
        <swiper :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiperSlide v-for="(slide, index) in hotProducts" :key="index">
           <inProductWindow :item="slide"  class="insProductHot"></inProductWindow>
        </swiperSlide>
        <div
          class="swiper-button-prev"
          :class="'swiper-prev'+ swiperClass"
          slot="button-prev"
          v-if="swiperOption.navigation && swiperOption.navigation.nextEl"
        ></div>
        <div
          class="swiper-button-next"
          :class="'swiper-next'+ swiperClass"
          slot="button-next"
          v-if="swiperOption.navigation && swiperOption.navigation.prevEl"
        ></div>
        </swiper>
        <router-link to="/product/search/-" class="moreBtn">{{$t('Message.MoreProducts')}}</router-link>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import inProductWindow from '@/components/hkTasteBusiness/mobile/product/HkProductWindow.vue';
import { swiper, swiperSlide } from 'vue-awesome-swiper/src';
@Component({
  components: {
    inProductWindow,
    swiper,
    swiperSlide
  }
})
export default class PkHotProduct extends Vue {
    hotProducts:any[]=[];
    bannerImg: string = '';
    bannerTitle:string = '';
    @Prop() private readonly postionNum!: string;
    @Prop() private readonly swiperClass!: string;
    swiperOption: object = {
      navigation: {
        nextEl: '.swiper-next' + this.swiperClass,
        prevEl: '.swiper-prev' + this.swiperClass
      },
      slidesPerView: 2,
      spaceBetween: 20
    };
    loadHotProducts () {
      var page = 'Home';
      this.$Api.promotion.getPromotion('Home', this.postionNum).then((result) => {
        this.bannerTitle = result.Promotion.Desc;
        if (result.Promotion.PrmtProductList.length > 0) {
          this.hotProducts = result.Promotion.PrmtProductList.slice(0, 8);
        }
      });
    }
    get currentlang () {
      return this.$i18n.locale;
    }
    mounted () {
      this.loadHotProducts();
    }
}
</script>
<style lang="less">
.mobileProductBox {
  .swiper-button-prev{
      background: #8f95a1 url('/images/mobile/pleft.png') no-repeat center center!important;
      background-size: 25px!important;
      width: 40px;
      height: 40px;
      outline: 0;
      left: 0px!important;
      top: 45%!important;
  }
  .swiper-button-next{
      background: #8f95a1 url('/images/mobile/pright.png') no-repeat center center!important;
      background-size: 25px!important;
      width: 40px;
      height: 40px;
      outline: 0;
      right: 0px!important;
      top: 45%!important;
  }
}
</style>
<style lang="less" scoped>
.moreBtn{
  width: 50%;
  background: #3d475f;
  text-align: center;
  margin: 0 auto;
  height: 3.5rem;
  line-height: 3.5rem;
  color: #fff;
  font-size: 1.4rem;
  border-radius: .2rem;
  color:#fff!important;
}
.TextCn{
  font-size: 2rem!important;
  bottom: 10%!important;
}
.swiper-container-hot{
  margin-top: 2rem;
}
.ProductTitle{
    font-size: 1.6rem;
    text-transform: uppercase;
    margin-bottom: 1rem;
    height: 3rem;
    width: 90%;
    margin: 0 auto;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    img{
      width: 100%;
    }
    span{
      position: absolute;
      bottom: 20%;
      left:50%;
      transform: translate(-50%);
      text-align: center;
      font-size:1.4rem;
      font-weight: 700;
      width: 10rem;
    }
  }
.productBox {
    margin-top: 3rem;
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
}
.productBox a{
    text-decoration: none;
    color: #383838;
    display: block;
}
.productBox .ProductName{
    font-size: 1.8rem;
    width: 90%;
    margin: 0 auto;
    word-break: break-all;
    text-align: center;
    padding-bottom: 1rem;
    padding-top: 1rem;
    color:#0b0b0b;
}
.productBox .ProductPrice{
    font-size: 1.5rem;
    width: 90%;
    margin:0 auto;
    word-break: break-all;
    text-align: center;
    color:#0b0b0b;
    span{
      font-size: 1.8rem;
      color:#cd0909;
    }
}
.productBox .swiper-container {
    padding-bottom: 2rem;
}
.productBox_title {
    font-size: 2.4rem;
    text-align: center;
    text-transform: uppercase;
    color: #0b0b0b;
    margin-bottom: 5rem;
    margin-top: 5rem;
}
.gradient {
    position: relative;
    border-bottom: 1px transparent solid;
    -o-border-image: linear-gradient(to right, #fff, #3d3d3d, #fff) 10;
    border-image: -webkit-gradient(linear, left top, right top, from(#fff), color-stop(#3d3d3d), to(#fff)) 10;
    border-image: linear-gradient(to right, #fff, #3d3d3d, #fff) 10;
}
.BannerImg{
    width: 100%;
    margin: 0 auto;
    display: block;
    border: 1px solid #000;
    border-radius: 10px;
}
</style>
