<template>
<div class="cateMain">
  <!-- 获取所在的产品目录 -->
  <div  class="detail-select-attribute" v-for="(cat,index) in cateTree" :key="'cat'+index">
    <div>
      <p v-if="cat.ParentId==0" class="cateName">{{cat.Name}}</p>
      <ul class="common-select">
        <li v-if="cat.ParentId!=0">{{cat.Name}}</li>
      </ul>
      <div class="clear"></div>
    </div>
  </div>
    <!-- 获取所在的产品非库存属性 -->
  <div  class="detail-select-attribute" v-for="(attr,index) in source" :key="'attr'+index">
    <div v-if="attr.length>0">
      <ul class="common-select">
        <li v-for="(one,index) in attr" :key="'sub'+index">{{one.Name}}</li>
      </ul>
      <div class="clear"></div>
    </div>
  </div>
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
@Component
export default class PkProductDetailCate extends Vue {
  @Prop() private readonly source!: string[];
  @Prop() private readonly cateTree!: string[];
}
</script>
<style scoped lang="less">
ul,li{
  list-style: none;
}
.cateMain{
    width: 100%;
    margin-top: 30px;
}
.cateName{
  color: #838a97;
  font-weight: 700;
  font-size: 16px;
}
.clear{
  clear: both;
}
.detail-select-attribute{
  width:100%;
  display: block;
  margin-bottom: 20px;
}
.detail-select-attribute .detail-select-title{
    width: 20%;
    margin-right: 5%;
    word-break: break-all;
    float: left;
    font-size: 1.2rem;
    text-align: right;
}
.detail-select-attribute .common-select{
  width:75%;
  word-break: break-word;
  float: left;
}
.detail-select-attribute .common-select li{
    display: inline-block;
    background-color: #838a97;
    color: #fff;
    font-size: 16px;
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 3px;
    min-width: 100px;
    text-align: center;
}
</style>
