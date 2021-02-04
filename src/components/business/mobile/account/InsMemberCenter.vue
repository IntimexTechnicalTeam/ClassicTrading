<template>
  <div class="MembercenterMobile">
    <accountHeader />
    <div class="MemberInfoNav">
      <ul>
        <li @click="openlink('/account/memberInfo')" :class="activeClass == 1?'activeInfo':''" >
          <a>{{ $t("MemberInfo.MemberInfoTitle") }}</a>
        </li>
        <li  @click="openlink('/account/modifyPassword')" :class="activeClass == 2?'activeInfo':''" >
          <a>{{ $t("MemberInfo.ModifyPassword") }}</a>
        </li>
        <li :class="activeClass == 3?'activeInfo':''"  @click="openlink('/account/deliveryAddress')">
          <a>{{ $t("Account.DeliveryAddress") }}</a>
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { MemberResult } from '@/model/memberResult';
import sdk from '@/sdk/InstoreSdk';
import Cookie from 'js-cookie';
import lang from '@/lang';
import storage from '@/sdk/common/Storage';
@Component({
  components: {
    accountHeader: () => import('@/components/hkTasteBusiness/mobile/account/accountHeader.vue')
  }
})
export default class InsMenberCenter extends Vue {
    activeClass: any = 0;
    openlink(link) {
    this.$router.push({ path: link });
  }
  isActive() {
    var url = this.$route.path;
    var reg = RegExp(/memberInfo/);
    if (reg.test(url)) {
      this.activeClass = 1;
    } else if (url.indexOf('modifyPassword') !== -1) {
      this.activeClass = 2;
    } else if (url.indexOf('deliveryAddress') !== -1) {
      this.activeClass = 3;
    }
    console.log(this.activeClass);
  }
  updated() {
    this.isActive();
  }
  mounted() {
    this.isActive();
  }
}
</script>
<style lang="less" scoped>
#container {
  width: 100%;
  display: inline-block;
}
.MemberInfoMain {
  width: 1200px;
  margin: 0 auto;
  margin-top: 1rem;
  padding: 2.5%;
}
.MemberInfoMain .el-tabs__nav {
  height: 50px;
  line-height: 50px;
}
.MemberInfoMain .el-tabs__content {
  text-align: left;
}
.MemberInfoMain .el-input__icon {
  font-size: 16px;
}
.MemberInfoMain .el-form-item__content,
.MemberInfoMain .el-form-item__label-wrap {
  margin-left: 0px !important;
}
.MemberInfoMain .el-button {
  background: #333333;
  border: none;
  display: block;
  border-radius: 20px;
  width: 60%;
  float: left;
  margin-left: 25%;
}
.MembercenterMobile .MemberInfoNav{
    width: 100%;
    margin-top: 1rem;
    display: inline-block;
    background: #ffffff;
}
.MembercenterMobile .MemberInfoNav ul{
    width: 100%;
    display: flex;
    background: #f5f5f5;
}
.MembercenterMobile .MemberInfoNav li{
  float: left;
  list-style: none;
  width:calc(33.3% - 1px);
  &:last-child{
    border-right: 0px!important;
  }
}
.MembercenterMobile .MemberInfoNav li a{
    text-align: center;
    text-decoration: none;
    display: block;
    font-size: 1.6rem;
    padding: 1rem;
    word-break: break-word;
    color: #868f95;
    display: flex;
    flex-wrap: wrap;
    padding-top: .5rem;
    padding-bottom: .5rem;
}
.MembercenterMobile .activeInfo{
  background: #868f95!important;
}
.MembercenterMobile .activeInfo a{
  color:#fff!important;
}
</style>
