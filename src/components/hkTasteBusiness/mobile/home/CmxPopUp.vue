<template>
  <div class="PopUp">
    <div class="contentMain">
      <!-- <div class="PopupFixed"><span @click="closeEvent"><i class="el-icon-close"></i></span></div> -->
      <p class="title">{{content.Desc}}</p>
      <div class="body" v-html="content.Body"></div>
      <div class="FooterBtn" v-show="footshow">
          <span @click="agree">{{$t('Message.Close')}}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class CmxPopUp extends Vue {
  content: object = {};
  agreeBtn:string='';
  declineBtn:string='';
  footshow:boolean=false;
  // 获取关于我们cms内容方法
  getContent () {
    this.$Api.cms
      .getContentByDevice({ Key: 'Homepopup', IsMobile: true })
      .then(result => {
        this.content = result.CMS;
      });
  }
  closeEvent () {
    this.$emit('closeEvent');
  }
  agree () {
    this.$emit('agree');
  }
  mounted () {
    this.getContent();
    setTimeout(() => {
      this.footshow = true;
    }, 2000);
  }
}
</script>

<style lang="less" scoped>
.PopupFixed{
    position: fixed;
    width: 85%;
    background: #FFF;
    padding-top: 2rem;
    padding-bottom: 2rem;
    z-index: 99;
    span{
        position: absolute;
        right: 1.5rem;
        cursor: pointer;
        top: 1.5rem;
          i{
            font-size: 1.8rem;
          }
       }
}
.PopUp {
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgba(61, 71, 95, 0.7);
    left: 0px;
    top: 0px;
    right: 0px;
    bottom: 0px;
    z-index: 9999999;
    display: flex;
    align-items: center;
    justify-content: center;
  .contentMain {
    width: 85%;
    margin: 0 auto;
    background: #FFF;
    border-radius: 5px;
    height:300px;
    overflow-x: auto;
    position: relative;
    .title {
      font-size: 1.8rem;
      color: #3d475f;
      text-align: center;
      position: relative;
      padding-top: 2rem;
      padding-bottom: 2rem;
      font-weight: 700;
    }
    .FooterBtn {
      text-align: center;
      padding-bottom: 30px;
      span{
        width: 10rem;
        height: 3rem;
        display: block;
        font-size: 1.4rem;
        line-height: 3rem;
        background: #3d475f;
        border-radius: .2rem;
        color: #fff;
        margin: auto;
        margin-bottom: 1rem;
      }
     }
    .body {
      padding: 2rem;
      padding-top: 0px;
      /deep/ p {
        font-size: 1.4rem;
        color: #999999;
        line-height: 2rem;
        text-align: justify;
        font-weight: 100;
        word-break: break-word;
      }
    }
  }
}
</style>
