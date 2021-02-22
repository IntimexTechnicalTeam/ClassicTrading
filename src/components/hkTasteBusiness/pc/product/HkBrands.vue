<template>
<div class="BrandsMain">
  <!-- 获取所在的产品目录 -->
<div class="DetailTitle"><img :src="ImgList" v-show="ImgList!==null"><div class="TitleBg"><div class="innerBoxText"><img src="/images/mobile/mobile_37.png">
      <span class="borderName" :class="{'TextCn':currentlang=='C'}">{{$t('Message.AllBrands')}}</span></div></div></div>
  <div class="innerBox">
    <ul>
      <li v-for="(v,index) in AllBrandsList[0]" :key="index"><a href="javascript:;" @click="getSelectedAttrs(v)"><img :src="v.Image"></a></li>
    </ul>
  </div>
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
@Component
export default class HkBrands extends Vue {
  ImgList:string='/images/pc/About-Us_02.jpg';
      // 获取全部非库存属性
  AllBrandsList:any[] = [];
    getAttrList () {
      this.$Api.prodAttrApi.getAttrList({ type: 2 }).then((result) => {
        result.forEach((item) => {
          if (item.Id === 17) {
             this.AllBrandsList.push(item.AttrValues);
             console.log(this.AllBrandsList, 'this.AllBrandsList');
          }
        });
      });
    }
  get currentlang () {
    return this.$Storage.get('locale');
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
.DetailTitle{
  width: 100%;
  display: flex;
  flex-wrap:wrap;
  position: relative;
  align-items: center;
  justify-content: flex-start;
  img{
    width: 100%;
  }
  .TitleBg{
    width: 100%;
    position: absolute;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .innerBoxText{
      color: #fff;
      font-family: 'Arial';
      text-transform: uppercase;
      text-align: center;
      margin: 0 auto;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      .borderName{
        position: absolute;
        bottom: 40%;
        display: block;
        font-size: 30px;
        white-space: nowrap;
        letter-spacing: 2px;
      }
      img{
        width: 100%;
      }
    }
  }
}
.innerBox {
  width: 1200px;
  margin: 0 auto;
  ul{
    width: 100%;
    display: inline-block;
    padding-top: 50px;
    padding-bottom: 50px;
    li{
      width: 22%;
      float: left;
      margin-right: 4%;
      margin-bottom: 4%;
      &:nth-child(4n) {
        margin-right: 0px!important;
      }
      a{
        display: block;
        border: 1px solid #eee;
        transition: all .3s;
        &:hover {
          border:1px solid @base_color;
        }
        img{
          width: 100%;
        }
      }
    }
  }
}
</style>
