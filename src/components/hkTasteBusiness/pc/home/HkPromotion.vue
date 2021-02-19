<template>
  <div class="PromotionMain">
    <div class="hotProductMain">
      <HkHotProduct :postionNum="1" :swiperClass="'ProductA'"/>
    </div>
    <div class="hotProductMain">
      <HkHotProduct :postionNum="2" :swiperClass="'ProductB'"/>
    </div>
    <div class="hotProductMain">
      <HkHotProduct :postionNum="3" :swiperClass="'ProductC'"/>
    </div>
     <div class="hotProductMain">
      <HkHotProduct :postionNum="4" :swiperClass="'ProductD'"/>
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
  created() {

  }
}
</script>
<style lang="less" scoped>
.hotProductMain {
  width: 1200px;
  margin: 0 auto;
  padding-top: 80px;
}
</style>
