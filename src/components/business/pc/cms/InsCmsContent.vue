<template>
  <div id="container" class="pcContact">
    <!-- 联络我们页面 -->
    <div class="Cmsbg contactMain" v-if="NewcateId=='40112'">
      <transition name="slide">
        <div key="1" v-if="!waiting" style="display:flex;">
           <div class="DetailTitle"><img :src="ImgList" v-show="ImgList!==null">
           <div class="innerBox">
                <div class="TitleBg"><div class="innerBoxText">{{TitleName}}</div></div>
           </div>
          </div>
      </div>
      </transition>
      <transition name="slide">
        <div class="faker" key="2" v-if="waiting" v-loading="true"></div>
      </transition>
      <!-- 表单信息 -->
      <div class="contactContainer">
        <div class="contactLeft">
            <p v-html="content.Body"></p>
        </div>
        <div class="contactRight">
            <p class="TitleName"><span>{{FormTitle}}</span></p>
            <div v-html="htmlString" class="to_vertical" id="content"></div>
            <div id="preview" style="display:none;"></div>
        </div>
      </div>
      <div class="CmsMap">
            <p v-html="MapInfo" class="MapInfo"></p>
      </div>
    </div>
    <!-- 其他页面 -->
    <div class="CmsNormal" v-if="NewcateId!='40112'">
      <transition name="slide">
        <div key="1" v-if="!waiting" style="display:flex;">
           <div class="DetailTitle"><img :src="ImgList" v-show="ImgList!==null">
           <div class="innerBox">
                <div class="TitleBg"><div class="innerBoxText">{{TitleName}}</div></div>
           </div>
          </div>
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
  LoadScript (src) {
    const oScript = document.createElement('script');
    oScript.type = 'text/javascript';
    oScript.src = src;
    document.body.appendChild(oScript);
  }
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
    this.LoadScript('/static/js/CanvasSigner.js');
    this.LoadScript('/static/js/ajaxFileUpload.js');

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
.pcContact .contactRight{
  #preview{
    width: 80%;
    float:left;
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
      margin-left: 10px;
      cursor: pointer;
      outline: 0;
    }
    .confirm{
      background: #868f95;
      color:#FFF;
      padding:10px 20px 10px 20px;
      border:none;
      margin-top: 30px;
      cursor: pointer;
      outline: 0;
    }
  }
}
.pcContact{
    .CmsNormal{
      p{
        font-size: 16px;
        line-height: 25px;
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
    width:90%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    .contactBox {
      .text{
        font-size: 16px;
        color: #666666;
        margin-bottom: 40px;
        text-align: left;
      }
      .title{
        font-size: 18px;
        color: #333;
        margin-bottom: .5rem;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-weight: 700;
        text-transform: uppercase;
        .icon1{
          background: url('/images/mobile/mobile_07.jpg') no-repeat center center;
          background-size: contain;
          width: 30px;
          height: 30px;
          display: inline-block;
          vertical-align:middle;
          margin-right: .5rem;
        }
        .icon2{
          background: url('/images/mobile/mobile_08.jpg') no-repeat center center;
          background-size: contain;
          width: 30px;
          height: 30px;
          display: inline-block;
          vertical-align:middle;
          margin-right: .5rem;
        }
        .icon3{
          background: url('/images/mobile/mobile_09.jpg') no-repeat center center;
          background-size: contain;
          width: 30px;
          height: 30px;
          display: inline-block;
          vertical-align:middle;
          margin-right: .5rem;
        }
        .icon4{
          background: url('/images/mobile/mobile_10.jpg') no-repeat center center;
          background-size: contain;
          width: 30px;
          height: 30px;
          display: inline-block;
          vertical-align:middle;
          margin-right: .5rem;
        }
      }
    }
    .lineBottom{
      width: 100%;
      height: 2rem;
    }
  }
}
.pcContact .CmsMap .MapInfo{
  width:100%;
  iframe{
    width:100%;
    height: 30rem;
  }
  img{
    width:100%;
  }
}
.pcContact {
.contactRight{
  width:90%;
  margin:0 auto;
  position: relative;
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
      background-size: 100% 100%;
      display: inline-block;
      height: 2rem;
      text-align: center;
      line-height: 2rem;
      font-size: 16px;
      margin-bottom: .5rem;
      color:#999;
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
      font-size: 16px;
    }
    textarea{
      border:1px solid #e6e6e6;
      height: 190px;
      width: 100%;
      box-sizing: border-box;
      border-radius: 3px;
      margin-bottom: .5rem;
      outline: none;
      font-size:16px;
    }
    p[name="error"]{
      color:red;
      margin-bottom:.5rem;
    }
    .btn-default{
      width: 100%;
      background: #868f95;
      border:1px solid #868f95!important;
      color:#fff!important;
      height: 50px;
      line-height: 50px;
      color:#fff;
      background-size: 100%;
      border:none;
      margin-top: 1rem;
      font-size: 22px;
      margin-bottom: 5rem;
      border-radius: 2rem;
      text-transform: uppercase;
      font-weight: 700;
      outline: 0;
      cursor: pointer;
      &:hover{
        background: @base_color;
      }
    }
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
    font-size: 18px;
    font-weight: 700;
    color:#333333!important;
    padding-left: 40px;
  }
  &::before{
    content: '';
    width: 30px;
    height: 30px;
    background: url('/images/mobile/mobile_11.jpg') no-repeat center center;
    display: inline-block;
    margin-right: 1rem;
    position: absolute;
    vertical-align: middle;
  }
}
.DetailTitle{
  width: 100%;
  display: flex;
  flex-wrap:wrap;
  position: relative;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  img{
    width: 100%;
  }
  .innerBox{
    width: 1200px;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    height: 100%;
    z-index: 10;
  }
  .TitleBg{
    background: rgba(89,97,100,.5);
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    width: 220px;
    height: 100%;
    .innerBoxText{
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 30px;
      font-weight: 700;
      font-family: 'Arial';
      line-height: 3rem;
      text-transform: uppercase;
      text-align: center;
      padding: 2rem;
    }
  }
}
.CmsNormal{
  width: 100%;
  display: inline-block;
  background: #FFF;
}
.contactContainer{
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  margin-top: 50px;
  .contactLeft{
    width: 40%;
    float: left;
    margin-right: 10%;
  }
  .contactRight{
    width: 50%;
    float: left;
  }
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
    padding-top: 2rem;
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
