<template>
  <div class="MobileHomeNews">
    <div class="swiper-container swiper-container-hot">
        <swiper :options="swiperOption" ref="mySwiper">
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
        <div class="swiper-scrollbar"   slot="scrollbar"></div>
        </swiper>

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
      scrollbar: {
        el: '.swiper-scrollbar'
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      slidesPerView: 1
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
.MobileHomeNews{
  .swiper-scrollbar {
      border-radius:0px!important;
      position: relative;
      background: #e6e6e6!important;
  }
  .swiper-scrollbar-drag{
        background: #666666;
        border-radius: 0px;
  }
  .swiper-container-horizontal > .swiper-scrollbar{
        height: 4px!important;
  }
  .swiper-container{
    .swiper-slide{
      padding-bottom: 2rem;
    }
  }
}

</style>
<style lang="less" scoped>
.MobileHomeNews{
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  margin-top: 1rem;
  margin-bottom: 3rem;
  .catContent{
    width: 100%;
    display: inline-block;
    a{
      width: 100%;
      display: inline-block;
      .cover{
        width: 100%;
        display: inline-block;
        img{
          width: 100%;
        }
      }
      .introduce{
        .title{
          color:#333333;
          font-size: 1.6rem;
          text-align: left;
          margin-top: 1rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .createDate{
          color:#999999;
          font-size: 1.4rem;
          text-align: left;
          margin-top: 1rem;
          margin-bottom: 1rem;
        }
        .desc{
          color:#666666;
          font-size: 1.5rem;
          text-align: left;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
