<template>
  <div class="PromotionMain">
    <div class="hotProductMain">
      <HkHotProduct :postionNum="1"/>
    </div>
    <div class="hotProductMain">
      <HkHotProduct :postionNum="2"/>
    </div>
    <div class="hotProductMain">
      <HkHotProduct :postionNum="3"/>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import { swiper, swiperSlide } from 'vue-awesome-swiper/src';
@Component({
  components: {
    HkHotProduct: () => import('@/components/hkTasteBusiness/mobile/home/HkHotProduct.vue'),
    swiper,
    swiperSlide
  }
})
export default class HkPromotion extends Vue {
  private TouriData:any[]= [];
  private productCate:any[] = [];
  getTouri () {
    var page = 'Home';
    this.$Api.promotion.getPromotion('Home', 2).then((result) => {
      if (result.Promotion.BannerList.length > 0) {
        this.TouriData = result.Promotion.BannerList;
      }
    });
  }
  getProductCate () {
    this.$Api.product.getAttrList().then(result => {
      this.productCate = result[0].Children;
      console.log(this.productCate, 'this.productCatethis.productCate');
    });
  }
  created() {
    this.getTouri();
    this.getProductCate();
  }
}
</script>
<style lang="less" scoped>
  .HotCategories{
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    margin-top: 2rem;
    .productCat{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      li{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        a{
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          position: relative;
          height: 30rem;
          background-position: center center;
          background-size: cover;
          .tops{
            position: absolute;
            bottom: 10%;
            width: 100%;
            display: inline-block;
            left: 5%;
            .catName{
              width:100%;
              display: flex;
              flex-wrap: wrap;
              font-size: 2rem;
              color: #fff;
              font-family: 'ArialBlack';
              font-weight: 700;
            }
            .learnMore{
              width:100%;
              display: flex;
              flex-wrap: wrap;
              align-items: center;
              justify-content: flex-start;
              b{
                width: 50%;
                height: 4rem;
                line-height: 4rem;
                background: #e83428;
                color: #fff;
                font-size: 1.6rem;
                border-radius: 2rem;
                text-align: center;
                margin-top: 1rem;
                font-weight: 500;
              }
            }
          }
          img{
            width: 100%;
          }
        }
      }
    }
  }
.ProductTitle{
   font-size: 1.6rem;
   font-weight: 700;
   text-transform: uppercase;
   margin-bottom: 1rem;
   margin-top: 2rem;
   width: 100%;
   display: inline-block;
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
.PromotionMain{
  width: 100%;
  display: inline-block;
  margin-top: 5rem;
}
.TouriMain{
  width: 90%;
  margin: 0 auto;
  position: relative;
  img{
    width: 100%;
  }
  .TouriText{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    position: absolute;
    bottom: 15%;
    align-items: center;
    justify-content: center;
    .T1{
      font-size: 2rem;
      font-weight: 700;
      color: #fff;
      font-family: 'ArialBlack';
      display: flex;
      align-items: center;
      text-align: center;
      flex-wrap: wrap;
      justify-content: center;
      width: 100%;
    }
    .T2{
      font-size: 1.2rem;
      color: #fff;
      display: flex;
      align-items: center;
      text-align: center;
      flex-wrap: wrap;
      justify-content: center;
      width: 100%;
    }
    .TouriBtn{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      a{
        width: 50%;
        height: 4rem;
        line-height: 4rem;
        background: #e83428;
        color: #fff;
        font-size: 1.6rem;
        border-radius: 2rem;
        text-align: center;
        margin-top: 1rem;
      }
    }
  }
}
</style>
