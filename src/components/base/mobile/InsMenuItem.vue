<template>
    <el-submenu :index="item.Name" v-if="item.Childs && item.Childs.length">
        <template slot="title">
            <span class="name" @click="toUrl(item.Url)" v-if="item.Type === 0">{{item.Name}}</span>
             <router-link v-else  :style="{color: textColor}" @click.native="closeSlideMenu(item)" :to="To(item)" slot="title">
              <b class="subline_b">{{item.Name}}</b>
         </router-link>
        </template>
        <menu-item :textColor="textColor" v-for="(child,index) in item.Childs" :key="index" :item="child" :level="level+1" />
    </el-submenu>
    <el-menu-item :index="item.Name" v-else>
      <a href="javascript:;" v-if="item.Type === 0" @click="toUrl(item.Url)">
          <b>{{item.Name}}</b>
      </a>
      <router-link v-else  :style="{color: textColor}" @click.native="closeSlideMenu(item)" :to="To(item)" slot="title">
           <b>{{item.Name}}</b>
      </router-link>
    </el-menu-item>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
// import { MenuItem as ElMenuItem, Submenu } from 'element-ui';
@Component({
  name: 'MenuItem',
  components: {
    // ElMenuItem,
    // Submenu
  }
})
export default class InsMenuItem extends Vue {
  @Prop() private item!: object;
  @Prop() private textColor!: string;
  @Prop({ default: 1 }) private level!: number;
  paramCats: number[] = []; // 选中的产品目录数据传参数组
  attrId:number[] = [];
  showMemNav: boolean = false;
  attrList: any[] = []; // 产品属性数据
  catalogs: object[] = []; // 产品目录数据
  closeSlideMenu (n) {
    this.$store.dispatch('isShowMenu', false);
  }

  toUrl (url) {
    if (url) {
      window.location.href = url;
    }
  }
  // 根据传入的属性值获取对应的Catalog;
  getCatalogByAttributes (cond) {
    return new Promise(resolve => {
      this.$Api.product.getCatalogByAttributes(cond).then((result) => {
        this.paramCats = result;
        resolve();
      });
    });
  }
  To (n) {
    return n.Type === 1 ? '/cms/catDetail/' + n.Value.Id : n.Type === 2 ? '/CMS/content/' + n.Value.Id : n.Type === 3 ? '/RegNPay/Form/' + n.Value.Id : n.Type === 4 && !this.$store.state.catMenuType ? '/product/cat/' + n.Value.Id : n.Type === 4 && this.$store.state.catMenuType ? '/product/search/-?catalogs=' + JSON.stringify([parseInt(n.Value.Id)]) + '&type=0' : n.Type === 5 ? '/product/search/-?attrs=' + JSON.stringify([{ Id: parseInt(n.Value.Id), Vals: [] }]) + '&type=0' : '/product/search/-?attrs=' + JSON.stringify([{ Id: parseInt(n.ParentId), Vals: [parseInt(n.Value.Id)] }]) + '&type=0';
  }
}
</script>

<style scoped lang="less">
.name {
  font-size: 1.12rem;
  line-height: 3rem;
  a {
    font-size: 1.12rem;
    line-height: 3rem;
  }
}
</style>
