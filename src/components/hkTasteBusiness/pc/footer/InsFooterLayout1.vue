<template>
<div id="footer" class="pcfooter">
  <div class="footbg">
    <div class="footerMain">
        <div class="footerBotttom">
          <div class="footerNav">
              <ul v-for="(n,index) in footerMenus" :key="index">
                <li>
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
          <div class="footerBottom">
              <div class="footerLogo">
                  <p class="headerLogo"><img src="/images/pc/pclogo.png"></p>
                  <div class="ContentList">
                    <ul>
                        <li v-for="(v,index) in ContentList" :key="index"><router-link :to="'/cms/content/'+v.Id">{{v.Title}}</router-link></li>
                    </ul>
                </div>
              </div>
              <div class="footerAccept">
                  <p class="text">{{$t('Message.Weaccept')}}</p>
                  <p style="margin-bottom:.5rem"><img src="/images/mobile/mobile_16.jpg"></p>
                  <p class="text">{{$t('Message.LatestTrends')}}</p>
                  <div class="LatestTrends">
                    <a href="" target="_blank"><img src="/images/mobile/mobile_18.jpg"></a>
                    <a href="" target="_blank"><img src="/images/mobile/mobile_17.jpg"></a>
                </div>
              </div>
          </div>
        </div>
    </div>
  </div>
  <div class="footercopy">
    <p class="cpy">
      <span>Copyright {{currentYear}} Classic Trading Company.powered by Intimex</span><a href="https://www.intimex.hk/" target="_blank"><img src="/images/pc/footerlogo.png"></a>
      </p>
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
  currentPage: number = 1; // 当前页
  pageSize: number = 3; // 每页显示条目个数
  ContentList:any[]=[];
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
    this.getContentsList();
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
        .ContentList{
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
              height: 40px;
              margin-right: 2%;
              border-radius: .3rem;
              a{
                color:#cfd6e6;
                font-size: 16px;
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
/* 底部文件 */
.footbg{
    background: #3d475f;
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
.footerNav{
    width: 100%;
    display: inline-block;
}
.footerNav > ul{
    float: left;
    width: 9.5%;
    margin-right: 0.55%;
    &:last-child {
      margin-right: 0px!important;
    }
}
.footerNav > ul >li{
    width: 100%;
    line-height: 20px;
}
.footerNav > ul >li >a{
    font-size:16px;
    color:#FFF;
}
.footerNav > ul >li >a >span{
    height: 40px;
   display: block;
}
.footerNav > ul >li >ul{
  width: 100%;
}
.footerNav > ul >li >ul a{
    font-size: 14px;
    color:#cfd6e6;
    display: inline-block;
    padding-bottom: 10px;
}
.footerNav > ul >li >ul a:hover{
   text-decoration: underline;
   color: #fff;;
}
.footerBottom{
  width: 100%;
  display: inline-block;
  margin-top: 50px;
    .footerLogo{
      width: 40%;
      float: left;
      display:  flex;
      flex-wrap: wrap;
      .headerLogo{
        margin-bottom: 20px;
        img{
          width:305px;
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
      width: 40%;
      float: right;
      display:  flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-start;
      .text{
        text-align: left;
        font-size: 16px;
        color: #cfd6e6;
        margin-bottom: .5rem;
        width: 100%;
      }
      .LatestTrends {
        a {
          width: 30px;
          height: 30px;
          display: inline-block;
          img{
            width: 100%;
          }
        }
      }
      >p{
        img{
          display: block;
          width: 100%;
        }
      }
    }
}
.footerNav p{
    width: 100%;
    display: block;
    font-size: 14px;
    color: #fff;
    padding-top: 20px;
}
.footerNav p img{
    display: inline-block;
    vertical-align: middle;
    padding-left: 10px;
}
.footercopy{
  width: 100%;
  display: inline-block;
  text-align: center;
  color: #a1b0bc;
  background: #31394d;
  padding-top: 20px;
  padding-bottom: 20px;
  .cpy {
    display: flex;
    align-items: center;
    justify-content: center;
    a {
      display: inline-block;
      margin-left: 5px;
    }
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
