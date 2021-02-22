<template>
  <div class="PopUp">
    <div class="contentMain">
      <!-- <div class="PopupFixed">
        <span @click="closeEvent"><i class="el-icon-close"></i></span>
      </div> -->
      <p class="title">{{ content.Desc }}</p>
      <div class="body" v-html="content.Body"></div>
      <div class="FooterBtn"  v-show="footshow">
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
  footshow:boolean=false;
  // 获取关于我们cms内容方法
  getContent () {
    this.$Api.cms
      .getContentByDevice({ Key: 'Homepopup', IsMobile: false })
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
[v-cloak]{
    display: none;
}
.PopupFixed {
  position: fixed;
  width: 900px;
  padding-top: 20px;
  padding-bottom: 20px;
  background: #fff;
  z-index: 99;
  span {
    position: absolute;
    right: 30px;
    cursor: pointer;
    top: 30px;
    i {
      font-size: 35px;
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
  display: block;
  padding-top:7.5%;
  .contentMain {
    width: 500px;
    margin-top: 100px;
    margin-bottom: 100px;
    margin: 0 auto;
    background: #fff;
    height: 350px;
    border-radius: 5px;
    .title {
      font-size: 40px;
      color: #3d475f;
      text-align: center;
      position: relative;
      padding-top: 60px;
      padding-bottom: 40px;
      font-weight: 700;
    }
    .FooterBtn {
      text-align: center;
      padding-bottom: 30px;
      span{
        width: 120px;
        display: inline-block;
        font-size: 20px;
        background: #3d475f;
        height: 40px;
        line-height: 40px;
        border-radius: 5px;
        color: #fff;
        margin-bottom: 20px;
        cursor: pointer;
        &:hover{
          transform: translateY(-3px);
        }
      }
    }
    .body {
      padding: 80px;
      padding-top: 0px;
      padding-bottom: 0px;
      /deep/ p {
        font-size: 16px;
        color: #999999;
        line-height: 30px;
        font-weight: 400;
      }
    }
  }
}
</style>
