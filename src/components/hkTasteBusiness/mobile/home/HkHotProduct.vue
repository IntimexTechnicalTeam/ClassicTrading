<template>
  <div class="productBox">
    <p class="ProductTitle"><i class="productIcon"></i>{{$t('Message.WhatNew')}}</p>
    <div class="swiper-container swiper-container-hot">
        <swiper :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiperSlide v-for="(slide, index) in hotProducts" :key="index">
           <inProductWindow :item="slide"  style="width:100%;" class="insProductHot"></inProductWindow>
        </swiperSlide>
        <div class="swiper-scrollbar"   slot="scrollbar"></div>
        </swiper>

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
    @Prop() private readonly postionNum!: string;
    swiperOption: object = {
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      scrollbar: {
        el: '.swiper-scrollbar'
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      slidesPerView: 2,
      spaceBetween: 20
    };
    loadHotProducts () {
      var page = 'Home';
      this.$Api.promotion.getPromotion('Home', this.postionNum).then((result) => {
        if (result.Promotion.PrmtProductList.length > 0) {
          this.hotProducts = result.Promotion.PrmtProductList.slice(0, 8);
        }
      });
    }
    mounted () {
      this.loadHotProducts();
    }
}
</script>
<style>
.swiper-scrollbar {
    border-radius:0px!important;
    position: relative;
    background: #f0f0f0!important;
}
.swiper-scrollbar-drag{
      background: #666666;
      border-radius: 0px;
}
.swiper-container-horizontal > .swiper-scrollbar{
      height: 4px!important;
}
.productBox  .insProductHot img{
    width: 100%!important;
    margin: 0 auto;
    display: block;
}
</style>
<style lang="less" scoped>
 .ProductTitle{
    font-size: 1.6rem;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 1rem;
     .productIcon {
         background: url('/images/mobile/mobile_15.jpg') no-repeat center center;
         width: 1.5rem;
         height: 1.5rem;
         background-size: 1.5rem;
         display: inline-block;
         margin-right: .5rem;
         vertical-align: middle;
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
