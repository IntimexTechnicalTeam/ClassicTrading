<template>
    <div class="in_pdWindow_page_item mobileVersion" :style="styla" @mouseenter="Enter=true" @mouseleave="Enter=false" @click="click" v-if="item">
        <div class="innerborder">
            <img :src="(item.Image?item.Image:item.Img_L?item.Img_L:item.Img)"  :class="{'height_line':Enter}" :style="imgStyla" :data-key="item.Sku" @error="loadError" />
            <div class="in_pdWindow_item_description">
                <router-link :to="'/product/detail/'+item.Sku" class="in_pdWindow_item_title" >{{item.Name}}</router-link >
                <!-- <div class="in_pdWindow_item_code">&nbsp;{{item.Code}}</div> -->
                <div class="in_pdWindow_item_price">
                  <inPrices :primePrices="item.ListPrice" :currentPrices="item.SalePrice" :currency="item.Currency"  :DefaultListPrice="item.DefaultListPrice" :DefaultSalePrice="item.DefaultSalePrice" :DefaultCurrency="item.DefaultCurrency" size="small"></inPrices>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import inButton from '@/components/base/mobile/InsButton.vue';
import inPrices from '@/components/base/mobile/InsPrices.vue';
import YouWouldLike from '@/model/youWouldLike';
import { Vue, Prop, Component } from 'vue-property-decorator';
@Component({ components: { inButton, inPrices } })
export default class InsProductWindow extends Vue {
    private Enter:boolean = false;
    @Prop() private item!:YouWouldLike;
    @Prop() private imgStyla!:string;
    @Prop() private styla!:string;
    buttonSubmit (item) {
      this.$router.push({
        path: '/product/detail',
        name: 'ProductsDetail',
        params: {
          id: item.Sku
        }
      });
    }
    click (e) {
      let target = e.target as HTMLElement;
      if (target.nodeName === 'IMG') { this.$router.push('/product/detail/' + target.dataset.key); };
    }
    loadError (e) {
      e.target.src = '/static/Image/proddef.jpg';
    }
}
</script>
<style lang="less">
.mobileVersion {
    .in_pdWindow_item_price .currentPricesMain ,.in_pdWindow_item_price .primePricesMain{
      width: 90%;
      display: block;
      margin: 0 auto;
      text-align: left;
    }
    .in_pdWindow_item_price .currentPricesMain  .small:nth-child(1) {
      font-size: 1.4rem;
      word-break: break-all;
      text-align: center;
      color:red;
      display: inline-block;
    }
    .in_pdWindow_item_price .currentPricesMain .small:nth-child(2) {
        font-size: 1.4rem;
        color:red;
        display: inline-block;
    }
    .in_pdWindow_item_price .primePricesMain  .small:nth-child(1) {
      font-size: 1.2rem;
      word-break: break-all;
      text-align: center;
      color: #cccccc;
      display: inline-block;
      text-decoration: line-through;
    }
    .in_pdWindow_item_price .primePricesMain .small:nth-child(2) {
        font-size: 1.2rem;
        color: #cccccc;
      display: inline-block;
    }
}
</style>
<style lang="less" scoped>
.in_pdWindow_page_item {
  .innerborder{
    border:1px solid #eee;
    min-height: 26rem;
    width: calc(100% - 4px)!important;
  }
}
.in_pdWindow_page_item img {
  box-sizing: border-box;
  cursor: pointer;
  width: 100%;
}
.height_line {
  border: 1px solid #666 !important;
}
.in_pdWindow_item_title {
    font-size: 1.4rem;
    width: 90%;
    margin: 0 auto;
    text-align: left;
    color: #666;
    line-height: 25px;
    height:50px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-word;
    margin-top: 1rem;
    margin-bottom: 1rem;
}
.in_pdWindow_item_code {
  margin-top: 1rem;
  color: #999999;
  text-align: center;
}
</style>
