<template>
  <div class="banner pcbanner">
    <transition name="slide">
      <div key="1" v-if="!waiting" style="display:flex;">
        <div class="swiperbg">
          <swiper :options="swiperOption" v-if="initSwiper" class="swiperBoxMain">
            <!-- slides -->
            <swiperSlide
              v-for="(slide, index) in bannerList"
              :key="index"
              class="swiper-container-indexMain"
            >
              <img :src="slide.Image"/>
             <div class="BottomText">
                    <p class="T1"  v-if="slide.Content.indexOf('*')!=-1">{{slide.Content.split('*')[0]}}</p>
                    <p class="T2"  v-if="slide.Content.indexOf('*')!=-1">{{slide.Content.split('*')[1]}}</p>
                    <p class="T3"><router-link :to="slide.Url">{{$t('Message.LearnMore')}}</router-link></p>
              </div>
            </swiperSlide>
          </swiper>
        </div>
      </div>
    </transition>
    <transition name="slide">
      <div class="faker" key="2" v-if="waiting" v-loading="true">
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import sdk from '@/sdk/InstoreSdk';
import { Message, Loading } from 'element-ui';
import animate from 'animate.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper/src';
// banner组件通信传值设定：
// initOptions：swiper初始化相关参数
// page：getHeaderBanner的传参
// initSwiper：是否为轮播，默认非轮播
// data：自定义banner数据

@Component({ components: { swiper, swiperSlide } })
export default class InsBanner extends Vue {
  private waiting: boolean = true;
  @Prop() private initOptions!: object;
  @Prop({ default: '' }) private page!: string;
  @Prop({ default: false }) private initSwiper!: boolean;
  @Prop() private data!: any;
  bannerList: object[] = [];
  bannerImg: string = '';
  isload: boolean = false;
  swiperOption: object = {
    autoplay: {
      disableOnInteraction: false
    }
  };

  // get swiper () {
  //   return this.$refs.mySwiper.swiper;
  // }
  get currentlang () {
    return this.$Storage.get('locale');
  }
  getBanner () {
    let _this = this;
    sdk.api.promotion.getHeaderBanner(this.page).then(
      function (data) {
        _this.bannerList = data;
        _this.bannerImg = data[0].Image;
        _this.waiting = false;
      },
      function (data) {
        Message({
          message: data,
          type: 'error',
          customClass: 'NormalBg'
        });
      }
    );
  }

  created () {
    if (this.initOptions) {
      this.swiperOption = this.initOptions;
    }
  }

  mounted () {
    // if (this.bannerList.length === 1) {
    // 只有1个slide，swiper会失效且隐藏切换按钮
    // this.swiper.destroy(false);
    // }
    if (this.page) {
      this.getBanner();
    } else {
      this.waiting = false;
      if (this.initSwiper) {
        this.bannerList = this.data;
        this.isload = true;
      } else {
        if (typeof this.data === 'object') {
          this.bannerImg = this.data[0].Image;
        } else if (typeof this.data === 'string') {
          this.bannerImg = this.data;
        }
      }
    }
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
<style lang="less">
.pcbanner .swiper-pagination-bullet{
  width: 10px!important;
  height: 10px!important;
  background: #fff;
  opacity: 1;
  border:1px solid #fff;
}
.pcbanner .swiper-pagination-bullet-active{
  background: #282828!important;
}
</style>
<style scoped lang="less">
.swiperBoxMain{
  position: relative;
  .BottomText{
    position:relative;
    width: 100%;
    margin-top: 1rem;
    .T1{
      text-align: center;
      color: #333333;
      font-size: 60px;
      width: 100%;
      font-family: 'ArialBlack';
      font-weight: 700;
    }
    .T2{
      text-align: center;
      color: #333333;
      font-size: 24px;
      width: 100%;
      font-family: 'ArialBlack';
      font-weight: 500;
    }
    .T3{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      a{
        width: 200px;
        height: 50px;
        line-height: 50px;
        background: #e83428;
        color: #fff;
        font-size: 20px;
        border-radius: 50px;
        text-align: center;
        margin-top: 1rem;
        &:hover{
          background: #333333;
          color: #FFFFFF;
        }
      }
    }
  }
}
.pcbanner{
  min-width: 1200px;
  min-height: 28.7vw;
}
.swiperbg {
  width: 100%;
  background:#FFF;
  background-size: 100% 100%;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;

}
.swiper-container-indexMain img {
  width: 100%;
  min-height: 28.7vw;
}
.faker{
  width: 100vw;
  height: 28.7vw;
  background-color: aliceblue;
}
.cnT1{
  text-align: center!important;
}
.cnT2{
  text-align: left!important;
  text-indent: 12%;
}
.cnT1A{
  text-align: left!important;
  text-indent: 21%;
}
</style>
