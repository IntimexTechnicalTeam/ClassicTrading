<template>
  <div id="container">
    <div class="DetailTitle"><img :src="ImgList" v-show="ImgList!==null"><div class="TitleBg"><div class="innerBoxText"><img src="/images/mobile/mobile_37.png">
              <span class="borderName" :class="{'TextCn':currentlang=='C'}">{{$t('Forgetpassword.ForgetPassword')}}</span></div></div></div>
    <div class="ForgetPassMain">
      <div style="margin-top: 15px;" v-if="ResetPwd">
        <h2 class="ResetPwdTips">{{$t('Forgetpassword.ResetPwdTips')}}</h2>
        <ElForm
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="auto"
          class="demo-ruleForm"
        >
          <FormItem prop="UserEmail">
            <ElInput
              :placeholder="$t('Forgetpassword.LoginNameEmail')"
              v-model="ruleForm.UserEmail"
              prefix-icon="el-icon-message"
              clearable
            >
              <ElBotton
                slot="append"
                icon="el-icon-arrow-right"
                @click="SubmitForm"
              >{{$t('Forgetpassword.NextStep')}}</ElBotton>
            </ElInput>
          </FormItem>
        </ElForm>
      </div>
      <!-- 输入正确的Email后，弹窗 -->
      <div class="EmailSuccess" v-if="!ResetPwd">
        <p>
          <i class="el-icon-success"></i>
        </p>
        <p>{{$t('Forgetpassword.ResetPwdSuccess')}}</p>
        <p>{{$t('Forgetpassword.NotEmail')}}?</p>
        <p>
          <a
            @click="ResetReturn"
            :title="$t('Forgetpassword.ToReEnter')"
          >{{$t('Forgetpassword.ToReEnter')}}</a>
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import sdk from '@/sdk/InstoreSdk';
import { Form as ElForm, Input as ElInput, Message, FormItem, Button as ElBotton } from 'element-ui';

@Component({
  components: {
    InsBanner: () => import('@/components/base/mobile/InsBanner.vue'),
    ElForm,
    ElInput,
    FormItem,
    ElBotton
  }
})
export default class InsForgetPassword extends Vue {
  ResetPwd: boolean = true;
  ImgList:string='/images/mobile/mobile_02.jpg';
  ruleForm: any = {
    UserEmail: ''
  };
  ResetReturn () {
    this.ResetPwd = !this.ResetPwd;
    this.ruleForm.UserEmail = '';
  }
  get currentlang () {
    return this.$Storage.get('locale');
  }
  get rules () {
    return {
      UserEmail: [
        {
          required: true,
          message: this.$t('Forgetpassword.EnterEmail'),
          trigger: 'blur'
        },
        {
          type: 'email',
          message: this.$t('Forgetpassword.CorrectEmail'),
          trigger: ['blur', 'change']
        }
      ]
    };
  }
  // 检查表单
  SubmitForm (ruleForm) {
    let that = this;
    this.$nextTick(function () {
      (that.$refs.ruleForm as HTMLFormElement).validate(valid => {
        if (valid) {
          var that = this;
          sdk.api.member.resetPassword(that.ruleForm.UserEmail).then(
            function (success) {
              if (success) {
                that.ResetPwd = !that.ResetPwd;
              }
            },
            function (success) {
              Message({
                message: success.Message,
                type: 'error',
                customClass: 'NormalBg'
              });
            }
          );
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    });
  }
}
</script>
<style lang="less">
.NormalBg{
  z-index: 9999999!important;
  background: #ebe3e3!important;
  .el-message__content{
    color:#282828!important;
  }
  .el-icon-success{
    color:#282828!important;
  }
}
</style>
<style lang="less" scoped>
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
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
      position: relative;
       width: 40%;
      .borderName{
        position: absolute;
        bottom: 40%;
        white-space: nowrap;
        display: block;
        font-size: 1.8rem;
        letter-spacing: 2px;
      }
      img{
        width: 100%;
      }
    }
  }
}
.Banner {
  width: 100%;
  height: 15rem;
  display:flex;
  align-items: center;
  position: relative;
}
#container {
  width: 100%;
  display: inline-block;
  .forgetpsw_title{
    font-size: 2rem;
    line-height: 4rem;
    background-color: rgba(255, 255, 255, .5);
    text-align: center;
    margin-top: 2rem;
  }
}
.ForgetPassMain {
    width: 95%;
    margin: 0 auto;
    margin-top: 2rem;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
}
.ResetPwdTips {
    line-height: 2rem;
    text-align: left;
    font-size: 1.2rem;
    margin-bottom: 10px;
}
.EmailSuccess{
  text-align: center;
}
.EmailSuccess p {
  line-height: 2rem;
  font-size: 1.4rem;
}
.EmailSuccess p a {
    line-height: 2rem;
    font-size: 1.4rem;
    color: crimson;
    text-decoration: underline;
    cursor: pointer;
    padding-bottom: 3rem;
    display: block;
    padding-top: 1rem;
}
.EmailSuccess p i {
  font-size: 60px;
  color: #8dc11f;
}
.Banner {
  width: 100%;
  height: 15rem;
}
.Banner img {
  width: 100%;
  height: 15rem;
}
</style>
