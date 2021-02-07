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
  created() {
    console.log(this.cateTree, 'cateTreecateTree');
  }
}
</script>
<style scoped lang="less">
ul,li{
  list-style: none;
}
.cateName{
  font-size: 16px;
  color: #666666;
  margin-bottom: 1rem;
}
.cateMain{
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
}
.clear{
  clear: both;
}
.detail-select-attribute{
  width:100%;
  display: block;
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
  word-break: break-all;
  float: left;
}
.detail-select-attribute .common-select li{
    display: inline-block;
    background-color:#838a97;
    color: #fff;
    border:1px solid #838a97;
    margin-right: 0.5rem;
    font-size: 1.2rem;
    margin-bottom: 1rem;
    padding-top: .8rem;
    padding-bottom:.8rem;
    padding-left: 2rem;
    padding-right: 2rem;
    border-radius: 3px;
}
</style>
