<template>
  <div class="productshare_icon_warpper">
    <a  onclick="window.open('http://www.facebook.com/share.php?u=' + window.location.href+'&t=' + document.title);"><img src="/images/mobile/mobile_30.jpg"/></a>
    <a @click="whatsApp" class="xq-whatsapp" data-action="share/whatsapp/share"><img src="/images/mobile/mobile_31.jpg"/></a>
    <a onclick="window.open('https://lineit.line.me/share/ui?url='+window.location.href);"><img src="/images/mobile/mobile_32.jpg"/></a>
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
@Component
export default class HkProductShare extends Vue {
  whatsApp() {
    var u = location.href;
    var t = document.title;
    window.open(
      'https://api.whatsapp.com/send?text=' +
        encodeURIComponent(t) +
        encodeURIComponent('\n\n' + u),
      '_blank'
    );
  }
}
</script>
<style lang="less" scoped>
.productshare_icon_warpper {
  display: inline-block;
  vertical-align: middle;
}
.productshare_icon_warpper a {
  display: inline-block;
  margin-right: 0.5rem;
}
.productshare_icon_warpper img {
  width: 40px;
  cursor: pointer;
}
</style>
