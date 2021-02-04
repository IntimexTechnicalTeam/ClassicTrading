<template>
  <div class="page_warrper" :style="styla">
    <!-- <div class="container">
      <div class="item first" @click="first">First</div>
      <div class="item before" @click="before"></div>
      <div class="item">
        <input ref="value" v-model="current" type="number" min="1" :max="total" />
      </div>
      <div class="item after" @click="after"></div>
      <div class="item" @click="last">Last</div>
    </div> -->
    <span class="last" :class="{ 'noClick': Page === 1 }" @click="current--">{{$t('CheckOut.Last')}} </span>
    <select v-model="current" class="selectPage">
      <option v-for="(item,index) in T" :value ="index + 1" :key="index" >{{ $t('product.per') + ' ' + (index + 1) + ' ' + $t('product.page')}}</option>
    </select>
    <span class="pageing"> / {{$t('CheckOut.Total') + Math.ceil(this.total / this.pageNum) + $t('product.page')}} </span>
    <span class="next" :class="{ 'noClick': Page === T.length }" @click="current++">{{$t('CheckOut.Next')}} </span>
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
@Component
export default class InsPage extends Vue {
  @Prop() total!: number;
  @Prop() styla!: string;
  @Prop() pageNum!: number;
  private Page: number = 1;
  set current (num) {
    if (num < 1 || num > Math.ceil(this.total / this.pageNum)) {
      // Vue.prototype.$Confirm('页码范围在 1 到 ' + Math.ceil(this.total) + ' 之间', 'content some content');
      return;
    };
    this.Page = num;
    this.$emit('input', this.current);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    // let target = this.$refs.value as HTMLInputElement;
    // target.value = String(this.current);
  }
  get current () {
    return this.Page;
  }
  handleCurrentChange (currentPage) {
    this.current = currentPage;
  }
  get T () {
    return Array(Math.ceil(this.total / this.pageNum));
  }
  // first () {
  //   this.current = 1;
  // }
  // before () {
  //   this.current--;
  // }
  // after () {
  //   this.current++;
  // }
  // last () {
  //   this.current = Math.ceil(this.total);
  // }
}
</script>
<style scoped lang=less>
.page_warrper {
  margin: 50px auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
.container {
  display: flex;
  justify-content: center;
}
.item {
  height: 30px;
  line-height: 30px;
  width: 30px;
  border-top: 1px solid #666666;
  border-right: 1px solid #666666;
  border-bottom: 1px solid #666666;
  cursor: pointer;
  user-select: none;
}
.item input {
  height: 100%;
  width: 100%;
  background: none;
  outline: none;
  border: 0px solid #ccc;
  box-sizing: border-box;
  text-align: center;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
input[type="number"]{
    -moz-appearance: textfield;
}
.before {
  position: relative;
}
.before::after {
  content: " ";
  position: absolute;
  border-right: 7.5px solid #666666;
  border-left: 7.5px solid transparent;
  border-top: 7.5px solid transparent;
  border-bottom: 7.5px solid transparent;
  top: 50%;
  left: 50%;
  transform: translate(-75%, -50%);
}
.after {
  position: relative;
}
.after::after {
  content: " ";
  position: absolute;
  border-right: 7.5px solid transparent;
  border-left: 7.5px solid #666666;
  border-top: 7.5px solid transparent;
  border-bottom: 7.5px solid transparent;
  top: 50%;
  left: 50%;
  transform: translate(-25%, -50%);
}
.first {
  border-left: 1px solid #666666;
}
.last,.next{
  height: 3rem;
  line-height: 3rem;
  cursor: pointer;
  display: inline-block;
  border: 1px solid #e6e6e6;
  border-radius: .2rem;
  padding-left: 1.2rem;
  padding-right: 1.2rem;
  margin-right: .5rem;
  font-size: 1.1rem;
}
.noClick{
  color:#666666;
  background: white;
  cursor: not-allowed;
  border: 1px solid #e6e6e6;
  line-height: 3rem;
  display: inline-block;
}
.selectPage{
    border: 1px solid #e6e6e6;
    height: 3.2rem;
    padding: 0 0.5rem;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    background: #fff;
    color: #666;
    border-radius: 0.2rem;
    font-size: 1.1rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: url(/images/mobile/arrow-down-back.png) 90% 15px no-repeat;
    background-size: 10px;
    width: 80px;
}
.pageing{
  letter-spacing: 2px;
  margin-left: 5px;
  margin-right: 5px;
  color:#666;
  font-size: 1.1rem;
}
</style>
