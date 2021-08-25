<template>
  <div id="header" class="new_header top-header-box">
    <!-- 正常首页头部开始 -->
    <div class="mobileNormal" :class="{'pageother':showHomePage!=='/'}">
      <div class="headerTop">
        <!-- 会员登陆 -->
        <div class="headerLeft">
           <router-link to="/"><img src="/images/mobile/mobile_06.png"></router-link>
        </div>
        <div class="headerRight">
           <InsLogin/>
           <shopcart class="shoppingcart" />
           <div class="meunBarBtn">
               <i class="menubar"  @click="showSlideMenu"></i>
           </div>
          </div>
      </div>
    </div>
    <!-- 正常首页头部结束 -->

    <!-- 固定头部开始 -->
    <div class="mobileFixed">
      <div class="headerTop">
        <!-- 会员登陆 -->
        <div class="headerLeft">
           <router-link to="/"><img src="/images/mobile/mobile_06.png"></router-link>
        </div>
        <div class="headerRight">
           <InsLogin/>
           <shopcart class="shoppingcart" />
           <div class="meunBarBtn">
                  <i class="menubar"  @click="showSlideMenu"></i>
           </div>
          </div>
      </div>
    </div>
    <!-- 固定头部结束 -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
// import logo from '@/components/base/mobile/InsLogo.vue';
// import DrawerUI from './InsDrawerUI.vue';
import InsButton from '@/components/base/mobile/InsButton.vue';
import Cookie from 'js-cookie';
import shopcart from '@/components/business/mobile/header/InsShoppingCart.vue';
import InsLogin from '@/components/business/mobile/header/InsLogin.vue';
@Component({
  components: {
    // logo,
    shopcart,
    InsButton,
    InsLogin,
    InsDrawer: () => import('@/components/base/mobile/InsDrawer.vue')
  }
})
export default class InsHeader extends Vue {
  @Prop() private readonly isfixed!: boolean;
  direction: string = 'ttb';
  drawer: boolean = false;
  showClose: boolean = true;
  show: boolean = false;
  private fixedBar:boolean = true;
  private key: string = '';
  private showMenberCentral:boolean = false;
  private showChilds:boolean[] = [];
  private drawerChange:boolean = false;
  private count:number = 0;
  private search: boolean = false;
  private showGrandChilds = {};
  private isHomePage:boolean=false;
  private selected:string='C';
  showSearchBar:boolean =false;
  menberCentral () {
    if (!this.$Storage.get('isLogin')) {
      window.location.href = '/account/login';
    } else {
      // this.showMenberCentral = !this.showMenberCentral;
      $('.lang_flow').slideToggle();
    }
  }
  showSearch () {
    $('.searchBar').slideToggle();
  }
  get ShopCart () {
    return this.$store.state.shopCart;
  }
  get showHomePage () {
    return this.$route.path;
  }
  tofav () {
    window.location.href = '/account/myFavorite';
  }
  logout () {
    this.$Api.member.logout().then((result) => {
      if (result) this.$message('Message.SucceedInOperating');
      this.$router.push('/');
      this.Reload();
    });
  }
  changLange (lang) {
    this.$Api.member.setUILanguage(lang).then((result) => {
      this.$i18n.locale = lang;
      localStorage.setItem('locale', lang);
      Cookie.set('uLanguage', lang);
      this.Reload();
    }).catch((error) => {
      console.log(error);
    });
  }
  getMenu () {
    this.$Api.promotion.getMenu().then((result) => {
      this.$store.dispatch('setHeaderMenus', result.ReturnValue.HeaderMenus);
      this.$store.dispatch('setFooterMenus', result.ReturnValue.FooterMenus);
      result.ReturnValue.HeaderMenus.forEach((element, index) => {
        if (element.Childs) this.showChilds[index] = true;
        else this.showChilds[index] = false;
        if (element.Childs) {
          element.Childs.forEach(e => {
            if (e.Childs) this.showGrandChilds[e.Value.Id] = false;
            else this.showGrandChilds[e.Value.Id] = false;
          });
        }
      });
    }).catch((error) => {
      console.log(error);
    });
  }
  private changeLange (lang) {
    this.$Api.member.setUILanguage(lang).then((result) => {
      this.$i18n.locale = lang;
      // console.log(this.hhh, this.$t('test'),'test');
      localStorage.setItem('locale', lang);
      Cookie.set('uLanguage', lang);
      // this.$store.dispatch('setLang', lang);
      this.Reload();
    }).catch((error) => {
      console.log(error);
    });
  }
  private To (item) {
    if (item.Type === 0) this.$router.push(item.Url);
    else if (item.Type === 2) this.$router.push('/cms/content/' + item.Value.Id);
    else if (item.Type === 4 && item.Value.Id) this.$router.push('/product/cat/' + item.Value.Id);
    else if (item.Type === 5 && item.Value.Id) this.$router.push('/product/search/-?attrs=' + JSON.stringify([{ Id: parseInt(item.Value.Id), Vals: [] }]) + '&type=1');
    this.show = false;
  }
  get currentlang () {
    return this.$i18n.locale;
  }
  set currentlang (val) {
    this.changLange(val);
  }
  memberCentral (e) {
    let target = e.target as HTMLElement;
    if (target.className === 'ii' && target.dataset.to) {
      this.$router.push({
        path: target.dataset.to
      });
    }
  }
  showSlideMenu () {
    // this.show = !this.show;
    this.$store.dispatch('isShowMenu', !this.$store.state.isShowMenu);
  }
  closeSlideMenu () {
    this.$store.dispatch('isShowMenu', !this.$store.state.isShowMenu);
  }
  closeMenuChids (index) {
    this.showChilds[index] = !this.showChilds[index];
    this.drawerChange = !this.drawerChange;
  }
  closeMenuGrandChids (item) {
    this.showGrandChilds[item.Value.Id] = !this.showGrandChilds[item.Value.Id];
    this.drawerChange = !this.drawerChange;
  }
  created () {
    this.$store.dispatch('setShopCart', this.$Api.shoppingCart.getShoppingCart());
    // if (this.$route.name !== 'home') { this.fixedBar = false; }
    addEventListener('scroll', () => {
      // if (this.$route.name !== 'home') return;
      var _this = this;
      let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
      if (scrollTop >= 150) {
        $('.mobileFixed').slideDown(300);
      } else {
        $('.mobileFixed').fadeOut(300);
      }
    }, false);
    window.addEventListener('click', (e) => {
      let target = e.target as HTMLElement;
      if (target.className !== 'showMenberCentral') $('.lang_flow').slideUp();
    });
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
      this.$store.dispatch('isShowMenu', !this.$store.state.isShowMenu);
    } else {
      this.$router.push({
        path: '/product/search/-'
      });
      this.$store.dispatch('isShowMenu', !this.$store.state.isShowMenu);
    }
  }
  mounted () {
    this.getMenu();
  }
  @Watch('$route', { deep: true })
  onRouteChange () {
    this.$store.state.isShowMenu = false;
    this.showSearchBar = false;
  }
  @Watch('ShopCart')
  onShopCartChange () {
    this.ShopCart.then((result) => {
      this.count = result.ShopCart.Qty;
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.headerRight{
    display: flex;
    float: right;
    align-items: center;
    justify-content: flex-end;
    margin-top: .5rem;
    width: 60%;
}
.headerLeft{
  float: left;
  display: flex;
  flex-wrap: wrap;
  width: 12rem;
  a{
    width: 100%;
    display: inline-block;
    img{
      width: 100%;
      display: block;
    }
  }
}
.searchBox{
    width: 90%;
    height: 3.5rem;
    margin: 0 auto;
    position: absolute;
    overflow: hidden;
    margin-bottom: 2rem;
    z-index: 9999;
    background: #fff;
    top: 6rem;
    border: 1px solid #e0e0e0;
    left: 50%;
    transform: translate(-50%);
    border-radius: 2rem;
    input{
        width: calc(100% - 4.5rem);
        height: 3.5rem;
        text-indent: 1rem;
        border:none;
        float: left;
        display: flex;
        outline: none;
        padding: 0px
    }
    .search_btn{
            width: 3.5rem;
            float: left;
            height: 3.5rem;
            margin-right: 1rem;
            background: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            outline: none;
            border:none;
            img{
                width: 70%;
                margin: 0 auto;
                display: block;
            }
         }
      }
.searchBtn{
    width: 2.5rem;
    height: 2.5rem;
    float: left;
    display: block;
    margin-right: 1.5rem;
    a{
        display: block;
        img{
            width: 100%;
        }
    }
}
.searchBar{
    position: absolute;
    width: calc(100% - 2rem);
    background: rgba(95, 204, 196, 1);
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    z-index: 99;
    padding-left: 1rem;
    padding-right: 1rem;
    display: none;
  .search_btn{
    display: inline-block;
    vertical-align: middle;
    img{
      width: 3rem;
      height:3rem;
    }
  }
  .inputKey{
    width: 88%;
    height: 2rem;
    line-height: 2rem;
    border: 0px;
    background: transparent;
    border-bottom: 1px solid #fff;
    outline: none;
    color:#fff;
  }
}
.pageother{
    background-color: #3d475f;
    position: relative!important;
}
.mobileFixed{
  position: relative;
  width: 100%;
  background-color: #3d4364;
  position: fixed;
  opacity:1;
  left: 0;
  top: 0;
  z-index: 9999;
  display:none;
  width: 100%;
  background-size: cover;
  .logoimg{
    width: 10rem!important;
  }
  .floatRight{
    top:0rem!important;
  }
  .menubar{
    width: 2.5rem!important;
  }
}
.fixStyle{
  position: fixed;
  border-bottom: 1px solid #000;
}
#header{
  z-index: 9999;
  top:0px;
  width: 100%;
  display: flex;
}
.headerTop{
  position: relative;
  padding-top: .5rem;
  padding-bottom: .5rem;
  display: flex;
  align-items: center;
  padding-left: 1rem;
  padding-right: 1rem;
  width: calc(100% - 2rem);
  .headerLang{
    width:20%;
    position: absolute;
    right: 0px;
    height: 3.5rem;
    padding-left: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    select{
      width: 100%;
      background: transparent url('/images/mobile/arrow-down-back.png')  80% 50% no-repeat;
      background-size: 1rem;
      border:none;
      box-sizing: border-box;
      text-align: center;
      color:#666666;
      appearance: none;
      -moz-appearance: none;
      -webkit-appearance: none;
      padding-left: .8rem;
      font-size: 1.4rem;
      outline: none;
      option{
        color:#666666;
        outline: none;
      }
    }
  }
  .shoppingcart{
    float: left;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
  }
  .headerFav{
    float: left;
    display: flex;
    align-items: center;
    justify-content: center;
    img{
      width:2.5rem;
      margin: 0 auto;
      display: block;
    }
  }
  .menberCentral{
    float: left;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
    .lang_flow{
    position: absolute;
    top: 5rem;
    left: 0px;
    width: 100%;
    background: #5fccc4;
    z-index: 999;
    border-bottom-right-radius: 1rem;
    border-bottom-left-radius: 1rem;
    display: none;
    >div{
      color:#fff;
      font-size: 1.4rem;
      height: 4rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    }
    img{
      width:2.5rem;
      margin: 0 auto;
      display: block;
    }
  }
}
.floatRight{
    position: absolute;
    top: 0rem;
    right: 0px
}
.otherpages{
      box-shadow: 0 0px 8px #6f697b;
}
.menubar{
    background: url(/images/mobile/mobile_12.png) no-repeat center center;
    background-size: 100%;
    position: relative;
    width: 2.5rem;
    display: inline-block;
    height: 2.5rem;
    color: #cccccc;
    line-height: 35px;
    font-size: 17px;
    -webkit-transition-duration: 0.1s;
    transition-duration: 0.1s;
    -webkit-transition-property: transform;
    -webkit-transition-property: -webkit-transform;
    transition-property: -webkit-transform;
    transition-property: transform;
    transition-property: transform, -webkit-transform;
    -webkit-transition-timing-function: ease-out;
    transition-timing-function: ease-out;
    vertical-align: middle;
}
.quitbar{
    background: url(/images/mobile/mobile_02.jpg) no-repeat center center;
    background-size: 100%;
    position: relative;
    width: 2.5rem;
    display: inline-block;
    height: 2.5rem;
    color: #cccccc;
    line-height: 35px;
    font-size: 17px;
    -webkit-transition-duration: 0.1s;
    transition-duration: 0.1s;
    -webkit-transition-property: transform;
    -webkit-transition-property: -webkit-transform;
    transition-property: -webkit-transform;
    transition-property: transform;
    transition-property: transform, -webkit-transform;
    -webkit-transition-timing-function: ease-out;
    transition-timing-function: ease-out;
    vertical-align: middle;
}
.otherpage{
    background: url(/static/Image/home/menubar_hover.png) no-repeat center center;
    background-size: 22.5px 22.5px;
    position: relative;
    width: 30px;
    display: inline-block;
    height: 35px;
    color: #cccccc;
    line-height: 35px;
    font-size: 17px;
    -webkit-transition-duration: 0.1s;
    transition-duration: 0.1s;
    -webkit-transition-property: transform;
    -webkit-transition-property: -webkit-transform;
    transition-property: -webkit-transform;
    transition-property: transform;
    transition-property: transform, -webkit-transform;
    -webkit-transition-timing-function: ease-out;
    transition-timing-function: ease-out;
    vertical-align: middle;
}
#header {
    // background-color: #8dc11f;
    background-color: rgba(141,193,31,0.1);
    .block{
      height: 4rem;
    }
}
.mobileNormal{
  z-index: 999;
  width: 100%;
  display: flex;
  position:relative;
  top:0px;
  left:0px;
  background: #3d4364;
}
.mobileNormal,.mobileFixed {
  .input{
    position: absolute;
    width: 100%;
    box-sizing: border-box;
    padding: 1rem 2.5rem;
    background-color: white;
    input{
      border-right: 0;
      border-top: 1px solid #666;
      border-bottom: 1px solid #666;
      border-left: 1px solid #666;
      border-image: none;
      outline: none; // 去除选中状态边框
      padding: 0 1rem;
      height: 3rem;
      font-size: 1.5rem;
      box-sizing: border-box;
      vertical-align: middle;
      width: calc(100% - 5rem);
    }
    .search_btn{
      img{
        width: 3rem;
        vertical-align: middle;
      }
      height: 3rem;
      width: 5rem;
      background-color: @primary_color;
      display: inline-block;
      text-align: center;
    }
  }
  .header_link {
    background: #242424;
    width: 100%;
    height: 2rem;
  }
  .header_logo {
    text-align: center;
    padding: 1rem 0 1.5rem;
    img{
      width: 50%;
    }
  }
  .header-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2rem 4%;
    box-sizing: border-box;
    background-size: 100% 100%;
    box-shadow: 0px 0px 10px #ddd;
    // background-color: white;
    .logo {
      width: 100%;
      text-align: center;
      position: relative;
      a{ text-decoration:none}
      .count{
        position: absolute;
        color: white;
        background: #000;
        width: 1.1rem;
        text-align: center;
        line-height: 1.1rem;
        font-size: 1rem;
        border-radius: 50%;
        transform: translateX(-100%);
      }
      img{
        width: 2rem;
        margin: 0 0.5rem;
        vertical-align: middle;
      }
      .shoppingcart{
        margin: 0 0.5rem;
        vertical-align: middle;
        display: inline-block;
      }
      input{
        border-top: 0;
        border-left: 0;
        border-right: 0;
        border-bottom: 1px solid rgba(0,0,0,.2);
        outline: none;
        vertical-align: middle;
        background-color: transparent;
        font-size: 1.5rem;
        width: calc(100vw - 20rem);
      }
      .search{
        margin: 0;
      }
      .triangle{
        position: absolute;
        border-top: 1rem solid transparent;
        border-right: 1rem solid transparent;
        border-left: 1rem solid transparent;
        border-bottom: 1rem solid white;
        top: 3.6rem;
      }
      // float: left;
      .switch_lang{
                font-size: 1rem;
                display: inline-block;
                vertical-align: middle;
                // margin: 0 1rem;
                position: relative;
                .lang_flow{
                    position: absolute;
                    background-color: white;
                    white-space:nowrap;
                    font-size: 1rem;
                    line-height: 3rem;
                    // margin-top: 1rem;
                    bottom: -1.5rem;
                    transform: translateY(100%);
                    div{
                        color: white;
                        text-align: center;
                        background-color: @primary_color;
                        margin: 2px;
                        border-radius: 1px;
                        min-width: 10rem;
                    }
                }
                .lang_flow::after{
                  content: ' ';
                  position: absolute;
                  border-bottom: 1rem solid #ffffff;
                  border-top: 1rem solid transparent;
                  border-left: 1rem solid transparent;
                  border-right: 1rem solid transparent;
                  top: 2px;
                  -webkit-transform: translateY(-100%);
                  transform: translateY(-100%);
                }
            }
    }
    .el-icon-close,
    .el-icon-s-fold {
      font-size: 2rem;
      color: #FFF;
      vertical-align: middle;
      margin: 0 0 0 1rem;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
}
.drawer_header{
  display: flex;
  justify-content: space-between;
  background-color: white;
  padding: 1rem 1rem;
  a{
    img{
        width: 10rem;
      }
  }
  .el-icon-close,
  .el-icon-s-fold {
    font-size: 2rem;
    color: @primary_color;
  }
}
.drawer_main{
  border-top: 1px solid black;
  .drawer_main_item{
  border-bottom: 1px solid black;
  position: relative;
  background-color: white;
  .more{
      content: " ";
      width: 2rem;
      height: 2rem;
      background: url('../../../../assets/Images/mobile/home/down1.png');
      background-size: 100% 100%;
      position: absolute;
      top: 1rem;
      right: 1rem;
      z-index: 99;
    }
  .child{
    z-index: 0;
    >div{
      font-size: 1.3rem;
      line-height: 4rem;
      padding: 0 1rem;
    }
    .real_child{
      position: relative;
      .child_more{
        content: " ";
        width: 2rem;
        height: 2rem;
        background: url('../../../../assets/Images/mobile/home/down1.png');
        background-size: 100% 100%;
        position: absolute;
        top: 1rem;
        right: 1rem;
        z-index: 99;
      }
      .child_content{
        font-size: 1.3rem;
        line-height: 4rem;
        padding: 0 1rem;
        z-index: 1;
        position: relative;
        background-color: white;
      }
      .real_grand_child{
        padding: 0 2rem;
        .grand_child_content{
          font-size: 1.3rem;
          line-height: 4rem;
        }
      }
      .heightLine{
        background-color: @primary_color;
        color: white;
      }
    }
  }
  .content{
    font-size: 1.3rem;
    line-height: 4rem;
    padding: 0 1rem;
    z-index: 1;
    position: relative;
    background-color: white;
  }
  }
}
.drawer_footer{
  display: flex;
  justify-content: space-around;
  margin-top: 4rem;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}
.fade-leave-to,.fade-enter /* .fade-leave-active below version 2.1.8 */ {
  // transform: translateY(-100%);
  opacity: 0;
}
</style>
