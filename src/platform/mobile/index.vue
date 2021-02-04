<template>
  <div class="main_warpper">
    <ins-header />
    <router-view></router-view>
    <ins-footer />
    <ins-sidebar />
    <ins-slide-menu :direction="'right'">
      <ins-menu-layout />
    </ins-slide-menu>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import '../../rem';
import Cookie from 'js-cookie';
@Component({
  components: {
    InsHeader: () => import('@/components/business/mobile/header/InsHeader.vue'),
    InsFooter: () => import('@/components/business/mobile/footer/InsFooter.vue'),
    InsSlideMenu: () => import('@/components/business/mobile/header/InsSlideMenu.vue'),
    InsMenuLayout: () => import('@/components/hkTasteBusiness/mobile/header/InsMenuLayout.vue'),
    InsSidebar: () => import('@/components/business/pc/header/InsSidebar.vue')
  }
})
export default class mobileIndex extends Vue {
  created () {
    Vue.prototype.vw = window.innerWidth;
    this.changLange(this.$Storage.get('locale') || 'E');
  }
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
  private changLange (lang) {
    this.$Api.member.setUILanguage(lang).then((result) => {
      this.$i18n.locale = lang;
      this.$Storage.set('locale', lang);
      Cookie.set('uLanguage', lang);
    }).catch((error) => {
      console.log(error);
    });
  }
}
</script>
<style lang="less" scoped>
.main_warpper{
  background:#FFF;
}
</style>
