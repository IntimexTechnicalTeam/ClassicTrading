<template>
<div id="header" class="pcHeader"  v-cloak>
<!-- 正常菜单 -->
<div class="headerBg" :class="{'pageother':showHomePage!=='/'}">
    <div class="headerTop">
        <div class="logoBox">
            <a href="/"><img src="/images/pc/pclogo.png"></a>
        </div>
        <div class="inner">
            <!-- 搜索框开始 -->
            <div class="functionBox">
                  <div class="searchBox">
                      <input type="text" v-model="key" :placeholder = "$t('Message.KeyWords')"/>
                       <span class="search_btn"  @click="searchFun(key)"><img src="/images/pc/pc_05.jpg"></span>
                  </div>
                  <InsLogin class="memberLogin"></InsLogin>
                    <!-- 我的喜爱开始 -->
                    <div class="cartTop">
                        <router-link to="/account/MyFavorite">
                            <i class="handle-icon fav-icon"></i>
                        </router-link>
                    </div>
                    <!-- 我的喜爱结束 -->
                    <!-- 购物车开始 -->
                    <Shopcart class="memberLogin"></Shopcart>
            </div>
            <CodeSelect/>
            <div class="langBox">
               <LangSwitch />
            </div>
            <!-- 切换语言结束 -->
        </div>
    </div>
    <div class="HeaderNormalBar">
          <!-- 导航栏开始 -->
          <div class="headerBoxMain">
              <div class="headerBottom">
                  <div class="navMainbar">
                      <ul>
                        <li v-for="(item,index) in this.$store.state.headerMenus" :key="index">
                          <a href="javascript:;" class="topa"  v-if="item.Type === 0" @click="toUrl(item)"><span>{{item.Name}}</span></a>
                            <router-link :to="{path: To(item)}" class="topa" v-else><span>{{item.Name}}</span></router-link>
                            <ul v-if="item.Childs && item.Childs.length">
                              <div class="innerMain">
                                  <li v-for="(child,index2) in item.Childs" :key="index2">
                                      <router-link :to="{path: To(child)}" class="topb"><span>{{child.Name}}</span></router-link>
                                </li>
                              </div>
                            </ul>
                        </li>
                      </ul>
                  </div>
        </div>
      </div>
          <!-- 导航栏结束 -->
    </div>
</div>
<!-- 正常菜单结束 -->

<!-- 固定菜单 -->
<div class="header-Fixed">
    <div class="headerTop">
        <div class="logoBox">
            <a href="/"><img src="/images/pc/pclogo.png"></a>
        </div>
        <div class="inner">
            <!-- 搜索框开始 -->
            <div class="functionBox">
                  <div class="searchBox">
                      <input type="text" v-model="key" :placeholder = "$t('Message.KeyWords')"/>
                       <span class="search_btn"  @click="searchFun(key)"><img src="/images/pc/pc_05.jpg"></span>
                  </div>
                  <InsLogin class="memberLogin"></InsLogin>
                    <!-- 我的喜爱开始 -->
                    <div class="cartTop">
                        <router-link to="/account/MyFavorite">
                            <i class="handle-icon fav-icon"></i>
                        </router-link>
                    </div>
                    <!-- 我的喜爱结束 -->
                    <!-- 购物车开始 -->
                    <Shopcart class="memberLogin"></Shopcart>
            </div>
            <CodeSelect/>
            <div class="langBox">
               <LangSwitch />
            </div>
            <!-- 切换语言结束 -->
        </div>
    </div>
    <div class="HeaderNormalBar">
          <!-- 导航栏开始 -->
          <div class="headerBoxMain">
              <div class="headerBottom">
                  <div class="navMainbar">
                      <ul>
                        <li v-for="(item,index) in this.$store.state.headerMenus" :key="index">
                          <a href="javascript:;" class="topa"  v-if="item.Type === 0" @click="toUrl(item)"><span>{{item.Name}}</span></a>
                            <router-link :to="{path: To(item)}" class="topa" v-else><span>{{item.Name}}</span></router-link>
                            <ul v-if="item.Childs && item.Childs.length">
                              <div class="innerMain">
                                  <li v-for="(child,index2) in item.Childs" :key="index2">
                                      <router-link :to="{path: To(child)}" class="topb"><span>{{child.Name}}</span></router-link>
                                </li>
                              </div>
                            </ul>
                        </li>
                      </ul>
                  </div>
        </div>
      </div>
          <!-- 导航栏结束 -->
    </div>
