<template>
  <div id="container" class="ProductSearch">
        <div class="SearchSlide">
          <div class="leftSide">
            <advancedSearch @advancedChange="advancedChange" v-if="isAdvanced"  @closeSub="closeSub" @resetAll="resetAll" />
          </div>
        </div>
      <div class="selectBar">
          <ul>
            <li @click="showSearchSlide"><b><i class="filterIcon"></i>{{$t('product.Screening')}}</b></li>
            <li>
              <select v-model="PriceItem" @change="getselect(PriceItem)">
                <option value="desc">{{$t('product.PriceHL')}}</option>
                <option value="asc">{{$t('product.PriceLH')}}</option>
              </select>
            </li>
          </ul>
        </div>
    <!-- <advancedSearch :attrType="2"  @advancedChange="advancedChange" /> -->

    <div class="prolist-box">
      <div class="products_container" v-if="proList.length>0">
          <InsProductList v-for="item in proList" :key="item.productCode" :item="item" :needCode="false" class="product_item" ></InsProductList>
        </div>
        <div class="products_container" v-else>
             <h3 class="nocontentTips">{{$t('messageTips.NoContent')}}</h3>
        </div>
          <div ref="load" class="loading" @touchstart="loading" v-if="totalRecord>pageSize"><p>{{tips?$t('Action.LoadMore'):$t('home.Thatsall')}}</p></div>
          <div class="loading" v-else>{{$t('home.Thatsall')}}</div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import YouWouldLike from '@/model/youWouldLike';
import { Loading } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import $ from 'jquery';
@Component({
  components: {
    InsProductList: () => import('@/components/hkTasteBusiness/mobile/product/HkProductWindow.vue'),
    advancedSearch: () => import('@/components/hkTasteBusiness/mobile/product/InsAdvancedSearch.vue'),
    ProductListSwiper: () => import('@/components/hkTasteBusiness/mobile/product/HkProductListSwiper.vue')
  }
})
export default class InsProductSearch extends Vue {
  proList: YouWouldLike[] = []; // 产品数据
  currentPage: number = 1; // 当前页
  pageSize: number = 6; // 每页显示条目个数
  totalRecord: number = 0;// 总条目数
  private tips:boolean = true;
  private LoadingInstance!: any;

  attrs: object[] = []; // 选中的产品属性数组
  searchCatalogs: number[] = []; // 选中的产品目录数组
  searchType: number = 1; // 搜索类型（0 => 叠加，1 => 筛选）
  PriceItem:string='desc';
  isAdvanced: boolean = true;

  // 搜索关键词
  get searchKey () {
    let a = this.$store.state.searchKey;
    if (a === '-' || a === '') {
      return '';
    } else {
      return a;
    }
  }
  // 价格传值
  getselect (val) {
    this.PriceItem = val;
    this.productSearch();
  }
  // 产品高级搜索
  productSearch (flag: string = '') {
    this.tips = true;
    this.$Api.product.search({
      Key: this.searchKey,
      PageInfo: {
        Page: this.currentPage,
        PageSize: this.pageSize,
        SortName: 'SalePrice',
        SortOrder: this.PriceItem
      },
      CatIdS: this.searchCatalogs,
      Attrs: this.attrs,
      Type: this.searchType,
      Reflesh: 1
    }).then((result) => {
      if (flag === 'loadpage') {
        this.proList = this.proList.concat(result.YouWouldLike);
        this.totalRecord = result.TotalRecord;
      } else {
        this.proList = result.YouWouldLike;
        this.totalRecord = result.TotalRecord;
      }

      this.$HiddenLayer();
    });
  }

