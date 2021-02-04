<template>
  <div>
    <Header />
    <router-view></router-view>
    <ins-sidebar />
    <Footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component({
  components: {
    Header: () => import(/* webpackChunkName: "main" */ '@/components/business/pc/header/InsHeader.vue'),
    Footer: () => import(/* webpackChunkName: "main" */ '@/components/business/pc/footer/InsFooter.vue'),
    InsSidebar: () => import('@/components/business/pc/header/InsSidebar.vue')
  }
})
export default class pcIndex extends Vue {
  mounted () {
    $('.fb-close').on('click', function() {
      $('.fb-livechat').fadeOut();
    });
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.setAttribute('rel', 'preload');
    let local = this.$Storage.get('locale') || this.FrontE.defaultLang;
    let lang = {
      E: 'en_US',
      S: 'zh_CN',
      C: 'zh_HK'
    };
    s.src =
      'https://connect.facebook.net/' +
      lang[local] +
      '/sdk.js#xfbml=1&version=v3.0';
    document.body.appendChild(s);
  }
}
</script>

<style lang="less" scoped>
</style>
