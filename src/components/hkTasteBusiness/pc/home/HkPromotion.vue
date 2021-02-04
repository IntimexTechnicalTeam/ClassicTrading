<template>
  <div class="PromotionMain">
    <div class="hotProductMain">
      <HkHotProduct/>
    </div>
    <div class="TouriMain">
      <div  v-for="(v,index) in TouriData" :key="index" v-show="index===0">
        <img :src="v.Image">
        <div class="TouriText">
          <p class="T1"  v-if="v.Content.indexOf('*')!=-1">{{v.Content.split('*')[0]}}</p>
          <p class="T2"  v-if="v.Content.indexOf('*')!=-1">{{v.Content.split('*')[1]}}</p>
          <p class="T2"  v-if="v.Content.indexOf('*')!=-1">{{v.Content.split('*')[2]}}</p>
          <p class="TouriBtn"><router-link :to="v.Url">{{$t('Message.LearnMore')}}</router-link></p>
        </div>
      </div>
    </div>
    <div class="HotCategories">
         <p class="ProductTitle"><i class="productIcon"></i>{{$t('Message.HotCategories')}}</p>
         <ul class="productCat">
           <li v-for="(b,index) in productCate" :key="index"  >
             <router-link
               :to="'/product/search/-?' + 'catalogs=' + JSON.stringify([b.Id]) + '&type=0'"
               :style='{ backgroundImage:"url(" + b.Img + ")"}'
             >
             <div class="tops">
               <span class="catName">{{b.Name}}</span>
               <span class="learnMore"><b>{{$t('Message.LearnMore')}}</b></span>
             </div>
             </router-link>
           </li>
         </ul>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import { swiper, swiperSlide } from 'vue-awesome-swiper/src';
@Component({
  components: {
    HkHotProduct: () => import('@/components/hkTasteBusiness/pc/home/HkHotProduct.vue'),
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
        width: 48%;
        float: left;
        margin-right: 4%;
        display: flex;
        flex-wrap: wrap;
        &:last-child{
          margin-right: 0px!important;
        }
        a{
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          position: relative;
          height: 600px;
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
              font-size: 38px;
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
                width: 200px;
                height: 50px;
                line-height: 50px;
                background: #ffffff;
                color: #333333;
                font-size: 20px;
                border-radius: 50px;
                text-align: center;
                margin-top: 1rem;
                font-weight: 500;
                &:hover{
                  background: @base_color;
                  color: #fff;
                }
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
   font-size: 26px;
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
    display: flex;
    flex-wrap: wrap;
    position: absolute;
    bottom: 10%;
    left: 5%;
    align-items: center;
    justify-content: center;
    .T1{
      font-size: 60px;
      font-weight: 700;
      color: #fff;
      font-family: 'ArialBlack';
      display: flex;
      align-items: center;
      text-align: center;
      flex-wrap: wrap;
      justify-content: flex-start;
      width: 100%;
    }
    .T2{
      font-size: 24px;
      color: #fff;
      display: flex;
      align-items: center;
      text-align: center;
      flex-wrap: wrap;
      justify-content: flex-start;
      width: 100%;
    }
    .TouriBtn{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-start;
      a{
        width: 200px;
        height: 50px;
        line-height: 50px;
        background: #ffffff;
        color: #333333;
        font-size: 20px;
        border-radius: 30px;
        text-align: center;
        margin-top: 1rem;
        &:hover{
          background: @base_color;
          color: #fff;
        }
      }
    }
  }
}
</style>
