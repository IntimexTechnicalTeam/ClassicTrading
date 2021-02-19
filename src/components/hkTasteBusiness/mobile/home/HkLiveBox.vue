<template>
  <div class="liveBox mobileVersion">
    <div class="AboutUs"  :style="{'background-image': 'url('+ImagePath+')'}">
        <p class="AboutTitle wow fadeIn" data-wow-delay="0.3s"><img src="/images/mobile/mobile_26.png"><span :class="{'TextCn':currentlang=='C'}">{{AboutName}}</span></p>
        <p class="AboutContent wow fadeIn" v-html="AboutContent"  data-wow-delay="0.3s"></p>
        <router-link to="/CMS/content/20295" class="learnMore wow fadeIn" data-wow-delay="0.3s">{{$t('Message.ViewDetail')}}</router-link>
    </div>
    <div class="liveBox_in">
        <div class="fbcontent wow fadeInLeftBig"  data-wow-delay="0.3s">
           <p v-html="videoContent"></p>
        </div>
        <div class="fbcontent wow fadeInRightBig"  data-wow-delay="0.3s">
           <p v-html="fbContent"></p>
        </div>
    </div>
    <p class="ProductTitle wow fadeIn" data-wow-delay="0.3s"><img src="/images/mobile/mobile_07.png"><span :class="{'TextCn':currentlang=='C'}">{{CatName}}</span></p>
    <div class="contactMain wow fadeIn" data-wow-delay="0.3s">
        <p v-html="contactContent.Body"></p>
    </div>
    <div class="MapInfo">
        <p v-html="MapInfo"></p>
    </div>
  </div>
</template>
<script lang="ts" scoped>
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class PkLiveBox extends Vue {
  videoContent:string='';
  fbContent:string='';
  contactContent:string='';
  MapInfo:string = '';
  CatName:string = '';
  currentPage: number = 1; // 当前页
  pageSize: number = 2; // 每页显示条目个数
  ContentList:any[]=[];
  AboutName:string='';
  AboutContent:string='';
  ImagePath:string='';
  getFbContent () {
    this.$Api.cms.getContentByDevice({ Key: 'Facebook', IsMobile: true }).then(result => {
      this.fbContent = result.CMS.Body;
    });
  }
 getVideoContent () {
    this.$Api.cms.getContentByDevice({ Key: 'Youtube', IsMobile: true }).then(result => {
      this.videoContent = result.CMS.Body;
    });
  }
  get currentlang () {
    return this.$i18n.locale;
  }
  getContactBox () {
    this.$Api.cms.getContentByDevice({ Key: 'contactus', IsMobile: true }).then(result => {
      this.contactContent = result.CMS;
      this.getCategoryByDevice(result.CMS.CatId);
    });
  }
  getAboutus () {
    this.$Api.cms.getCategoryByDevice({ Key: 'About', IsMobile: true }).then(async (result) => {
      this.AboutContent = result.Content;
      this.AboutName = result.Name;
      this.ImagePath = result.ImagePath;
      this.$store.dispatch('setHkLiveBox', this.AboutName);
    }).catch((error) => {
      this.$message({
        message: error,
        type: 'error'
      });
    });
  }
    // 根据设备类型获取CMSCategory信息
  getCategoryByDevice (cateId) {
    this.$Api.cms.getCategoryByDevice({ CatId: cateId, IsMobile: true }).then(async (result) => {
      this.MapInfo = result.Content;
      this.CatName = result.Name;
    }).catch((error) => {
      this.$message({
        message: error,
        type: 'error'
      });
    });
  }
  // getContentsList() {
  //     var params = {
  //       Key: 'HomeRelated',
  //       Page: this.currentPage,
  //       PageSize: this.pageSize
  //     };
  //     this.$Api.cms.getContentsByCatKeyEx(params).then((result) => {
  //       result.Data.forEach((item) => {
  //           if (item.Key === 'Youtube') {
  //               this.videoContent = item.Body;
  //           }
  //           if (item.Key === 'Facebook') {
  //               this.fbContent = item.Body;
  //           }
  //       });
  //     });
  //   }
  created () {
    this.getFbContent();
    this.getVideoContent();
    this.getContactBox();
    this.getAboutus();
  }
  get lang () {
    return this.$Storage.get('locale');
  }
}
</script>
<style  lang="less">
.mobileVersion{
  .MapInfo{
    width: 100%;
    display: inline-block;
    margin-top: 2rem;
    img{
      width: 100%;
    }
  }
  .liveBox_in{
    width: 90%;
    margin: 0 auto;
    padding-top:1rem;
    margin-bottom: 2rem;
      img{
        width: 100%;
      }
    }
  .contactMain{
    width:90%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    margin-top: 3rem;
    .contactBox {
      .titleA{
        font-size: 1.6rem;
        color:#3d4364;
        text-align: center;
        font-weight: 700;
        margin-bottom: 1rem;
      }
      .titleB {
        font-size: 1.5rem;
        color:#838a97;
        margin-bottom: 2rem;
        text-align: center;
      }
    }
  }
}
</style>
<style scoped lang="less">
.AboutUs {
  background-size: cover;
  padding-top: 3rem;
  padding-bottom: 3rem;
  padding-left: 5%;
  padding-right: 5%;
  .AboutContent {
    margin-top: 2rem;
    /deep/ p {
      color:#fff;
      font-size: 1.4rem;
      line-height: 2.5rem;
    }
  }
  .learnMore {
      width: 50%;
      margin: 0 auto;
      display: flex;
      height: 3.5rem;
      background: #fff;
      margin-top: 2rem;
      border-radius: .2rem;
      align-items: center;
      justify-content: center;
      font-size: 1.4rem;
      color:#3d475f;
    }
}
.liveBox {
    width: 100%;
    background-size: 100% 100%;
    display: flex;
    padding-top: 2rem;
    flex-wrap: wrap;
}
.fbcontent {
  margin-bottom: 1rem;
}
.AboutTitle{
    font-size: 1.6rem;
    text-transform: uppercase;
    margin-bottom: 1rem;
    height: 3rem;
    width: 90%;
    margin: 0 auto;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    img{
      width: 100%;
    }
    span{
      position: absolute;
      bottom: 20%;
      left:50%;
      transform: translate(-50%);
      text-align: center;
      font-size:1.4rem;
      font-weight: 700;
      width: 10rem;
      color:#fff;
    }
  }
  .ProductTitle{
    font-size: 1.6rem;
    text-transform: uppercase;
    margin-bottom: 1rem;
    height: 3rem;
    width: 81%;
    margin: 0 auto;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    img{
      width: 100%;
    }
    span{
      position: absolute;
      bottom: 20%;
      left:50%;
      transform: translate(-50%);
      text-align: center;
      font-size:1.4rem;
      font-weight: 700;
      width: 10rem;
    }
  }
.TextCn{
  font-size: 2rem!important;
  bottom: 10%!important;
}
</style>
