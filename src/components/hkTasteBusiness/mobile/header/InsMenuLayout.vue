<template>
    <div class="menu_warpper">
        <div id="menu">
           <div class="meunTop">
            <div class="innerMeun">
                <div class="headerFav"><a href="javascript:;" @click="tofav" ><img  src="/images/mobile/mobile_28.png"></a></div>
                    <div class="codeSelect"><CodeSelect/></div>
                    <div class="langBox">
                      <LangSwitch />
                    </div>
                     <div class="meunBarBtn">
                        <i class="menubar"  @click="closeSlideMenu"></i>
                    </div>
              </div>
            </div>
            <div class="SearchBox">
              <input type="text" v-model="key" :placeholder = "$t('Message.KeyWords')"/>
              <span class="search_btn"  @click="searchFun(key)"><img src="/images/mobile/mobile_29.png"></span>
            </div>
            <div class="InnerBox">
                <Menu :backColor="'transparent'" :textColor="'rgba(0,0,0,0.8)'"   :uniqueOpened="true" defaultActive="true" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Cookie from 'js-cookie';
@Component({
  components: {
    Menu: () => import('@/components/business/mobile/header/InsElMenu.vue'),
    InsHeader: () => import('@/components/business/mobile/header/InsHeader.vue'),
    CodeSelect: () => import('@/components/business/mobile/header/InsCodeSelect.vue'),
    LangSwitch: () => import('@/components/business/mobile/header/InsLangSwitch.vue')
  }
})
export default class InsMenuLayout extends Vue {
  showMemNav: boolean = false;
  showSearchBar:boolean =false;
  searchKey: string = '';
  private now:Date = new Date();
  private showLang:boolean = false;
  private key: string = '';
  private isfixed:boolean=false;
  private showMenberCentral:boolean = false;
  menberCentral () {
    if (!this.$Storage.get('isLogin')) {
      window.location.href = '/account/login';
    } else {
      this.showMenberCentral = !this.showMenberCentral;
    }
  }
  memberCentral (e) {
    let target = e.target as HTMLElement;
    if (target.className === 'ii' && target.dataset.to) {
      this.$router.push({
        path: target.dataset.to
      });
    }
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
  onChildValue (val) {
    this.isfixed = val;
  }
  closeSlideMenu () {
    this.$store.dispatch('isShowMenu', false);
  }
  get currentlang () {
    return this.$i18n.locale;
  }
  set currentlang (val) {
    this.changLange(val);
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
  get currentYear () {
    return this.now.getFullYear();
  }
}
</script>

<style lang="less">
.isfixed{
    margin-top: 10rem;
}
.drawer_footer{
  display: flex;
  justify-content: space-around;
  margin-top: 4rem;
}
.innerFooter{
    width: 90%;
    margin: 0 auto;
    display: flex;
}
.innerShare{
    width: 90%;
    margin: 0 auto;
    display: flex;
    margin-top: 2rem;
    padding-bottom: 5rem;
    align-items: center;
    justify-content: center;
}
.MeunBarInner{
    width: 90%;
    margin: 0 auto;
}
.MeunBarInner a{
    width: 2.5rem;
    height: 2.5rem;
    display: inline-block;
    margin-right: 1rem;
    vertical-align: middle;
}
.MeunBarInner i{
    float: right;
    display: block;
    font-size:2rem;
}
.MeunBarInner a img{
    width: 2.5rem;
}
.innerShare a{
    display: inline-block;
    margin-right: 1rem;
    vertical-align: middle;
}
.innerShare a img{
    width: 3rem;
}
.el-scrollbar__wrap{
    overflow-y: auto!important;
    height: 100%;
    overflow-x: hidden!important;
}
.menu_footer span{
    display: flex;
    float: left;
    border:1px solid #eee;
    padding-top: .5rem;
    padding-bottom: .5rem;
    padding-left: 2rem;
    padding-right: 2rem;
    margin-right: 1rem;
    font-size: 1.4rem;
}
#menu {
    .el-submenu__icon-arrow {
        display: none;
    }
    .el-menu--inline{
      >li{
        margin-bottom: 0px!important;
      }
    }
    .el-menu-item{
        white-space: unset!important;
    }
    .el-submenu__title {
        padding-top: 1.11rem;
        padding-bottom: 1.11rem;
        height: auto!important;
        line-height: unset;
        background-color:#fff!important;
        white-space: unset!important;
        .name{
            font-size: 1.4rem!important;
            color:@base_color;
            text-transform: uppercase;
            padding-left: .3rem;
        }

    }
    .el-menu--inline{
        li{
            border-bottom: 0px!important;
            a{
              padding-top: 1rem!important;
              padding-bottom: 1rem!important;
            }
            b{
                font-weight: 500!important;
                text-transform: unset!important;
                color:#838a97!important;
                font-size: 1.4rem!important;
                &:hover{
                    text-decoration: underline;
                    color:@base_color!important;
                }
            }
        }
    }
    .el-menu {
        width: 100%;
        background-color: transparent;
        border: 0;
        .subline_b {
          color: #3d475f;
          font-size: 1.4rem;
          text-transform: uppercase;
          font-style: normal;
          font-weight: 500;
        }
        .el-submenu__icon-arrow {
            display: block;
            font-size: 1.6rem;
            color:@base_color;
        }

        > li {
            height: auto;
            line-height: unset;
            border-bottom: 1px solid #e0e0e0;
             >a {
                 color:#333333;
                 background: #fff;
                 background-size: 100% 100%;
                 display:block;
                 width: 100%;
                 margin: 0 auto;
                 padding-top: 1.5rem;
                 padding-bottom: 1.5rem;
                 margin: 0 auto;
                 font-weight: 500;
                 b{
                     color:#FFF;
                     display: block;
                     font-weight: 500;
                     padding-left: 20px;
                     padding-right: 20px;
                     &:nth-child(1){
                        color:#3d475f;
                        font-size: 1.4rem;
                        text-transform: uppercase;
                     }
                     &:nth-child(2){
                         color:#333333;
                         font-size: 1.2rem;
                     }
                 }
            }

            a {
                text-decoration: none;
            }
        }

        >li {
            line-height: unset;
            min-width: unset;
            padding: 0px!important;
        }
    }
}
#menu .is-opened > .el-submenu__title{
    background: #fff!important;
    color:@base_color!important;
    font-weight: 700;
    .name{
        color:@base_color!important;
    }
}
#menu .is-opened > .el-submenu__title .el-submenu__icon-arrow{
    color:@base_color!important;
    font-weight: 700!important;
}
</style>

