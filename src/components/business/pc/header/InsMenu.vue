<template>
  <div class="header_bottom">
    <div class="header_topinfo">
      <div class="header_menu">
        <component :navData="NavData" v-bind:is="CurrentNav"></component>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
// import api from '@/sdk/api/api';
@Component({
  components: {
    'navLayout1': () => import('@/components/business/pc/header/InsNavLayout1.vue'),
    'navLayout2': () => import('@/components/business/pc/header/InsNavLayout2.vue')
  }
})
export default class InsMenu extends Vue {
  @Prop({ default: 'header' }) private type!: string;
    CurrentNav: string = 'navLayout2';

    get NavData () {
      if (this.type === 'header') {
        return this.$store.state.headerMenus;
      } else {
        return this.$store.state.footerMenus;
      }
    }

    mounted () {
      var _this = this;
      // api
      //   .getMenuData(2)
      //   .then((res: any) => {
      //     this.NavData = res.data.requestDetail;
      //     this.$store.dispatch('setMenuData', this.NavData);
      //     console.log(res, '请求返回数据');
      //   })
      //   .catch((err: any) => {
      //   // 请求失败后的处理函数
      //     console.log(err);
      //   });

      // this.NavData = [{
      //   id: 1,
      //   name: '關於我們',
      //   link: '/about'
      // },
      // {
      //   id: 2,
      //   name: '產品',
      //   link: '/product/search',
      //   sub: [{
      //     id: 3,
      //     name: '二级目录1',
      //     link: '/product/cat/1'
      //   },
      //   {
      //     id: 4,
      //     name: '二级目录2',
      //     link: '/product/cat/2'
      //   }]
      // },
      // {
      //   id: 5,
      //   name: '聯絡我們',
      //   link: '/contact',
      //   sub: [{
      //     id: 6,
      //     name: '二级子目录1',
      //     link: '/product/list',
      //     sub: [{
      //       id: 7,
      //       name: '三级子目录1',
      //       link: '/product/list'
      //     },
      //     {
      //       id: 8,
      //       name: '三级子目录2',
      //       link: '/product/list'
      //     }
      //     ]
      //   },
      //   {
      //     id: 9,
      //     name: '二级子目录2',
      //     link: '/product/list',
      //     sub: [{
      //       id: 10,
      //       name: '三级子目录1',
      //       link: '/product/list',
      //       sub: [{
      //         id: 11,
      //         name: '四级子目录2',
      //         link: '/product/list'
      //       },
      //       {
      //         id: 12,
      //         name: '四级子目录3',
      //         link: '/product/list'
      //       }
      //       ]
      //     }]
      //   }]
      // }, {
      //   id: 13,
      //   name: '服務品種',
      //   link: '/service'
      // },
      // {
      //   id: 14,
      //   name: '獎項',
      //   link: '/award'
      // }];
      // this.$store.dispatch('setMenuData', this.NavData);
    }
}
</script>
<style scoped lang="less">
.header_bottom {
  width: 60%;
  height: 100%;
  vertical-align: middle;
  margin: 0 auto;
  .header_topinfo {
    margin: 0 auto;
    margin-left: 20px;
  }
}

.header_menu {
  width: 100%;
  // text-transform: uppercase;
}
</style>
