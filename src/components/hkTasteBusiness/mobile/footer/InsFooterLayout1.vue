<template>
 <div id="footer" class="mobileFooter">
    <div class="footer-box">
          <div class="footerLogo">
              <p class="headerLogo"><img src="/images/mobile/mobile_06.png"></p>
          </div>
          <div class="footerNav">
                  <ul>
                      <li v-for="(item,index) in footerMenus" :key="index" class="indexMeun">
                         <p v-if="item.Type === 0"><a href="javascript:;" class="topa"   @click="toUrl(item)">{{item.Name}}</a><i :class="'downIconA'+index" class="normalIcon"  @click="showMeun(item,index)" v-show="item.Childs && item.Childs.length"></i></p>
                         <p v-else><router-link :to="To(item)" class="topa"> {{item.Name}}</router-link><i :class="'downIconA'+index" class="normalIcon"  @click="showMeun(item,index)" v-show="item.Childs && item.Childs.length"></i></p>
                          <!-- <a href="javascript:;"><span  @click="To(item)">{{item.Name}}</span><i :class="'downIconA'+index" class="normalIcon"  @click="showMeun(item,index)"></i></a> -->
                          <ul v-if="item.Childs && item.Childs.length"  class="submeunMain" :class="'sub'+index">
                              <li v-for="(child,index2) in item.Childs" :key="index2">
                                   <a href="javascript:;" class="topb"  v-if="child.Type === 0" @click="toUrl(child)">{{child.Name}}</a>
                                  <router-link :to="To(child)" v-else>{{child.Name}}</router-link>
                              </li>
                          </ul>
                      </li>
                  </ul>
              </div>
          <div class="footerAccept">
            <p class="text">{{$t('Message.Weaccept')}}</p>
            <p><img src="/images/mobile/mobile_16.jpg"></p>
          </div>
           <div class="LatestTrends">
            <p class="text">{{$t('Message.LatestTrends')}}</p>
            <div class="Main">
              <div class="left">
                <a href="" target="_blank"><img src="/images/mobile/mobile_18.jpg"></a>
                 <a href="" target="_blank"><img src="/images/mobile/mobile_17.jpg"></a>
              </div>
              <div class="right">
                  <ul>
                      <li v-for="(v,index) in ContentList" :key="index"><router-link :to="'/cms/content/'+v.Id">{{v.Title}}</router-link></li>
                  </ul>
              </div>
            </div>
          </div>
          <div class="footerCpy">
            <p class="cpy"><span class="leftSide">Copyright © {{currentYear}} Classic Trading Company.<br/>powered by Intimex</span><a class="RightSide" href="https://www.intimex.hk/" target="_blank"><img src="/images/mobile/footerlogo.png"></a></p>
          </div>
    </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({
  components: {
      Menu: () => import('@/components/business/mobile/header/InsElMenu.vue')
  }
})
export default class InsFooter extends Vue {
  currentYear: number = 0;
  clickIndex: number = 0;
  footerMenus: any[] = [];
  content:string='';
  currentPage: number = 1; // 当前页
  pageSize: number = 3; // 每页显示条目个数
  ContentList:any[]=[];
  showMeun (item, index) {
    $('.sub' + index).slideToggle();
    $('.downIconA' + index).toggleClass('reduce');
    $('.downIconA' + index).parents('.indexMeun').toggleClass('addbg');
  }
  showContact () {
    $('.footerContact').slideToggle();
    $('.downIconB').toggleClass('reduce');
  }
  closeSlideMenu (n) {
    this.$store.dispatch('isShowMenu', false);
  }
  To (n) {
    return n.Type === 1 ? '/cms/catDetail/' + n.Value.Id : n.Type === 2 ? '/CMS/content/' + n.Value.Id : n.Type === 3 ? '/RegNPay/Form/' + n.Value.Id : n.Type === 4 && !this.$store.state.catMenuType ? '/product/cat/' + n.Value.Id : n.Type === 4 && this.$store.state.catMenuType ? '/product/search/-?catalogs=' + JSON.stringify([parseInt(n.Value.Id)]) + '&type=0' : n.Type === 5 ? '/product/search/-?attrs=' + JSON.stringify([{ Id: parseInt(n.Value.Id), Vals: [] }]) + '&type=0' : '/product/search/-?attrs=' + JSON.stringify([{ Id: parseInt(n.ParentId), Vals: [parseInt(n.Value.Id)] }]) + '&type=0';
  }
  GoUrl (val) {
    window.open(val);
  }
  toUrl (n) {
    if (!n.IsNewWin && n.Url) {
      window.location.href = n.Url;
    } else if (n.IsNewWin && n.Url) {
      window.open(n.Url);
    }
  }
  getContentsList() {
    var params = {
      Key: 'Terms',
      Page: this.currentPage,
      PageSize: this.pageSize
    };
    this.$Api.cms.getContentsByCatKeyEx(params).then((result) => {
      this.ContentList = result.Data.slice(0, 3);
      console.log(this.ContentList, 'this.ContentListthis.ContentList');
    });
  }
  getMenu () {
    this.$Api.promotion.getMenu().then((result) => {
      this.footerMenus = result.ReturnValue.FooterMenus;
    });
  }
  created () {
    var date = new Date();
    this.currentYear = date.getFullYear();
    this.getContentsList();
    this.getMenu();
  }
  @Watch('$route', { deep: true })
  onIdChange () {
    $('.submeunMain').hide();
    $('.normalIcon').removeClass('reduce');
    $('.indexMeun').removeClass('addbg');
  }
}
</script>

<style lang="less">

