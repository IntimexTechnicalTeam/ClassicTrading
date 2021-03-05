<template>
  <div id="container" class="pcContact">
    <!-- 联络我们页面 -->
    <div class="Cmsbg contactMain" v-if="NewcateId=='40112'">
      <transition name="slide">
        <div key="1" v-if="!waiting" style="display:flex;">
              <div class="DetailTitle"><img :src="OtherPageImg" v-show="OtherPageImg!==null"><div class="TitleBg"><div class="innerBoxText"><img src="/images/mobile/mobile_37.png">
              <span class="borderName" :class="{'TextCn':currentlang=='C'}">{{TitleName}}</span></div></div></div>
      </div>
      </transition>
      <transition name="slide">
        <div class="faker" key="2" v-if="waiting" v-loading="true"></div>
      </transition>
      <!-- 表单信息 -->
      <div class="innerBox">
          <div class="CmsContent leftside">
              <p v-html="content.Body"></p>
              <p v-html="MapInfo" class="MapInfo"></p>
          </div>
          <div class="FormMain rightside">
              <p class="TitleName"><span>{{FormTitle}}</span></p>
              <div v-html="htmlString" class="to_vertical" id="content"></div>
              <div id="preview" style="display:none;"></div>
          </div>
      </div>
    </div>
    <!-- 其他页面 -->
    <div class="CmsNormal" v-if="NewcateId!='40112'">
      <transition name="slide">
        <div key="1" v-if="!waiting" style="display:flex;">
              <div class="DetailTitle"><img :src="OtherPageImg" v-show="OtherPageImg!==null"><div class="TitleBg"><div class="innerBoxText"><img src="/images/mobile/mobile_37.png">
              <span class="borderName" :class="{'TextCn':currentlang=='C'}">{{TitleName}}</span></div></div></div>
      </div>
      </transition>
      <transition name="slide">
        <div class="faker" key="2" v-if="waiting" v-loading="true"></div>
      </transition>
      <div class="CmsContent">
        <p v-html="content.Body"></p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { FrontE } from '@/sdk/common/SysConst';
