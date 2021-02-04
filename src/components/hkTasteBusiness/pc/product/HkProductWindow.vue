<template>
  <div class="PcVersion">
    <div class="productMain" v-if="item">
      <div class="in_pdWindow_page_item" :style="styla" @mouseenter="Enter=true" @mouseleave="Enter=false">
        <div class="topWindowsImg imgbox">
          <img :src="(item.Image?item.Image:item.Img_L)" :class="{'height_line':Enter}" :style="imgStyla" :data-key="item.Sku"
            @error="loadError" v-on:click="ToUrl(item)" />
          <div class="shopMark">
            <div class="innerBox">
              <a href="javascript:;" v-on:click="addCart(item)">{{$t('product.addToCart')}}</a>
            </div>
          </div>
        </div>
        <div class="in_pdWindow_item_description">
          <a href="javascript:;" class="in_pdWindow_item_title" v-on:click="ToUrl(item)">{{item.Name}}</a>
          <div class="in_pdWindow_item_price">
            <inPrices :primePrices="item.ListPrice" :currentPrices="item.SalePrice" :currency="item.Currency" size="small"></inPrices>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import YouWouldLike from '@/model/youWouldLike';
  import {
    Vue,
    Prop,
    Component
  } from 'vue-property-decorator';
  @Component({
    components: {
      inButton: () => import(/* webpackChunkName: "product" */ '@/components/base/pc/InsButton.vue'),
      inPrices: () => import(/* webpackChunkName: "product" */ '@/components/base/pc/InsPrices.vue')
    }
  })
  export default class InsProductWindow extends Vue {
    private Enter: boolean = false;
    private newArray = [];
    @Prop() private item!: YouWouldLike;
    @Prop() private imgStyla!: string;
    @Prop() private styla!: string;
    buttonSubmit(item) {
      this.$router.push({
        path: '/product/detail',
        name: 'ProductsDetail',
        params: {
          id: item.Sku
        }
      });
    }
    addToFavorite(p) {
      if (p.IsFavorite) {
        this.$Api.member.removeFavorite(p.Sku).then((result) => {
          p.IsFavorite = false;
          this.$message({
            message: this.$t('MyFavorite.RemoveSuccess') as string
          });
        });
      } else {
        this.$Api.member.addFavorite(p.Sku).then((result) => {
          if (result.Succeeded) {
            p.IsFavorite = true;
            this.$message({
              message: this.$t('MyFavorite.AddSuccess') as string,
              type: 'success',
              customClass: 'messageboxNoraml'
            });
          } else {
            this.$router.push('/Account/login');
          }
        });
      }
    }
    addCart(val) {
      console.log(val.Sku);
      this.$Api.product.GetProduct(val.Sku).then((result) => {
        var a = result.PanelDetail.AttrList[0].length;
        var b = result.PanelDetail.AttrList[1].length;
        var c = result.PanelDetail.AttrList[2].length;
        var d = result.PanelDetail.AttrList[3].length;
        var e = result.PanelDetail.AttrList[4].length;
        var f = result.PanelDetail.AttrList[5].length;
        if (a || b || c || d || e || f) {
          this.$router.push('/product/detail/' + result.PanelDetail.Sku);
        } else {
          this.$Api.shoppingCart.addItem(val.Sku, 1, '1', '1', '1')
            .then(
              (result) => {
                this.$message({
                  message: result.Message.Message as string,
                  type: 'success',
                  customClass: 'messageboxNoraml'
                });
              }).then(() => {
              this.$store.dispatch('setShopCart', this.$Api.shoppingCart.getShoppingCart());
            }).catch();
        }
      });
    }
    ToUrl(val) {
      this.$router.push('/product/detail/' + val.Sku);
    }
    loadError(e) {
      e.target.src = '/static/Image/proddef.jpg';
    }
  }
</script>
<style lang="less">
  .messageboxNoraml {
    z-index: 1000000000 !important;
  }
</style>
<style lang="less">
  .PcVersion .in_pdWindow_item_price .primePricesMain {
    margin-right: 10px;
  }

  .PcVersion .in_pdWindow_item_price .currentPricesMain,
  .in_pdWindow_item_price .primePricesMain {
    display: inline-block;
    text-align: center;
  }

  .PcVersion .in_pdWindow_item_price .currentPricesMain .small:nth-child(1) {
    font-size: 18px;
    word-break: break-word;
    text-align: center;
    color: #e01010;
    display: inline-block;
  }

  .PcVersion .in_pdWindow_item_price .currentPricesMain .small:nth-child(2) {
    font-size: 18px;
    color: #e01010;
    display: inline-block;
  }

  .PcVersion .in_pdWindow_item_price .primePricesMain .small:nth-child(1) {
    font-size: 16px;
    word-break: break-word;
    text-align: center;
    color: #cccccc;
    display: inline-block;
    text-decoration: line-through;
  }

  .PcVersion .in_pdWindow_item_price .primePricesMain .small:nth-child(2) {
    font-size: 16px;
    color: #cccccc;
    display: inline-block;
    text-decoration: line-through;
  }

  .productMain:hover .in_pdWindow_page_item img {
    border: 1px solid #e83428;
  }

  .productMain:hover .in_pdWindow_item_title {
    color: #e83428 !important;
    font-weight: 20px;
  }
</style>
<style lang="less" scoped>
  .imgbox {
    position: relative;
    display: block;
    width: 100%;
    overflow: hidden;
  }

  .imgbox:hover .shopMark {
    bottom: 0px;
  }

  .imgbox .shopMark {
    position: absolute;
    left: 0px;
    bottom: -45px;
    right: 0px;
    height: 45px;
    background: #e83428;
    transition: all .3s;
    display: flex;
    align-items: center;
    justify-content: center;

    .innerBox {
      width: 100%;
      display: inline-block;
    }
  }

  .imgbox .shopMark a {
    text-align: center;
    display: block;
    color: #fff;
  }

  .imgbox .shopMark a:hover span {
    text-decoration: underline;
  }

  .imgbox img {
    width: 100%;
    border-radius: 0px;
    border: 1px solid #eee;
    transition: border all 1s;
    box-sizing: border-box;
  }

  .in_pdWindow_page_item img {
    box-sizing: border-box;
    cursor: pointer;
    border: 1px solid #cdcdcd;
    border-radius: 0px;
  }

  .height_line {
    border: 1px solid #e83428 !important;
  }

  .in_pdWindow_item_title {
    font-size: 18px;
    width: 100%;
    margin: 0 auto;
    color: #333333;
    display: inline-block;
    text-align: left;
    line-height: 25px;
    height: 50px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-word;
    margin-top: 1rem;
  }

  .in_pdWindow_item_code {
    margin-top: 1rem;
    color: #999999;
    text-align: center;
  }
</style>
