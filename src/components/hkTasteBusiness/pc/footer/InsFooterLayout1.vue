<template>
<div id="footer" class="pcfooter">
  <div class="footbg">
    <div class="footerMain">
        <div class="footerBotttom">
          <div class="footerLeft">
              <ul v-for="(n,index) in footerMenus" :key="index">
                <li v-show="index!==4 && index!==5">
                    <a href="javascript:;" v-if="n.Type === 0" @click="toUrl(n)"><span>{{n.Name}}</span></a>
                    <router-link :to="To(n)"  v-else><span>{{n.Name}}</span></router-link>
                  <ul>
                    <li v-for="(c,index2) in n.Childs" :key="index2">
                       <a href="javascript:;" v-if="c.Type === 0" @click="toUrl(c)">
                              {{c.Name}}
                        </a>
                       <router-link :to="To(c)" v-else>{{c.Name}}</router-link>
                    </li>
                  </ul>
                </li>
             </ul>
          </div>
          <div class="footerRight">
              <div class="footerLogo">
                  <p class="headerLogo"><img src="/images/mobile/mobile_23.jpg"></p>
                  <p class="shareLogo">
                    <a href="https://www.facebook.com/pibalancehk" target="_blank"><img src="/images/mobile/mobile_25.jpg"></a>
                    <a href="#" target="_blank"><img src="/images/mobile/mobile_24.jpg"></a>
                  </p>
              </div>
              <div class="footerAccept">
                <p class="text">{{$t('Message.Weaccept')}}</p>
                <p><img src="/images/mobile/mobile_26.jpg"></p>
              </div>
          </div>
        </div>
        <div class="footercopy">
          <p class="cpy">
            <router-link to="/cms/content/20297">{{$t('Message.PrivacyPolicy')}}</router-link>&nbsp;|&nbsp;<router-link to="/cms/content/20298">{{$t('Message.TermsAndConditions')}}</router-link>&nbsp;|&nbsp;
            <span>Copyright {{currentYear}} © sharpwell limited.powered by Intimex<img src="/images/pc/footerlogo.png"></span>
           </p>
        </div>
    </div>
  </div>
</div>

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class InsFooterLayout1 extends Vue {
  currentYear: number = 0;
  footerMenus: any[] = [];
  content:string='';
  goToTop () {
    let sTop = document.documentElement.scrollTop;
    let times = setInterval(() => {
      sTop -= 50;
      if (sTop <= 0) {
        document.documentElement.scrollTop = 0;
        clearInterval(times);
      } else {
        document.documentElement.scrollTop = sTop;
      }
    }, 1);
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
  getMenu () {
    this.$Api.promotion.getMenu().then((result) => {
      this.footerMenus = result.ReturnValue.FooterMenus;
    });
  }
  getContent () {
    this.$Api.cms.getContentByDevice({ Key: 'ContactUs', IsMobile: true }).then(result => {
      this.content = result.CMS;
    });
  }
  created () {
    var date = new Date();
    this.currentYear = date.getFullYear();
    this.getMenu();
    this.getContent();
  }
}
</script>
<style lang="less">
.pcfooter{
  .contactBox{
    .HeadTitle{
      color:#b2b2b2;
      font-size: 16px;
      margin-bottom: 20px;
      margin-top: 10px;
    }
    .TitleA{
      font-weight: 700;
      color:#fff;
      font-size: 16px;
      text-transform: uppercase;
    }
    .TitleB{
      color:#b2b2b2;
      font-size: 16px;
      margin-top: 10px;
      line-height: 25px;
    }
    .lineBottom{
      height: 20px;
    }
  }
}
</style>
<style scoped lang="less">
/* 底部文件 */
.footbg{
    background: #333333;
    background-size: cover;
    width: 100%;
    display: inline-block;
    padding-bottom: 10px;
}
.footerMain{
    width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    padding-top: 30px;
    padding-bottom: 20px;
}
.footerTop{
    text-align: center;
    padding-top: 25px;
    padding-bottom: 25px;
    width: 100%;
}
.footerTop p{
    text-align: center;
    display: inline-block;
    margin-right: 50px;
}
.footerTop p span{
    font-size: 14px;
    color: #FFF;
    line-height: 35px;
    margin-right: 15px;
}
.footerTop p b{
    font-weight: 100;
    font-size: 35px;
    color: #FFF;
    line-height: 35px;
}
.footerBotttom{
    width: 100%;
    position: relative;
}
.footerLeft{
    float: left;
    width: 50%;
}
.footerLeft > ul{
    float: left;
    width: 25%;
}
.footerLeft > ul >li{
    width: 100%;
    line-height: 30px;
}
.footerLeft > ul >li >a{
    font-size:16px;
    color:#FFF;
    font-weight: 700;
    text-transform: uppercase;
}
.footerLeft > ul >li >ul{
  width: 100%;
}
.footerLeft > ul >li >ul a{
    font-size: 14px;
    color:#b2b2b2;
    display: inline-block;
}
.footerLeft > ul >li >ul a:hover{
   text-decoration: underline;
   color: #fff;;
}
.footerRight{
  width: 30%;
  float: left;
  margin-left: 20%;
    .footerLogo{
      width: 90%;
      margin: 0 auto;
      display:  flex;
      flex-wrap: wrap;
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
        text-align: left;
        font-size: 14px;
        color: #999999;
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
}
.footerLeft p{
    width: 100%;
    display: block;
    font-size: 14px;
    color: #fff;
    padding-top: 20px;
}
.footerLeft p img{
    display: inline-block;
    vertical-align: middle;
    padding-left: 10px;
}
.footercopy{
  width: 100%;
  display: inline-block;
  text-align: center;
  color: #999999;
  margin-top: 50px;
  .cpy {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  span{
    color: #999999;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    img{
      margin-left: 5px;
      width: 15px;
    }
  }
  a{
    color: #999999;
    font-size: 14px;
    &:hover{
      color:#999999;
      text-decoration: underline;
    }
  }
}
</style>
