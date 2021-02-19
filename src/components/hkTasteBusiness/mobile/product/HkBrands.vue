<template>
<div class="BrandsMain">
  <!-- 获取所在的产品目录 -->
  <div class="title" v-for="(v,index) in AllBrandsList[0]" :key="index">
    <p>{{v.Code}}</p>
     <a href="javascript:;" @click="getSelectedAttrs(v)"><img :src="v.Image"></a>
  </div>
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
@Component
export default class HkBrands extends Vue {
      // 获取全部非库存属性
  AllBrandsList:any[] = [];
  AllCodes:any[] = [];
    getAttrList () {
      var a = {};
      this.$Api.prodAttrApi.getAttrList({ type: 2 }).then((result) => {
        result.forEach((item) => {
          if (item.Id === 17) {
               item.AttrValues.forEach((v) => {
               this.AllCodes.push(v.Code);
               if (v.Code.indexOf('A') === -1) {
                   this.AllBrandsList.push(item.AttrValues);
                   console.log(this.AllBrandsList, 'item.AttrValuesitem.AttrValues');
               }
             });
          }
        });
      });
    }
  getSelectedAttrs (val) {
    this.$router.push('/product/search/-?attrs=' + JSON.stringify([{ Id: 17, Vals: [parseInt(val.Id)] }]) + '&type=0');
  }
  created() {
    this.getAttrList();
  }
}
</script>
<style scoped lang="less">
</style>