import Cookie from 'js-cookie';
@Component({
  components: {
    PkcmsBanner: () => import('@/components/hkTasteBusiness/mobile/cms/PkcmsBanner.vue')
  }
})
export default class InsCmsContent extends Vue {
  NewsNav: string = 'NewsNav';
  CateName: string = '';
  CateDesc: string = '';
  content: any[] = [];
  FormContent:any='';
  private ImgList: string[] = [];
  private ispic:boolean=false;
  IsPay:boolean= false;
  IsLogin:boolean=false;
  IsMobile:boolean=true;
  MapInfo:string='';
  ShopList:any[]=[];
  cindex:number=0;
  private htmlString: string = '';
  Signer: any = null;
  FormTitle:string='';
  NewcateId:string='';
  private waiting: boolean = true;
  OtherPageImg:string='';
  TitleName:string='';
  // 引入外部js
  showContent (val, index) {
    this.$Api.cms.getContentByDevice({ ContentId: val, IsMobile: false }).then(result => {
      this.MapInfo = result.CMS.Body;
      this.cindex = index;
    });
  }
  get currentlang () {
    return this.$Storage.get('locale');
  }
  get id () {
    return this.$route.params.id;
  }
  getForm () {
    this.$Api.regAndPay.getHtml('ContactUs', this.lang, false).then(result => {
      this.htmlString = result.HtmlString;
      this.FormTitle = result.Title;
      this.$nextTick(() => {
        if (document.querySelectorAll('#Sign').length > 0) {
          this.Signer = new intimex.CanvasSigner('#NewSignCanvas', '#Signature', {
            color: '#58B63A',
            width: 5
          });
          this.Signer.initCanvas();

          window['Signer'] = this.Signer;
        }
      });
    });
  }
  getContent () {
    this.$Api.cms.getContentByDevice({ ContentId: this.id, IsMobile: false }).then(result => {
      this.content = result.CMS;
      this.TitleName = result.CMS.Title;
      this.OtherPageImg = result.CMS.Cover;
      this.NewcateId = result.CMS.CatId;
      this.getCategoryByDevice(result.CMS.CatId);
      this.CateDesc = result.CMS.Desc;
      this.waiting = false;
      if (result.CMS.Title) document.title = result.CMS.Title;
    });
  }
  // 根据设备类型获取CMSCategory信息
  getCategoryByDevice (cateId) {
    this.$Api.cms.getCategoryByDevice({ CatId: cateId, IsMobile: false }).then(async (result) => {
      this.ImgList = result.ImagePath;
      this.MapInfo = result.Content;
      this.CateName = result.Name;
      this.waiting = false;
    }).catch((error) => {
      console.log(error, 'error');
      this.$message({
        message: error,
        type: 'error'
      });
    });
  }
  get lang () {
    return this.$Storage.get('locale');
  }
  get queryLang () {
    return this.$route.query.Lang || '';
  }
  Regnay () {
    window['jsData'] = {
      HasPreview: true,
      UploadButtonText: this.$t('RegNPay.UploadButtonText'),
      UploadingText: this.$t('RegNPay.UploadingText'),
      UploadSuccessfulText: this.$t('RegNPay.UploadSuccessfulText'),
      UploadFailText: this.$t('RegNPay.UploadFailText'),
      NoFileText: this.$t('RegNPay.NoFileText'),
      UploadLengthText: this.$t('RegNPay.UploadLengthText'),
      UploadSizeText: this.$t('RegNPay.UploadSizeText'),
      BackText: this.$t('RegNPay.BackText'),
      ConfirmText: this.$t('RegNPay.ConfirmText'),
      PleaseSelect: this.$t('RegNPay.PleaseSelect'),
      PreviewTitleText: this.$t('RegNPay.PreviewTitleText'),
      RequiredText: this.$t('RegNPay.RequiredText'),
      FormatErrorText: this.$t('RegNPay.FormatErrorText'),
      Version: '2.0',
      HasRNPConfirm: false
    };
    this.$LoadScript('/static/js/CanvasSigner.js');
    this.$LoadScript('/static/js/ajaxFileUpload.js');

    document.dispatchEvent(new Event('rnpFinshed'));

    // RNP Form后台预览跳转语言判断
    if (this.queryLang) {
      this.$Api.member.setUILanguage(this.queryLang).then((result) => {
        this.$i18n.locale = this.queryLang as string;
        localStorage.setItem('locale', this.queryLang as string);
        Cookie.set('uLanguage', this.queryLang);
        this.getForm();
      }).catch((error) => {
        console.log(error);
      });
    } else {
      this.getForm();
    }
  }
  created () {
    this.getContent();
    this.Regnay();
  }
  mounted () {
    window['regAndPay'] = this.$Api.regAndPay;
    window['router'] = this.$router;
    window['Elalert'] = this.$alert;
  }
  @Watch('$route', { deep: true })
  onIdChange () {
    this.getContent();
  }
}
</script>
<style lang="less">
.pcContact .FormMain{
  #preview{
    width: 80%;
    float:right;
    .anwer{
      margin-bottom: 20px;
    }
    .back{
      background: #ccc;
      color:#FFF;
      padding:10px 20px 10px 20px;
      border:none;
      margin-right: 20px;
      margin-top: 30px;
    }
    .confirm{
      background: #333;
      color:#FFF;
      padding:10px 20px 10px 20px;
      border:none;
      margin-top: 30px;
    }
  }
}
.pcContact{
    .CmsNormal{
      p{
        font-size:18px;
        line-height: 30px;
        color: #333333;
        word-break: break-word;
      }
    }
}
.pcContact .activeColor .content p:nth-child(1){
    text-decoration: underline;
    font-weight: 700;
}
.pcContact .aboutBg{
    width: 80%;
    background-size: 100%;
    min-height: 65rem;
    padding: 10%;
    word-break: break-all;
}
.pcContact .abooutImg{
    width: 70%;
    margin: 0 auto;
    margin-bottom: 1rem;
    img{
      width: 100%;
    }
}
.pcContact {
  .contactMain{
      width: 100%;
      display: inline-block;
    .innerBox{
      width: 1200px;
      margin: 0 auto;
      .leftside{
        width: 45%;
        float: left;
        margin-right: 5%;
      }
      .rightside {
        width: 50%;
        float: left;
      }
    }
    .MapInfo {
      /deep/ p {
        img{
          width: 100%;
        }
      }
    }
    .contactBox {
      .titleA{
        font-size: 20px;
        color:#3d4364;
        text-align: center;
        font-weight: 700;
        margin-bottom: 15px;
      }
      .titleB {
        font-size: 20px;
        color:#838a97;
        margin-bottom: 38px;
        text-align: center;
      }
    }
  }
}
.pcContact .CmsMap .MapInfo{
  width:100%;
  margin-bottom: 1rem;
  iframe{
    width:100%;
    height: 30rem;
  }
  img{
    width:100%;
  }
}
.pcContact .FormMain{
  width:90%;
  margin:0 auto;
  position: relative;
  padding-top: 3rem;
  .FormTitle{
    font-size: 2.5rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    color:#333333;
  }
  .FormImg{
    position: absolute;
    right: 0px;
    top:3rem;
    width: 20%;
    img{
      width: 100%;
    }
  }
  .form-group{
    h4{
      background: #fff;
      display: inline-block;
      text-align: center;
      line-height: 25px;
      font-size: 20px;
      margin-bottom: .5rem;
      color:#838a97;
      font-weight: 500;
    }
    input[type="text"],input[type="email"]{
      border:1px solid #e6e6e6;
      height: 40px;
      line-height: 40px;
      width: 100%;
      box-sizing: border-box;
      border-radius: 3px;
      margin-bottom: .5rem;
      text-indent: 1rem;
      outline: none;
      font-size: 20px;
    }
    textarea{
      border:1px solid #e6e6e6;
      height: 10rem;
      width: 100%;
      box-sizing: border-box;
      border-radius: 3px;
      margin-bottom: .5rem;
      outline: none;
      font-size: 20px;
    }
    p[name="error"]{
      color:red;
      margin-bottom:.5rem;
    }
    .btn-default{
      width: 100%;
      background: #838a97;
      border:1px solid #838a97!important;
      color:#fff!important;
      height: 50px;
      line-height:50px;
      color:#fff;
      background-size: 100%;
      border:none;
      margin-top: 1rem;
      font-size: 22px;
      margin-bottom: 5rem;
      border-radius: .2rem;
    }
  }
}
</style>
<style scoped lang="less">
.TitleName{
  margin-bottom: 2rem;
  line-height: 2rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  position: relative;
  span{
    text-align: left;
    font-size: 22px!important;
    color:#3d4364!important;
  }
}
.TextCn{
  font-size: 2rem!important;
   letter-spacing: 5px!important;
}
.DetailTitle{
  width: 100%;
  display: flex;
  flex-wrap:wrap;
  position: relative;
  align-items: center;
  justify-content: flex-start;
  img{
    width: 100%;
  }
  .TitleBg{
    width: 100%;
    position: absolute;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .innerBoxText{
      color: #fff;
      font-family: 'Arial';
      text-transform: uppercase;
      text-align: center;
      margin: 0 auto;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      .borderName{
        position: absolute;
        bottom: 40%;
        display: block;
        font-size: 30px;
        white-space: nowrap;
        letter-spacing: 2px;
      }
      img{
        width: 100%;
      }
    }
  }
}
.CmsNormal{
  width: 100%;
  display: inline-block;
  background: #FFF;
}
.cmsTitlebg{
    width: 50%;
    background: url(/images/mobile/contact_02.png) no-repeat center center;
    background-size: 100% 100%;
    display: flex;
    box-sizing: border-box;
    height: 6rem;
    align-items: center;
    justify-content: center;
    .p1{
      font-size: 1.5rem;
      width: 100%;
      text-align: center;
      font-weight: 700;
    }
    .p2{
      font-size: 1.2rem;
      text-align: center;
      color: #262626;
      font-weight: 600;
    }
}
.Cmsbg{
    width:100%;
    background-size: 100% 100%;
    display: inline-block;
    box-sizing: border-box;
    padding-bottom: 2rem;
    .borderline{
      height:1px;
      width: 100%;
      display: inline-block;
      background: #000;
   }
}
.Banner {
  width: 100%;
  height: 15rem;
  display:flex;
  align-items: center;
  position: relative;
}
.Banner img {
  width: 100%;
  height: 15rem;
}
#container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.CmsMap {
    width: 100%;
    display: flex;
}
.CmsContent{
  position: relative;
    width: 1200px;
    margin: 0 auto;
    padding-top: 3rem;
    padding-bottom: 2rem;
  .CmsMapImg{
    width: 20%;
    position: absolute;
    right: 0px;
    top:3rem;
    img{
      width: 100%;
    }
  }
}
.CmsMap
{
  position: relative;
  .addressIcon{
    width: 100%;
    font-size: 1.4rem;
    margin-bottom: 2rem;
    align-items: center;
    display: flex;
    i{
      background: url('/images/mobile/Mobile-Contact-05.png') no-repeat center center;
      background-size: 100% 100%;
      width:2.5rem;
      height:2.5rem;
      display: inline-block;
      margin-right:.5rem;
    }
  }
  .perList{
    margin-bottom:3rem;
    width:calc(100% - 3rem);
    padding-left: 3rem;
    p{
      font-size:1.4rem;
    }
  }
}
.clear {
  clear: both;
}
</style>
