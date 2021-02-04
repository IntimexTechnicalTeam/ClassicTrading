<template>
  <div class="in_radio_container" :style="styla" v-if="items.length>0">
    <div class="in_radio_label">{{items[0].Type.Name}}</div>
    <div class="in_radio_warpper">
      <input type="text" style="display:none;" v-model="Value" />
      <div class="in_radio_main" @click="choice">
          <span class="in_radio_item" :class="{ chosen:Current == index }" v-for="(content,index) in items" :key="index" :data-key="index">{{content.Name}}</span>
      </div>
      <!-- <div
        class="in_select_main"
        @click="DropdownShow=!DropdownShow"
        :class="{'choised':Value,'select_focus':DropdownShow}"
      >{{Value?Value:Placeholder}}</div>
      <transition name="fade">
        <div class="in_select_dropdown" v-show="DropdownShow" @mouseleave="leftDropdown">
          <ul class="in_select_dropdown_none" v-if="None">
            <li>暂无内容</li>
          </ul>
          <ul class="in_select_dropdown_content" @click="choice">
            <li v-for="(content,index) in items" :key="index" :data-key="index">{{content.Name}}</li>
          </ul>
        </div>
      </transition> -->
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import ProductAttr from '@/model/ProductAttr';
@Component
export default class InsRadio extends Vue {
  // data
  private Value: string = '';
  private RealValue: string = '';
  private AdditionalPrice: object = {};
  private Current: string = '0';
  // props
  @Prop() private readonly label!: string;
  @Prop() private readonly styla!: string;
  @Prop() private readonly items!: ProductAttr[];
  //   method
  choice (e: MouseEvent) {
    const target = e.target as HTMLElement;
    console.log(target.nodeName);
    if (target.nodeName !== 'SPAN') {
      return;
    }
    this.Value = this.items[target.dataset.key as string].Name;
    this.RealValue = this.items[target.dataset.key as string].Id;
    this.Current = target.dataset.key as string;
    this.AdditionalPrice = {
      TypeId: this.items[target.dataset.key as string].Type.TypeId,
      AdditionalPrice: this.items[target.dataset.key as string].AdditionalPrice
    };
    this.$emit('input', this.RealValue);
    this.$emit('changePrice', this.AdditionalPrice);
  }
  //   created
  created () {
    if (this.items.length > 0) {
      this.Value = this.items[0].Name;
      this.RealValue = this.items[0].Id;
      this.AdditionalPrice = {
        TypeId: this.items['0'].Type.TypeId,
        AdditionalPrice: this.items['0'].AdditionalPrice
      };
      this.$emit('changePrice', this.AdditionalPrice);
      this.$emit('input', this.RealValue);
    }
  }
  @Watch('items', { deep: true })
  onItemsChange () {
    if (this.items.length > 0) {
      this.Value = this.items[0].Name;
      this.RealValue = this.items[0].Id;
      this.AdditionalPrice = {
        TypeId: this.items['0'].Type.TypeId,
        AdditionalPrice: this.items['0'].AdditionalPrice
      };
      this.$emit('changePrice', this.AdditionalPrice);
      this.$emit('input', this.RealValue);
    }
  }
}
</script>
<style lang="less" scoped>
.in_radio_container{
    .in_radio_label{
      font-size: 16px;
      color: #333333;
      font-weight: 700;
    }
    .in_radio_warpper{
        .in_radio_main{
            display: flex;
            margin: 1rem 0;
            width: 100%;
            flex-wrap: wrap;
            .in_radio_item{
                display: block;
                font-size: 16px;
                line-height: 40px;
                margin: 0 1rem 0 0;
                padding: 0 0.5rem;
                min-width: 3rem;
                text-align: center;
                margin-bottom: 1rem;
                border: 1px solid #cccccc;
                background-color:#fff;
                border-radius: .2rem;
                color: #999999;
                cursor: pointer;
            }
            .chosen{
                border: 1px solid #e83428;
                background-color: white;
                color:#e83428;
            }
        }
    }
}
</style>
