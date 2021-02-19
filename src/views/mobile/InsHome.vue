<template>
  <div class="home" v-cloak>
    <HomeBanner :initOptions="swiperOption" :page="'Home'" :initSwiper="true" class="banner" />
    <HkPromotion />
    <HkLiveBox />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import 'animate.css';
import WOW from 'wowjs';
@Component({
  components: {
    HomeBanner: () => import('@/components/base/mobile/InsBanner.vue'),
    HkPromotion: () => import('@/components/hkTasteBusiness/mobile/home/HkPromotion.vue'),
    HkLiveBox: () => import('@/components/hkTasteBusiness/mobile/home/HkLiveBox.vue')
  }
})
export default class InsHome extends Vue {
  swiperOption: object = {
    autoplay: {
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    }
  };
    get init () {
    return {
      HkPromotion: this.$store.state.HkPromotion,
      HkLiveBox: this.$store.state.HkLiveBox
    };
  }
  @Watch('init', { deep: true })
  onItemsChange (n, o) {
    if (n.HkPromotion && n.HkLiveBox) {
      this.$nextTick(() => {
        let wow = new WOW.WOW({
          boxClass: 'wow',
          animateClass: 'animated',
          offset: 100,
          live: false,
          callback: function (box) {
          }
        });
        wow.init();
      });
    }
  }
}
</script>

<style lang="less" scoped>
.banner {
  // min-height: 100vh;
  background-color: white;
}
</style>