<style scoped lang="less">
.SearchBox {
  width: calc(100% - 2px);
  display: flex;
  border: 1px solid #838a97;
  height: 3.5rem;
  flex-wrap: wrap;
  input{
    width: calc(100% - 40px);
    height: 3.5rem;
    line-height:  3.5rem;
    background: #fff;
    border:none;
    float: left;
    padding: 0px;
    margin: 0px;
    outline: 0;
    text-indent: 10px;
    color:#666;
  }
  .search_btn{
    width: 40px;
    background: #838a97;
    float: right;
    height:  3.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    img{
      width: 60%;
      margin: 0 auto;
      display: block;
    }
  }
}
.meunBarBtn{
  float:right;
  .menubar{
      background: url(/images/mobile/mobile_27.png) no-repeat center center;
      background-size: 100%;
      position: relative;
      width: 2rem;
      display: inline-block;
      height: 2rem;
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
}
.menu_warpper{
    .meunTop{
        width: 100%;
        display: flex;
        background: @base_color;
        padding-top: 1rem;
        padding-bottom: 1rem;
        position: relative;
        flex-wrap: wrap;
        .innerMeun{
            width: 90%;
            margin: 0 auto;
            display: block;
        }
    }
    .codeSelect{
        width: 25%;
        margin-right:2%;
        float: left;
        display: block;
    }
    .langBox{
        width: 25%;
        float: left;
        display: block;
        select{
          width: 100%;
          padding-left: 1rem;
          font-size: 16px;
          border: none;
          display: inline-block;
          vertical-align: middle;
          height: 2.5rem;
          color:#666666;
          background: #FFF url('/images/mobile/mobile_04.jpg') 90% .5rem no-repeat;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          outline: 0;
        }
    }
    .headerFav{
        float: left;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 2.5rem;
        margin-right: 5%;
        a{
            width: 2rem;
            height: 2rem;
            display: block;
            img{
                width: 100%;
            }
        }
    }
    .menberCentral{
        width: 22%;
        margin-right:4%;
        float: left;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #fff;
        height: 3rem;
        img{
         width: 2.5rem;
         height: 2.5rem;
        }
        .lang_flow{
            position: absolute;
            top: 5rem;
            left: 0px;
            width: 100%;
            background: #FFF;
            z-index: 999;
            >div{
            color:#000;
            font-size: 1.4rem;
            height: 4rem;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding-left: 20px;
            border-bottom: 1px solid #e0e0e0;
            }
        }
    }
    .searchBtn{
        width: 2.5rem;
        height: 2.5rem;
        float: left;
        display: block;
        margin-right: 1rem;
        a{
            display: block;
            img{
                width: 100%;
            }
        }
    }
    .closeBtn{
        width: 2.5rem;
        height: 2.5rem;
        display: block;
        float:right;
        a{
            display: block;
            img{
                width: 100%;
            }
        }
    }
}
</style>
