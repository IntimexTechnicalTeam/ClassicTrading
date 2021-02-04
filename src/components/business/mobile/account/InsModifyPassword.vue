<template>
  <div id="container" class="MembercenterMobile">
    <div class="MemberInfoMain">
        <!-- 修改密码切换 -->
          <div class="pwdFormMain">
            <InsForm ref="pwdForm" v-model="pwdForm">
              <div class="login-register-content">
                    <InsInput2 :placeholder="$t('Register.UserOldPassword')" width="100%" v-model="pwdForm.Password" type="logopassword"/>
                    <InsInput2 :placeholder="$t('Register.UserNewPassword')" width="100%" v-model="pwdForm.NewPassword" type="password"/>
                    <InsInput2 :placeholder="$t('Register.UserConfirmPassword')" width="100%" v-model="pwdForm.ConfirmNewPassword" type="confirmpassword" :rule="pwdForm.NewPassword" />
              </div>
              <div class="login-register-handle">
                <div class="btn-box">
                  <ElButton type="primary" @click="CheckPwdSubmit('pwdForm')" class="resetBtn">{{$t('DeliveryAddress.SaveBtn')}}</ElButton>
                </div>
              </div>
            </InsForm>
          </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Form, Input, Message, FormItem, Button } from 'element-ui';
import sdk from '@/sdk/InstoreSdk';
import InsInput2 from '@/components/base/pc/InsInput2.vue';
import InsForm from '@/components/base/pc/InsForm.vue';
@Component({
  components: {
    accountHeader: () => import('@/components/hkTasteBusiness/mobile/account/accountHeader.vue'),
    Form,
    Input,
    FormItem,
    Button,
    InsInput2,
    InsForm
  }
})
export default class InsModifyPassword extends Vue {
  validatePass2 (rule, value, callback) {
    if (value === '') {
      callback(new Error(this.$t('MemberInfo.EnterComfirmPwd') as string));
    } else if (value !== this.pwdForm.NewPassword) {
      callback(new Error(this.$t('MemberInfo.PwdNotCorrect') as string));
    } else {
      callback();
    }
  }

  pwdForm: any = {
    Password: '',
    NewPassword: '',
    ConfirmNewPassword: ''
  };
  get pwdRules () {
    var that = this;
    return {
      Password: [
        {
          required: true,
          message: this.$t('MemberInfo.EnterOldPwd'),
          trigger: 'blur'
        }
      ],
      NewPassword: [
        {
          required: true,
          message: '',
          trigger: 'blur',
          validator: that.validatePass2
        }
      ],
      ConfirmNewPassword: [
        {
          required: true,
          message: '',
          trigger: 'blur',
          validator: that.validatePass2
        }
      ]
    };
  }

  // 打开地址
  openlink (link) {
    this.$router.push({ path: link });
  }

  // 提交密码修改表单
  CheckPwdSubmit (pwdForm) {
    let that = this;
    this.$nextTick(function () {
      (that.$refs.pwdForm as InsForm).validate(valid => {
        if (valid) {
          sdk.api.member.updatePassword(this.pwdForm).then(
            function (response) {
              console.log(response.Message, '22222');
              that.$message({
                message: response.Message,
                type: 'success',
                customClass: 'messageBoxMobile'
              });

            // _this.$router.push('/account/registerSuccess');
            },
            function (response) {
              that.$message({
                message: response.Message,
                type: 'error',
                customClass: 'messageBoxMobile'
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
.messageBoxMobile{
      z-index: 100000!important;
}
.MembercenterMobile .pwdFormMain{
  width: 90%;
  margin: 0 auto;
  margin-bottom: 50px;
  margin-top: 2rem;
}
.MembercenterMobile  .input_outer{
  padding-bottom: 30px;
  padding-top: 0px!important;
}
.MembercenterMobile .resetBtn{
  width: 100%;
  display: block;
  background: #868f95;
  background-size: 100%;
  height: 4rem;
  border-radius:.2rem!important;
  border:none!important;
  text-transform: uppercase;
  span{
    font-size: 1.6rem;
  }
}
</style>
