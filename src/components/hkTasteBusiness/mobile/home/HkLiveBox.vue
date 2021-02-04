<template>
  <div class="liveBox mobileVersion">
    <div class="liveBox_in">
        <p class="ProductTitle"><i class="productIcon"></i>{{$t('Message.LatestTrends')}}</p>
        <div class="fbcontent">
           <p v-html="fbContent.Body"></p>
        </div>
    </div>
    <div class="contactMain">
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
  MapInfo:string='';
  getFbContent () {
    this.$Api.cms.getContentByDevice({ Key: 'Facebook', IsMobile: true }).then(result => {
      this.fbContent = result.CMS;
    });
  }
  getContactBox () {
    this.$Api.cms.getContentByDevice({ Key: 'ContactUs', IsMobile: true }).then(result => {
      this.contactContent = result.CMS;
      this.getCategoryByDevice(result.CMS.CatId);
    });
  }
    // 根据设备类型获取CMSCategory信息
  getCategoryByDevice (cateId) {
    this.$Api.cms.getCategoryByDevice({ CatId: cateId, IsMobile: true }).then(async (result) => {
      this.MapInfo = result.Content;
    }).catch((error) => {
      console.log(error, 'error');
      this.$message({
        message: error,
        type: 'error'
      });
    });
  }
  created () {
    this.getFbContent();
    this.getContactBox();
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
    .contactBox {
      .text{
        font-size: 1.6rem;
        color: #666666;
        margin-bottom: 1.5rem;
        text-align: center;
      }
      .title{
        font-size: 1.6rem;
        color: #333;
        margin-bottom: .5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        text-transform: uppercase;
        .icon1{
          background: url('/images/mobile/mobile_07.jpg') no-repeat center center;
          background-size: contain;
          width: 3rem;
          height: 3rem;
          display: inline-block;
          vertical-align:middle;
          margin-right: .5rem;
        }
        .icon2{
          background: url('/images/mobile/mobile_08.jpg') no-repeat center center;
          background-size: contain;
          width: 3rem;
          height: 3rem;
          display: inline-block;
          vertical-align:middle;
          margin-right: .5rem;
        }
        .icon3{
          background: url('/images/mobile/mobile_09.jpg') no-repeat center center;
          background-size: contain;
          width: 3rem;
          height: 3rem;
          display: inline-block;
          vertical-align:middle;
          margin-right: .5rem;
        }
        .icon4{
          background: url('/images/mobile/mobile_10.jpg') no-repeat center center;
          background-size: contain;
          width: 3rem;
          height: 3rem;
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
</style>
<style scoped lang="less">
.liveBox {
    width: 100%;
    background: #fbfbfb;
    background-size: 100% 100%;
    display: flex;
    padding-top: 2rem;
    flex-wrap: wrap;
}
.ProductTitle{
   font-size: 1.6rem;
   font-weight: 700;
   text-transform: uppercase;
   margin-bottom: 1rem;
    .productIcon {
        background: url('/images/mobile/mobile_15.jpg') no-repeat center center;
        width: 1.5rem;
        height: 1.5rem;
        background-size: 1.5rem;
        display: inline-block;
        margin-right: .5rem;
        vertical-align: middle;
    }
 }
</style>
