<template>
  <div class="PcHomeNews">
      <div class="swiper-father">
        <swiper :options="swiperOption" ref="mySwiper" class="innerSwiper">
        <!-- slides -->
        <swiperSlide v-for="(slide, index) in ContentList" :key="index">
            <div class="catContent">
                <ul>
                    <li class="wow fadeIn"  data-wow-delay="0.3s">
                        <router-link :to="'/cms/content/'+slide.Id">
                            <div class="cover">
                                <img :src="slide.Cover" alt=""/>
                            </div>
                            <div class="introduce">
                                <p class="title">{{slide.Title}}</p>
                                <p class="createDate">{{slide.ContentDateTime}}</p>
                                <p class="desc">{{slide.Desc}}</p>
                            </div>
                        </router-link>
                    </li>
                </ul>
            </div>
        </swiperSlide>
        </swiper>
         <div class="swiper-button-prev" slot="button-prev"></div>
         <div class="swiper-button-next" slot="button-next"></div>
      </div>
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import { swiper, swiperSlide } from 'vue-awesome-swiper/src';
@Component({
  components: {
    swiper,
    swiperSlide
  }
})
export default class HkHomeNews extends Vue {
    hotProducts:any[]=[];
    bannerImg: string = '';
    currentPage: number = 1; // 当前页
    pageSize: number = 4; // 每页显示条目个数
    ContentList:any[]=[];
    swiperOption: object = {
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      slidesPerColumn: 1,
      slidesPerView: 2,
      spaceBetween: 40
    };
    getContentsList() {
      var params = {
        Key: 'News',
        Page: this.currentPage,
        PageSize: this.pageSize
      };
      this.$Api.cms.getContentsByCatKeyEx(params).then((result) => {
        this.ContentList = result.Data.slice(0, 4);
        this.$store.dispatch('setHkHomeNews', this.ContentList);
        result.Data.forEach(function (i) {
          var newDate = new Date(i.ContentDateTime.replace(/-/g, '/'));
          i.ContentDateTime = newDate.getDate() + '/' + (newDate.getMonth() + 1) + '/' + newDate.getFullYear();
        });
      });
    }
    mounted () {
      this.getContentsList();
    }
}
</script>
<style lang="less">
.PcHomeNews{
     width: 100%;
  .insProductHot{
      box-sizing: border-box;
      display: flex;
      width: 100%;
    }
    .swiper-father{
      width: 100%;
      position: relative;
    }
    .swiper-container{
      width: 90%;
      margin: 0 auto;
    }
    .swiper-button-prev, .swiper-button-next{
      width: 16px!important;
      height: 28px!important;
      background-size: 16px 28px!important;
      margin-top: -50px;
    }
    .swiper-button-next{
       right: 0px!important;
       outline: 0;
    }
    .swiper-button-prev{
        left: 0px!important;
        outline: 0;
    }
    .swiper-button-next, .swiper-container-rtl .swiper-button-prev{
        background-image: url('/images/pc/rightside.png')!important;
    }
    .swiper-button-prev, .swiper-container-rtl .swiper-button-next{
        background-image: url('/images/pc/leftside.png')!important;
    }
}

</style>
<style lang="less" scoped>
.PcHomeNews{
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  margin-top: 1rem;
  margin-bottom: 3rem;
  position: relative;
  .catContent{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
    a{
      width: calc(100% - 2px);
      display: flex;
      flex-wrap: wrap;
      border:1px solid #fff;
      &:hover{
        border:1px solid #ccc;
      }
      .cover{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        img{
          width: 100%;
        }
      }
      .introduce{
        padding: 10px;
        .title{
          color:#333333;
          font-size: 20px;
          text-align: left;
          margin-top: 10px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          &:hover{
            text-decoration: underline;
          }
        }
        .createDate{
          color:#999999;
          font-size: 16px;
          text-align: left;
          margin-top: 5px;
          margin-bottom: 10px;
        }
        .desc{
          color:#666666;
          font-size: 16px;
          text-align: left;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
          line-height: 25px;
        }
      }
    }
  }
}
</style>