</div>
<!-- 固定菜单结束 -->
<div class="clear"></div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import api from '@/sdk/api/Api.ts';
import Menu from '@/components/business/pc/header/InsMenu.vue';
import $ from 'jquery';
@Component({
  components: {
    Menu,
    Shopcart: () =>
      import('@/components/business/pc/header/InsShoppingCart.vue'),
    InsLogin: () =>
      import('@/components/business/pc/header/InsLogin.vue'),
    CodeSelect: () =>
      import('@/components/business/pc/header/InsCodeSelect.vue'),
     LangSwitch: () => import('@/components/business/pc/header/InsLangSwitch.vue'),
    elMenu: () => import('@/components/business/pc/header/InsElMenu.vue')
  }
})
export default class InsHeader extends Vue {
  @Prop() private msg!: string;
  showMeunBar:boolean=true;
  private search: boolean = false;
  private key: string = '';
  private showMenberCentral:boolean = false;
  private count:number = 0;
  private isshow:boolean=false;
  private activeIndex:string= '';
  private NewItem=[];
  private si!:any;
  private complete:boolean = false;
  private fixedBar:boolean = false;
  private logoHide:boolean = true;
  // private hhh: any = this.$t('test');
  goLink (val) {
    // window.location.href = val;
    window.open(val);
  }
  gotoLink (val) {
    window.location.href = val;
  }
  showSearchBox () {
   $('.search-box').slideToggle();
  }
  sis (index) {
    if (this.complete) return () => {};
    this.complete = true;
    return (cindex) => {
      this.NewItem = this.header[index].Childs[cindex];
    };
  }
  getMenu () {
    this.$Api.promotion
      .getMenu()
      .then(result => {
        this.$store.dispatch('setHeaderMenus', result.ReturnValue.HeaderMenus);
        this.$store.dispatch('setFooterMenus', result.ReturnValue.FooterMenus);
      })
      .catch(error => {
        console.log(error);
      });
  }
  toUrl (n) {
    if (!n.IsNewWin && n.Url) {
      window.location.href = n.Url;
    } else if (n.IsNewWin && n.Url) {
      window.open(n.Url);
    }
  }
  To (n) {
    return n.Type === 1 ? '/cms/catDetail/' + n.Value.Id : n.Type === 2 ? '/CMS/content/' + n.Value.Id : n.Type === 3 ? '/RegNPay/Form/' + n.Value.Id : n.Type === 4 && !this.$store.state.catMenuType ? '/product/cat/' + n.Value.Id : n.Type === 4 && this.$store.state.catMenuType ? '/product/search/-?catalogs=' + JSON.stringify([parseInt(n.Value.Id)]) + '&type=0' : n.Type === 5 ? '/product/search/-?attrs=' + JSON.stringify([{ Id: parseInt(n.Value.Id), Vals: [] }]) + '&type=0' : '/product/search/-?attrs=' + JSON.stringify([{ Id: parseInt(n.ParentId), Vals: [parseInt(n.Value.Id)] }]) + '&type=0';
  }
  ShowItems (value) {
    this.NewItem = value;
  }
  get showHomePage () {
    return this.$route.path;
  }
  menberCentral () {
    if (!this.$Storage.get('isLogin')) this.$router.push('/account/login');
    else this.showMenberCentral = !this.showMenberCentral;
  }
  get header () {
    return this.$store.state.headerMenus;
  }
  get ShopCart () {
    return this.$store.state.shopCart;
  }
  searchFun (key) {
    this.$store.dispatch('setSearchKey', key);
    if (key !== '') {
      this.$router.push({
        path: '/product/search',
        name: 'productSearch',
        params: {
          key: key
        }
      });
    } else {
      this.$router.push({
        path: '/product/search/-'
      });
    }
  }
  get currentlang () {
    return this.$i18n.locale;
  }
  set currentlang (val) {
    this.changLange(val);
  }
  navShow (index) {
    this.activeIndex = index;
    $(function () {
      $('body').css('overflow-y', 'hidden!important');
    });
  }
  navClose () {
    this.activeIndex = '';
    $(function () {
      $('body').css('overflow-y', 'auto!important');
    });
  }
  private changLange (lang) {
    this.$Api.member
      .setUILanguage(lang)
      .then(result => {
        this.$i18n.locale = lang;
        localStorage.setItem('locale', lang);
        this.Reload();
      })
      .catch(error => {
        console.log(error);
      });
  }
  created () {
    this.$store.dispatch('setShopCart', this.$Api.shoppingCart.getShoppingCart());
    addEventListener('scroll', () => {
      var _this = this;
      let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
      if (scrollTop >= 294) {
        $('.header-Fixed').slideDown(300);
      } else {
        $('.header-Fixed').fadeOut(300);
      }
    }, false);
  }
  @Watch('$route', { deep: true })
  onRouteChange () {
    this.showMenberCentral = false;
    this.search = false;
    $('.search-box').slideUp();
  }
  @Watch('ShopCart')
  onShopCartChange () {
    this.ShopCart.then((result) => {
      this.count = result.ShopCart.Qty;
    });
  }
  mounted () {
    this.getMenu();
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less">
.pcHeader{
  position: relative;
  .headerBg{
    .member-icon{
        background: url(/images/pc/mobile_08.png) no-repeat center center!important;
        background-size: 25px;
        cursor: pointer;
    }
    .cart-icon{
        background: url(/images/pc/mobile_10.png) no-repeat center center!important;
        background-size: 25px;
        cursor: pointer;
    }
    .searchIcon{
        background: url(/images/mobile/pc_05.jpg) no-repeat center center!important;
        background-size: 25px;
        display: block;
        width: 25px;
        height: 25px;
        display: flex;
        float: left;
        margin-right: 10px;
       cursor: pointer;
    }
  }
  .header-Fixed{
    .member-icon{
        background: url(/images/pc/mobile_08.png) no-repeat center center!important;
        background-size: 25px;
        cursor: pointer;
    }
    .cart-icon{
        background: url(/images/pc/mobile_10.png) no-repeat center center!important;
        background-size: 25px;
        cursor: pointer;
    }
    .searchIcon{
        background: url(/images/mobile/pc_05.jpg) no-repeat center center!important;
        background-size: 25px;
        display: block;
        width: 25px;
        height: 25px;
        display: flex;
        float: left;
        margin-right: 10px;
       cursor: pointer;
    }
  }
}
</style>
<style scoped lang="less">
 .SearchBar{
   width: 20%;
   float: left;
   position: relative;
   margin-top: 1rem;
 }
.searchBox{
    width: 240px;
    height: 35px;
    overflow: hidden;
    z-index: 1;
    background: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 2rem;
    margin-right: 20px;
    input{
        width: calc(100% - 40px);
        height: 35px;
        text-indent: 1rem;
        border:none;
        float: left;
        display: flex;
        outline: none;
        padding: 0px
    }
    .search_btn{
            width:35px;
            float: left;
            height: 35px;
            background: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            outline: none;
            border:none;
            margin-left: 5px;
            margin-top: 0px;
            cursor: pointer;
            img{
                width: 70%;
                margin: 0 auto;
                display: block;
            }
         }
      }
.langSelect{
  display: inline-block;
  height: 30px;
  margin-top: 4.5px;
}
.langSelect select {
    font-size: 15px;
    background: none;
    color: #fff;
    border: none;
    outline: none;
    margin-right: 1rem;
    option{
      color:#1b1b1b;
    }
}
.pageother{
    background-color: #3d475f;
    position: relative!important;
}
.header-Fixed {
    position: relative;
    width: 100%;
    background-color:#3d4364;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9999;
    display:none;
    width: 100%;
    background-size: cover;
  .headerTop{
        width: 1200px;
        margin: 0 auto;
        margin-top: 15px;
        margin-bottom: 20px;
      .inner{
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .main-code{
          float: left;
          display: flex;
          margin-left: 10px;
        }
      }
      .ShareBtn{
        float: left;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 20px;
      }
    }
  .headerBoxMain{
      width: 1200px;
      margin: 0 auto;
      .headerBottom{
        width: 100%;
        display: flex;
        padding-top: 10px;
        padding-bottom: 10px;
      }
    }
    .logoBox{
    width: 305px;
    float: left;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 5%;
    a{
          width: 100%;
          display: inline-block;
          img{
            width: 100%;
          }
        }
    }
    .fav-icon {
        background: url('/images/mobile/mobile_28.png') no-repeat center center;
        display: inline-block;
        width: 25px;
        height: 25px;
        background-size: contain;
    }
}
.showMenuYes{
  height:151px;
  transition:all 1s;
}
 .navMainbar .topa{
      display: block;
      padding-left: 10px;
      padding-right: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
  }
  .navMainbar .topa:hover{
      margin: 0 auto;
      background: #fff;
      border-radius: 2px;
  }
  .navMainbar .topa span{
    width: 100%;
    font-size: 18px;
    color:#fff;
    display: block;
    text-align: center;
    font-weight: 500;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .navMainbar .topa:hover span{
      color: @base_color;
  }
  .navMainbar .topa b{
    width: 100%;
    font-size: 13px;
    color:#666666;
    display: block;
    text-align: center;
  }
  .navMainbar .topb{
      display: block;
      background:#fff;
      background-size: 80%;
      width: 100%;
      transition: all 0.3s ease;
      -o-transition: all 0.3s ease;
      -webkit-transition: all 0.3s ease;
      -moz-transition: all 0.3s ease;
      padding-top: 10px;
      padding-bottom: 10px;
      border-bottom: 1px solid #f0f0f0;
  }
  .navMainbar .topb:hover{
    color:#fff;
    background: @base_color;
  }
  .navMainbar .topb:hover span{
       color:#fff;
  }
  .navMainbar .topb span{
    width: 100%;
    font-size: 16px;
    color:#838a97;
    display: block;
    text-align: center;
    font-weight: 500;
  }
  .navMainbar .topb b{
    width: 100%;
    font-size: 13px;
    color:#838a97;
    display: block;
    text-align: center;
    transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    -webkit-transition: all 0.3s ease;
    -moz-transition: all 0.3s ease;
  }
#header{
  z-index: 9999;
  top:0px;
  width: 100%;
  display: flex;
  position: relative;
}
.headerBg{
  z-index: 999;
  width: 100%;
  position:absolute;
  top:0px;
  left:0px;
    .headerTop{
        width: 1200px;
        margin: 0 auto;
        margin-top: 15px;
        margin-bottom: 20px;
        .inner{
          display: flex;
          align-items: center;
          justify-content: flex-end;
          .main-code{
            float: left;
            display: flex;
            margin-left: 10px;
          }
        }
        .ShareBtn{
          float: left;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 20px;
        }
      }
  .headerBoxMain{
      width: 100%;
      float: left;
      width: 100%;
      .headerBottom{
        width: 100%;
        display: flex;
      }
    }
    .logoBox{
    width:300px;
    float: left;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 5%;
    a{
          width: 100%;
          display: inline-block;
          img{
            width: 100%;
          }
        }
    }
    .fav-icon {
        background: url('/images/mobile/mobile_28.png') no-repeat center center;
        display: inline-block;
        width: 25px;
        height: 25px;
        background-size: contain;
    }
}
.memberLogin{
    display: flex;
    float: left;
    align-items: center;
    position: relative;
    margin-right: 10px;
}
.cartTop{
    display: flex;
    float: left;
    align-items: center;
    position: relative;
    margin-right:10px;
    a{
      width: 25px;
      height: 25px;
    }
}
.langBox{
    display: flex;
    float: right;
    align-items: center;
    position: relative;
    justify-content: center;
    margin-left: 10px;
    color:#999999;
}
.langBox a{
   color:#999999;
   font-size: 14px;
   line-height: 32px;
   width: 40px;
   display: inline-block;
   text-align: center;
}
.langBox a:nth-child(2){
    margin-right: 0px!important;
}

.langActive{
    color:#e83428!important;
}
.HeaderNavBar{
  width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}
.HeaderNormalBar{
  width: 1200px;
  margin: 0 auto;
}
.functionBox{
    float: right;
    margin-top: 4.5px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}
.navMainbar{
    width: 100%;
    float:left;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 10px;
}
.navMainbar >ul{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
.navMainbar::after{
    content: '';
    clear: both;
}
.navMainbar >ul>li{
  width: 25%;
  float: left;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 150%;
  position: relative;
}
.navMainbar >ul>li:hover ul{
  display: block;
}
.navMainbar >ul>li>ul{
    position: absolute;
    z-index: 999;
    display: none;
    width: 100%;
    left: 0px;
    top: 100%;
    background: #fff;
}
</style>
