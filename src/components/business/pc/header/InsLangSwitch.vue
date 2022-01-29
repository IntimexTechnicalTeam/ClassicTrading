<template>
    <div class="langSwitch">
        <!-- <p @click="changeLang('S')" :class="{'active': $Storage.get('locale') === 'S'}">简</p> |
        <p @click="changeLang('C')" :class="{'active': $Storage.get('locale') === 'C'}">繁</p> |
        <p @click="changeLang('E')" :class="{'active': $Storage.get('locale') === 'E'}">Eng</p> -->

      <!-- <p @click="changeLang(lang.value)" v-for="(lang,index) in FrontE.langList" :key="index" :class="{'active': $Storage.get('locale') === lang.value}">{{lang.name}}</p> -->
      <select  v-model="currentlang">
        <option :value="lang.value" v-for="(lang,index) in FrontE.langList" :key="index">{{lang.name}}</option>
      </select>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Cookie from 'js-cookie';
@Component
export default class InsLangSwitch extends Vue {
  get currentlang () {
    return this.$i18n.locale;
  }
  set currentlang (val) {
    this.changeLang(val);
  }
  changeLang (lang) {
    this.$Api.member.setUILanguage(lang).then((result) => {
      this.$i18n.locale = lang;
      localStorage.setItem('locale', lang);
      Cookie.set('uLanguage', lang);
      this.Reload();
    }).catch((error) => {
      console.log(error);
    });
 }
}
</script>
<style scoped lang="less">
.langSwitch {
    p {
      display: inline-block;
      padding: 0 10px;
      cursor: pointer;
      position: relative;

      &:not(:last-child) {
        &::after {
          position: absolute;
          content: '';
          top: 1px;
          right: 0;
          height: 100%;
          width: 2px;
          display: block;
          background-color: #fff;
        }
      }

      &:last-child {
        padding-right: 0;
      }
    }
    select{
    width: 60px;
    font-size: 16px;
    border: none;
    display: inline-block;
    vertical-align: middle;
    height: 30px;
    color:#3d475f;
    background:  url(/images/pc/downicon_blue.png) 95% 10px no-repeat;
    background-size: 12px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: 0;
    padding-left: 10px;
    cursor: pointer;
      option{
        color:#666666;
        outline: none;
      }
    }
}
</style>
