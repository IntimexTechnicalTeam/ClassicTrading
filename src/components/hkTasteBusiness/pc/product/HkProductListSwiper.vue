<template>
  <div class="productSearchSwiper">
    <div class="swiper-container swiper-container-hot">
        <swiper :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiperSlide v-for="(slide, index) in hotProducts" :key="index">
           <div class="DetailTitle"><img :src="slide.Image" class="BannerImg">
           <div class="innerBox">
                <div class="TitleBg"><div class="innerBoxText">{{TitleName}}</div></div>
           </div>
          </div>
        </swiperSlide>
        </swiper>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import { swiper, swiperSlide } from 'vue-awesome-swiper/src';
@Component({ components: { swiper, swiperSlide } })
export default class PkProductListSwiper extends Vue {
    hotProducts:any[]=[];
    bannerImg: string = '';
    @Prop() private TitleName!: string;
    swiperOption: object = {
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      }
    };
    loadHotProducts () {
      this.$Api.promotion.getPromotion('PromProductList', 0).then((result) => {
        if (result.Promotion.BannerList.length > 0) {
          this.hotProducts = result.Promotion.BannerList;
        }
      });
    }
    mounted () {
      this.loadHotProducts();
    }
}
</script>
<style lang="less" scoped>
.BannerImg{
  width: 100%;
}
.productSearchSwiper{
  position: relative;
}
.productSearchSwiper  .swiper-pagination-bullet {
    width: 1rem!important;
    height: 1rem!important;
    margin-left: 5px;
}
.productSearchSwiper  .swiper-pagination-bullet-active{
    background: #f7a13a !important;
}
.productSearchSwiper   .swiper-pagination{
    margin-top: -4rem;
    transform: translateX(-50%) translateY(-50%);
    left: 50%;
}
.DetailTitle{
  width: 100%;
  display: flex;
  flex-wrap:wrap;
  position: relative;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  img{
    width: 100%;
  }
  .innerBox{
    width: 1200px;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    height: 100%;
    z-index: 10;
  }
  .TitleBg{
    background: rgba(89,97,100,.5);
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    width: 220px;
    height: 100%;
    .innerBoxText{
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 30px;
      font-weight: 700;
      font-family: 'Arial';
      line-height: 3rem;
      text-transform: uppercase;
      text-align: center;
      padding: 2rem;
    }
  }
}
</style>
