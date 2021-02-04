import Vue from 'vue';
import VueI18n from 'vue-i18n';
// User defined lang
import E from './en-US';
import C from './zh-CN';
import S from './zh-CNS';
Vue.use(VueI18n);

const messages = {
  E: {
    ...E
  },
  C: {
    ...C
  },
  S: {
    ...S
  }
};

const i18n = new VueI18n({
  locale: localStorage.getItem('locale') || 'E', // 从localStorage中获取 默认英文
  messages
});
export default i18n;