  advancedChange (Attrs, Catalogs) {
    this.attrs = Attrs;
    this.searchCatalogs = Catalogs;
    this.productSearch();
  }
  // 重置搜索
  resetAll () {
    window.location.href = '/product/search/-';
    this.closeSub();
  }
  // 关闭筛选弹窗
  closeSub () {
    $('.SearchSlide').fadeOut();
    $('.leftSide').removeClass('closeBar');
    document.body.style.overflow = 'auto';
  }
  // 打开筛选弹窗
  showSearchSlide () {
    $('.SearchSlide').fadeIn();
    $('.leftSide').addClass('closeBar');
    document.body.style.overflow = 'hidden';
  }
  loading (e) {
    if (this.tips) {
      this.LoadingInstance = Loading.service({
        target: this.$refs.load as any,
        fullscreen: false,
        // spinner: 'el-icon-loading',
        text: 'Loading...'
      });
      setTimeout(() => {
        this.load();
        this.LoadingInstance.close();
      }, 2000);
    }
  }
  load () {
    console.log(this.totalRecord, this.proList.length);
    if (this.totalRecord !== this.proList.length) { this.currentPage++; } else { this.tips = false; }
  }

  mounted () {

  }

  @Watch('searchKey', { deep: true })
  onSearchKeyChange () {
    this.productSearch();
  }

  @Watch('currentPage', { deep: true })
  onCurrentPage () {
    this.productSearch('loadpage');
  }
}
</script>

<style lang="less">
.ProductSearch {
  .el-loading-spinner .circular {
    display: none;
  }

  .el-loading-text {
    font-size: 1.3rem;
    color: #cccccc;
    font-family: 'Arial';
  }

  .el-loading-parent--relative {
    > p {
      display: none;
    }
  }
}
</style>

<style scoped lang="less">
.filterIcon{
  background: url('/images/mobile/filter.png') no-repeat center center;
  width: 1.5rem;
  height: 1.5rem;
  display: inline-block;
  background-size: contain;
  margin-right: .5rem;
}
.nocontentTips{
  width: 95%;
  margin: 0 auto;
  font-size: 1.4rem;
  font-weight: 500;
  text-align: left;
  display: block;
  padding: 1rem;
  color: #666;
}
.product_warpper{
  width: 100%;
  margin:0 auto;
}
.products_container{
  display: flex;
  flex-wrap: wrap;
  width: 95%;
  margin: 0 auto;
}

.product_item{
  width: 50% !important;
  padding: 1rem .5rem 0;
  box-sizing:border-box;
}

.loading{
    text-align: center;
    height: 3.5rem;
    line-height: 3.5rem;
    width: 50%;
    margin: 0 auto;
    color:#fff;
    background: #838a97;
    border-radius: 2px;
    text-transform: uppercase;
    margin-top: 3rem;
    margin-bottom: 3rem;
    p{
        font-size: 1.4rem;
    }
}

.ProductSearch {
  .InsAdvancedSearch {
    background: #fff;
    min-height: 100vh;
  }
}
.SearchSlide{
  width: 100%;
  position: fixed;
  left: 0;
  top: 0px;
  bottom: 0px;
  background: rgba(0,0,0,.6);
  overflow-x: scroll;
  z-index: 999999;
  display: none;
  .leftSide{
    width: 80%;
    left:-80%;
    min-height: 100%;
    position: absolute;
    transition: all .5s;
  }

}
.closeBar{
    left: 0%!important;
  }
.selectBar{
    width: 100%;
    margin: 0 auto;
    display: inline-block;
    margin-top: 2rem;
  ul{
    width: 92%;
    margin: 0 auto;
  }
  li{
    float: left;
    margin-right: 4%;
    width: 47%;
    background: #FFF;
    border:1px solid #838a97;
    font-size: 1.2rem;
    color: #838a97;
    height: 3.5rem;
    line-height: 3.5rem;
    list-style: none;
    border-radius: 3px;
    span{
    width: 20%;
    display: inline-block;
    font-size: 1.2rem;
    text-align: center;
    }
    b{
      width: 60%;
      display: flex;
      text-align: center;
      font-size: 1.2rem;
      font-weight: 500;
      margin: 0 auto;
      align-items: center;
    }
    select{
    width: 100%;
    border: none;
    padding-left: .5rem;
    height: 3.5rem;
    line-height: 3.5rem;
    font-size: 1.2rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: url(/images/mobile/mobile_38.png) 98% 12px no-repeat;
    background-size: 15px;
    outline: none;
    color:#838a97;
    }
    &:last-child{
      margin-right: 0px!important;
      background: #FFF!important;
      color:#838a97;
      border:1px solid #838a97!important;
    }
  }
}
</style>
