<template>
  <div class="home" v-cloak>
    <HomeBanner :initOptions="swiperOption" :page="'Home'" :initSwiper="true" class="banner" />
    <HkPromotion />
    <HkLiveBox />
    <cmx-pop-up v-show="showPopUP" @agree="agree"></cmx-pop-up>
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
    HkLiveBox: () => import('@/components/hkTasteBusiness/mobile/home/HkLiveBox.vue'),
    CmxPopUp: () => import('@/components/hkTasteBusiness/mobile/home/CmxPopUp.vue')
  }
})
export default class InsHome extends Vue {
  showPopUP:boolean=false;
  swiperOption: object = {
    autoplay: {
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    }
  };
  agree () {
    this.showPopUP = false;
    window.localStorage.setItem('storge', 'true');
    document.body.style.overflowY = 'auto';
  }
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
  mounted () {
    this.$HiddenLayer();
    if (!window.localStorage.getItem('storge')) {
      let _this = this;
      _this.$nextTick(() => {
        _this.showPopUP = true;
      });
      setTimeout(() => {
        if (_this.showPopUP) {
          document.body.style.height = '100vh';
          document.body.style.overflowY = 'hidden';
        }
      }, 2000);
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
