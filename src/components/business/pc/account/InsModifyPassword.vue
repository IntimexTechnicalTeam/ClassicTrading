<template>
  <div class="MemberPc">

    <div class="MemberInfoMain">
          <div class="pwdFormMain">
            <InsForm ref="pwdForm" v-model="pwdForm" style="width:100%;">
              <div class="login-register-content">
                    <InsInput2 :placeholder="$t('Register.UserOldPassword')" width="100%" v-model="pwdForm.Password" type="logopassword"/>
                    <InsInput2 :placeholder="$t('Register.UserNewPassword')" width="100%" v-model="pwdForm.NewPassword" type="password"/>
                    <InsInput2 :placeholder="$t('Register.UserConfirmPassword')" width="100%" v-model="pwdForm.ConfirmNewPassword" type="confirmpassword" :rule="pwdForm.NewPassword" />
              </div>
              <div class="login-register-handle">
                <div class="btn-box">
                  <ElButton type="primary" @click="CheckPwdSubmit('pwdForm')" class="resetBtn" style="width:100%;margin-left:0%;">{{$t('DeliveryAddress.SaveBtn')}}</ElButton>
                </div>
              </div>
            </InsForm>
          </div>
    </div>
   </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Form, Input, Message, Button, FormItem } from 'element-ui';
import sdk from '@/sdk/InstoreSdk';
import InsInput2 from '@/components/base/pc/InsInput2.vue';
import InsForm from '@/components/base/pc/InsForm.vue';
@Component({
  components: {
    accountHeader: () => import('@/components/hkTasteBusiness/pc/account/accountHeader.vue'),
    Form,
    Input,
    Button,
    FormItem,
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
                customClass: 'messageboxNoraml'
              });

            // _this.$router.push('/account/registerSuccess');
            },
            function (response) {
              console.log(response.Message, '3333333333333');
              that.$message({
                message: response.Message,
                type: 'error',
                customClass: 'messageboxNoraml'
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
.messageboxNoraml{
  z-index: 1000000000!important;
}
</style>
<style lang="less" scoped>
#container {
  width: 100%;
  display: inline-block;
}
.MemberInfoMain {
  width: 1200px;
  margin: 0 auto;
}
.pwdFormMain{
  width: 600px;
  margin: 0 auto;
  margin-bottom: 50px;
  display: flex;
  margin-top: 30px;
}
.MemberInfoMain .el-tabs__nav {
  height: 50px;
  line-height: 50px;
}
.MemberInfoMain .el-tabs__content {
  text-align: left;
}
.MemberInfoMain .el-input__icon {
  font-size: 16px;
}
.MemberInfoMain .el-form-item__content,.MemberInfoMain .el-form-item__label-wrap{
  margin-left: 0px!important;
}
.MemberInfoMain .el-button{
   background: #838a97;
    border: none;
    display: block;
    border-radius: 5px;
    float: left;
    margin-top: 22px;
    text-transform: uppercase;
    font-size: 22px;
}
</style>
