<template>
  <div :style="styla" v-if="ShowItemsLength>0">
    <p class="ProductTitle"><img src="/images/mobile/mobile_07.png"><span :class="{'TextCn':currentlang=='C'}">{{title}}</span></p>
    <swiper :options="swiperOption" ref="mySwiper" class="youlikeMainPc">
      <!-- slides -->
      <swiperSlide v-for="(item,idx) in InnerItems" :key="idx">
        <inProductWindow :item="item" :imgStyla="imgStyla"></inProductWindow>
      </swiperSlide>
        <div
          class="swiper-button-prev swiper-prev-cn"
          slot="button-prev"
          v-if="swiperOption.navigation && swiperOption.navigation.nextEl"
        ></div>
        <div
          class="swiper-button-next swiper-next-cn"
          slot="button-next"
          v-if="swiperOption.navigation && swiperOption.navigation.prevEl"
        ></div>
    </swiper>
  </div>
</template>
<script lang="ts">
import YouWouldLike from '@/model/youWouldLike';
import inButton from '@/components/base/pc/InsButton.vue';
import inProductWindow from '@/components/hkTasteBusiness/pc/product/HkProductWindow.vue';
import Currency from '@/model/currency';
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import { swiper, swiperSlide } from 'vue-awesome-swiper/src';
@Component({
  components: {
    inButton, inProductWindow, swiper, swiperSlide
  }
})
export default class InsYouWouldLike2 extends Vue {
  // data
    swiperOption: object = {
      navigation: {
        nextEl: '.swiper-next-cn',
        prevEl: '.swiper-prev-cn'
      },
      slidesPerView: 4,
      spaceBetween: 20
    };
  private InnerItems: YouWouldLike[] = [];
  private InnerItemsCopy: YouWouldLike[] = [];
  private ShowItems: YouWouldLike[][] = [];
  private Layer: boolean = false;
  private ShowItemsLength: number = 0;
  //   props
  @Prop() private readonly styla!: string;
  @Prop() private readonly imgStyla!: string;
  @Prop() private readonly title!: string;
  // @Prop() private readonly pageNum!: number;
  // @Prop() private readonly items!: YouWouldLike[];
  @Prop() private readonly ProductSku!: string;
  //   method
  click (e: MouseEvent) {
    let target = e.target as HTMLElement;
    if (target.nodeName === 'IMG') {
    }
  }
  get currentlang () {
    return this.$i18n.locale;
  }
  buttonClick (item: YouWouldLike) {
    console.log(item);
  }
  created () {
    this.$Api.product.getRltProduct(this.ProductSku).then((result) => { this.InnerItems = result.YouWouldLike; this.ShowItemsLength = result.YouWouldLike.length; });
  }
  @Watch('ProductSku')
  onProductSkuChange (o, n) {
    this.$Api.product.getRltProduct(this.ProductSku).then(result => {
      this.InnerItems = result.YouWouldLike;
      this.ShowItemsLength = result.YouWouldLike.length;
    });
  }
}
</script>
<style lang="less">
.youlikeMainPc {
  width: 90%;
  margin: 0 auto;
  margin-top: 3rem;
  margin-bottom: 2rem;
  .swiper-button-prev{
      background: #8f95a1 url('/images/mobile/pleft.png') no-repeat center center!important;
      background-size: 25px!important;
      width: 40px;
      height: 40px;
      outline: 0;
      left: 0px!important;
      top: 45%!important;
      z-index: 999;
      cursor: pointer;
  }
  .swiper-button-next{
      background: #8f95a1 url('/images/mobile/pright.png') no-repeat center center!important;
      background-size: 25px!important;
      width: 40px;
      height: 40px;
      outline: 0;
      right: 0px!important;
      top: 45%!important;
      z-index: 999;
      cursor: pointer;
  }
}
</style>
<style lang="less" scoped>
  .ProductTitle{
    font-size: 30px;
    text-transform: uppercase;
    margin-bottom: 1rem;
    height: 3rem;
    width: 460px;
    margin: 0 auto;
    margin-top: 20px;
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
.TextCn{
  font-size:30px!important;
  bottom: 10%!important;
}
.youlikeMain{
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
}
.in_slider_title {
  text-align: center;
  margin: 4rem 0;
  font-size: 2rem;
  text-transform: uppercase;
  font-weight: 700;
  position: relative;
  &::after{
    content: '';
    width: 60px;
    background: #e83428;
    height: 4px;
    display: block;
    position: absolute;
    left: 50%;
    bottom: -50%;
    transform: translate(-50%);
  }
}
.in_slider_page_container {
  box-sizing: border-box;
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  padding: 0 4rem;
  user-select: none;
}
.in_slider_page_item {
  width: 100%;
}
</style>
