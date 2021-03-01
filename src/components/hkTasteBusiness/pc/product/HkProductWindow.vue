<template>
  <div class="PcVersion">
    <div class="productMain" v-if="item">
      <div class="in_pdWindow_page_item" :style="styla" @mouseenter="Enter=true" @mouseleave="Enter=false">
            <div class="topWindowsImg imgbox">
              <img :src="(item.Image?item.Image:item.Img_L)"  :style="imgStyla" :data-key="item.Sku"
                @error="loadError" v-on:click="ToUrl(item)" />
              <div class="shopMark">
                <div class="innerBox">
                    <a  href="javascript:;"><i class="indexfav" v-bind:class="{'indexfav_hover':item.IsFavorite}"  v-on:click="addToFavorite(item)"></i><span v-on:click="addToFavorite(item)">{{$t('MyFavorite.MyFavorite')}}</span></a>
                    <a  href="javascript:;" ><i class="showDetail" v-on:click="ToUrl(item)"></i><span v-on:click="ToUrl(item)">{{$t('home.ViewDetail')}}</span></a>
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
    text-align: left;
    width: 100%;
  }

  .PcVersion .in_pdWindow_item_price .currentPricesMain .small:nth-child(1) {
    font-size: 18px;
    word-break: break-word;
    text-align: center;
    color: @base_color;
    display: inline-block;
  }

  .PcVersion .in_pdWindow_item_price .currentPricesMain .small:nth-child(2) {
    font-size: 18px;
    color: @base_color;
    display: inline-block;
  }

  .PcVersion .in_pdWindow_item_price .primePricesMain .small:nth-child(1) {
    font-size: 16px;
    word-break: break-word;
    text-align: center;
    color: #b2b2b2;
    display: inline-block;
    text-decoration: line-through;
  }

  .PcVersion .in_pdWindow_item_price .primePricesMain .small:nth-child(2) {
    font-size: 16px;
    color: #b2b2b2;
    display: inline-block;
    text-decoration: line-through;
  }

  .productMain:hover .in_pdWindow_item_title {
    color: @base_color !important;
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
  .imgbox .shopMark .indexfav{
    background: url(/images/pc/unfav.png) no-repeat center center;
    background-size: 100%;
}
.imgbox .shopMark .indexfav_hover{
    background: url(/images/pc/faved.png) no-repeat center center!important;
    background-size: 100%;
}
.imgbox .shopMark .showDetail{
    background: url(/images/pc/view.png) no-repeat center center;
    background-size: 100%;
}
.imgbox .shopMark .showDetail:hover{
    background: url(/images/pc/view_hover.png) no-repeat center center;
    background-size: 100%;
 }
  .imgbox .shopMark {
    position: absolute;
    left: 0px;
    bottom: -100%;
    right: 0px;
    height: 100%;
    background: rgba(143, 149, 161, .8);
    transition: all .3s;
    display: flex;
    align-items: center;
    justify-content: center;
    .innerBox {
      width: 100%;
      display: inline-block;
    }
  }

.imgbox .shopMark a{
    text-align: center;
    display: block;
}
.imgbox .shopMark a:hover span{
    text-decoration: underline;
}
.imgbox .shopMark a:nth-child(1){
    // padding-top: 60px;
    padding-bottom: 20px;
}
.imgbox .shopMark a span{
    color: #FFF;
    font-size: 16px;
    margin-top: 5px;
    display: block;
}
.imgbox .shopMark i{
    width: 24px;
    height: 24px;
    display: block;
    margin: 0 auto;
}

  .imgbox img {
    width: 100%;
    border-radius: 0px;
    transition: border all 1s;
    box-sizing: border-box;
  }

  .in_pdWindow_page_item {
    border:1px solid #eee;
    min-height: 24rem;
    padding: 10px;
    transition: all .3s;
    z-index: 0;
  }
  .in_pdWindow_page_item:hover {
      border:1px solid #c2c7d1;
  }
  .in_pdWindow_page_item img {
    box-sizing: border-box;
    cursor: pointer;
    border-radius: 0px;
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
