<template>
 <div class="accountHeader">
    <div class="memberBg">
        <div class="innerBox">
            <p class="memberCenterTitle">{{$t('Account.MemberCenter')}}</p>
            <div class="leftside">
              <p>{{MemberName}}</p>
              <div class="leftnav">
                <router-link to="/account/memberInfo" class="iconBg"><div class="innerStyle"><span>{{$t('Account.MemberInformation')}}</span></div></router-link>
                <router-link to="/order/List" class="iconBg" ><div class="innerStyle"><span>{{$t('Account.MyOrder')}}</span></div></router-link>
                <router-link to="/account/notification" class="iconBg"><div class="innerStyle"><span>{{$t('Account.MyMessages')}}</span></div></router-link>
                <router-link to="/account/myFavorite" class="iconBg"  ><div class="innerStyle"><span>{{$t('Account.MyFavorite')}}</span></div></router-link>
                <router-link to="/account/myCoupon" class="iconBg" ><div class="innerStyle"><span>{{$t('MyCoupon.MyCoupon')}}</span></div></router-link>
              </div>
            </div>
        </div>
    </div>
 </div>
</template>
<script lang="ts" scoped>
import { Component, Prop, Vue } from 'vue-property-decorator';
import sdk from '@/sdk/InstoreSdk';
@Component
export default class accountHeader extends Vue {
   MemberName:string='';
   TotalPoints:string='';
   // 获取会员信息
   getMemberInfo () {
     let _this = this;
     sdk.api.member.getProfile().then(
       function (data) {
         console.log(data, 'datadata');
         _this.MemberName = data.FirstName + '  ' + data.LastName;
       }
     );
   }
   // 获取会员总积分
   getMemberTotal () {
     this.$Api.pointsApi.GetMemberTotalPointsInfo().then((result) => {
       this.TotalPoints = result.data.TotalPoints;
     });
   }
   get currentlang () {
     return this.$i18n.locale;
   }
   mounted () {
     this.getMemberInfo();
     this.getMemberTotal();
   }
}
</script>

<style scoped lang="less">
/*頁面中間目錄*/
ul,li{
    list-style: none;
}
.clear{
    clear: both;
}
.leftnav{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.router-link-active{
    border:1px solid #333;
    background-size: contain;
    float: left;
    width: 230px!important;
    text-align: center;
    transform: translateY(-5px);
    .innerStyle{
      display: block;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
}
.iconBg{
    border:1px solid #333;
    background-size: contain;
    float: left;
    width: 18%;
    text-align: center;
    padding-top: 15px;
    padding-bottom: 15px;
    border-radius: 50px;
    .innerStyle{
      display: block;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &:hover{
      transform: translateY(-5px);
    }
  span{
    width: 100%;
    display: inline-block;
    color:#333;
    font-size: 18px;
    font-weight: 500;
  }
  strong{
    width: 100%;
    display: inline-block;
    color:#333;
    font-size: 24px;
    font-weight: 600;
  }
  b{
    width: 100%;
    display: inline-block;
    color: #333;
    font-size: 14px;
    font-weight: 600;
  }
}
.accountHeader{
    width: 100%;
    display: flex;
    .memberBg{
      background: url('/images/pc/pc_12.jpg') no-repeat center center;
      background-size: cover;
      box-sizing: border-box;
      display: inline-block;
      width: 100%;
      padding-top: 50px;
      padding-bottom: 50px;
      .innerBox{
        width: 1200px;
        margin: 0 auto;
        .memberCenterTitle{
          font-weight: 700;
          font-size: 40px;
          text-align: center;
          padding-top: 30px;
          color:#333;
          text-transform:uppercase;
        }
        .leftside{
          width: 100%;
          padding-top: 30px;
          p{
            font-size: 24px;
            color:#333;
            margin-bottom: 30px;
          }
          a{
            display: inline-block;
            margin-right: 15px;
            &:last-child{
              margin-right: 0px!important;
            }
            img{
              width: 100%;
            }
          }
        }
        .rightside{
          width: 10%;
          float: left;
          text-align: right;
          img{
               display: inline-block;
          }
        }

      }
    }
}

</style>
