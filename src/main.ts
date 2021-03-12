import Vue from 'vue';
import App from './App.vue';
import router from './router';
// import Router from 'vue-router';
import store from './store';
import { setRem } from './rem';
import MetaInfo from 'vue-meta-info';
// import { ValidationProvider } from 'vee-validate';
// 引入指令文件
import * as directives from '@/directives/index';
import elLoading from 'element-ui/packages/loading/src/directive';
import 'animate.css';
// require styles
import 'swiper/dist/css/swiper.css';
// 引入css
import 'element-ui/lib/theme-chalk/index.css';

import 'wowjs/css/libs/animate.css';

// 引进Axios
import axios from 'axios';
import vueAxios from 'vue-axios';
// // 引入多语言
// import VueI18n from 'vue-i18n';
import i18n from '@/lang';

import Auth from './sdk/common/Auth';
import Cookie from 'js-cookie';
import ElementUI from 'element-ui';
Vue.use(ElementUI);
(() => {
  if (
    navigator.userAgent.indexOf('iPhone') !== -1 ||
    navigator.userAgent.indexOf('Android ') !== -1
  ) {
    Vue.prototype.userAgent = 'mobile';
    return import('@/assets/css/main_m.css');
  } else {
    Vue.prototype.userAgent = 'pc';
    return import('@/assets/css/main.css');
  }
})();
// const originalPush = Router.prototype.push;
// Router.prototype.push = function push (location) {
//   return (originalPush.call(this, location) as any).catch(err => { console.log(err); });
// };
Vue.use(elLoading);
Vue.use(MetaInfo);
//  批量注册全局指令
Object.keys(directives).forEach(k => Vue.directive(k, directives[k]));
// ValidationProvider
// Vue.component('ValidationProvider', ValidationProvider);
// modified file 'node_module/_vue@2.6.10@vue/types/plugin.d.ts'
Vue.use(vueAxios, axios, i18n);
Vue.config.productionTip = false;

// 价格格式化
Vue.filter('PriceFormat', function (value) {
  if (typeof (value) === 'number') {
    return (value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // 保留两位小数
    // return (value || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); // 不保留小数
  }
});

Auth.GetToken().then(() => {
  import('./init').then(async (result) => {
    Vue.use(result.default as any);
    let lang = Vue.prototype.$Storage.get('locale') || Vue.prototype.FrontE.defaultLang;
    await Vue.prototype.$Api.member.setUILanguage(lang).then((result) => {
      i18n.locale = lang;
      Cookie.set('uLanguage', lang);
      Vue.prototype.$Storage.set('locale', lang);
      Cookie.set('uLanguage', lang);
    }).catch((error) => {
      console.log(error);
    });
    return result;
  }).then(result => {
    Vue.prototype.root = new Vue({
      router,
      store,
      i18n,
      mounted () {
        if (Vue.prototype.userAgent === 'mobile') setRem();
      },
      render: h => h(App)
    }).$mount('#app');
  });
}, () => { });