.mobileFooter{
  .contactBox{
    padding-left: 1rem;
    .HeadTitle{
        font-size:1.7rem;
        color:#fff;
        text-align: left;
         line-height: 3rem;
         margin-top: 2rem;
         margin-bottom: 2rem;
    }
    .TitleA{
        font-size:1.4rem;
        color:#fff;
        text-align: left;
        font-weight: 700;
        text-transform: uppercase;
        line-height: 2.5rem;
    }
    .TitleB{
        font-size:1.4rem;
        color: #b2b2b2;
        font-weight: 500;
        text-align: left;
        line-height: 2.5rem;
    }
    .lineBottom{
      height: 2rem;
    }
  }
}

</style>
<style scoped lang="less">
.footerContact{
  display: none;
}
.submeunMain{
  display: none;
}
.SubMeun0{
  display: none;
}
.SubMeun1{
  display: none;
}
.addbg{
  background: #31394d;
}
#footer{
  width: 100%;
  background:@base_color;
  background-size: cover;
  display: inline-block;
  .reduce{
    background: url('/Images/mobile/reduce.png') no-repeat center center!important;
    background-size: contain;
    width: 1.2rem;
    height: 1.2rem;
    display: inline-block;
    position: absolute;
    right: 1rem;
    top: 1.4rem;
  }
  .footer-box{
    width: 100%;
    display: inline-block;
    .footerCpy{
      width: 90%;
      margin: 0 auto;
      margin-top: 3rem;
      margin-bottom: 1rem;
        .cpy{
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          margin-bottom: 1rem;
          text-align: center;
          align-items: center;
          justify-content: center;
          .leftSide{
            // width: 95%;
            float: left;
            color:#fff;
            font-size: 1.1rem;
            line-height: 1.5rem;
          }
          .RightSide{
            width: 5%;
            float: left;
            img{
              width: 100%;
            }
          }
        }
        .link{
           font-size: 1.1rem;
           color:#ccc;
           margin-top: 1rem;
          a{
            font-size: 1.1rem;
            color:#ccc;
            margin-right: 1rem;
            &:nth-child(2){
              margin-left: 1rem;
            }
          }
        }
    }
    .footerLogo{
      width: 90%;
      margin: 0 auto;
      display:  flex;
      flex-wrap: wrap;
      margin-top: 4rem;
      .headerLogo{
        img{
          width: 80%;
          margin: 0 auto;
          display: block;
        }
      }
      .shareLogo{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        margin-top: 1rem;
        a{
          float: left;
          display: flex;
          flex-wrap: wrap;
          img{
            width: 80%;
          }
        }
      }
    }
    .footerAccept{
      width: 90%;
      margin: 0 auto;
      display:  flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-start;
      .text{
        font-size: 1.4rem;
        color: #fff;
        margin-bottom: 1rem;
        margin-top: 2rem;
      }
      >p{
        img{
          display: block;
          width: 100%;
        }
      }
    }
    .LatestTrends {
      width: 90%;
      margin: 0 auto;
      display:  flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-start;
      .text{
        font-size: 1.4rem;
        color: #fff;
        margin-bottom: 1rem;
        margin-top: 2rem;
      }
      .Main{
        width: 100%;
        display: inline-block;
        .left{
          float: left;
          width: 25%;
          height: 4rem;
          display: flex;
          align-items: center;
          a{
            display: inline-block;
            width: 3rem;
            img{
              width: 100%;
            }
          }
        }
        .right{
          float: left;
          width: 75%;
          ul{
            width: 100%;
            display: inline-block;
            li{
              float: left;
              width: 32%;
              display: flex;
              align-items: center;
              justify-content: center;
              background: #31394d;
              height: 4rem;
              margin-right: 2%;
              border-radius: .3rem;
              a{
                color:#fff;
                font-size: 1rem;
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                justify-content: center;
                text-align: center;
              }
              &:last-child{
                margin-right: 0px!important;
              }
            }
          }
        }
      }
    }
    .footerNav{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      margin-top: 4rem;
      margin-bottom: 2rem;
      >ul>li{
      width: calc(100% - 4rem);
      display: inline-block;
      line-height: 4rem;
      text-align: left;
      position: relative;
      border-bottom: 1px solid #313a4d;
      padding-left: 2rem;
      padding-right: 2rem;
        >ul{
          position: relative;
        }
        >ul>li{
          width: 100%;
          display: inline-block;
          background: transparent;
          border-radius: 10px;
          height: 3rem;
          line-height: 3rem;
          text-align: left;
          margin-bottom: 0.5rem;
          >a{
            font-size: 1.4rem;
            color:#cfd6e6;
            font-weight: 500;
            text-decoration: none;
            &:hover{
              color:#fff;
              text-decoration: underline;
            }
          }
        }
        .topa{
          font-size: 1.4rem;
          color:#fff;
          font-weight: 500;
          text-decoration: none;
          position: relative;
          display: block;
          border-radius: 3px;
          margin-bottom: .5rem;
          width:90%;
          text-transform: uppercase;
        }
        i{
              background: url('/Images/mobile/plus.png') no-repeat center center;
              background-size: contain;
              width: 1.2rem;
              height: 1.2rem;
              display: inline-block;
              position: absolute;
              right: 1rem;
              top: 1.4rem;
        }
      }
    }
    .contactBox{
    width: 100%;
    display: inline-block;
    margin-top: 2rem;
      .w50{
        width: 50%;
        float: left;
        >p:nth-child(1){
          font-size: 1.4rem;
          text-align: center;
          color: #FFF;
          padding-bottom: .5rem;
        }
        >p:nth-child(2){
            font-size:2.2rem;
            text-align: center;
            color: #FFF;
        }
      }
    }
    >p{
      width:70%;
      margin: 0 auto;
      img{
        width: 100%;
      }
    }
  }
}
</style>
