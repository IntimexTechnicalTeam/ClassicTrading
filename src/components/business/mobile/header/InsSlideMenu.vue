<template>
    <div>
        <div class="drawer-bg" v-if="showMenu" @click="handleClickOutside"/>
        <div class="sidebar-container" :class="{'hiddenMenu': !showMenu,'left': direction == 'left','top': direction == 'top', 'right': direction == 'right'}">
            <el-scrollbar wrap-class="scrollbar-wrapper">
                <slot />
            </el-scrollbar>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
// import Scrollbar from 'element-ui/lib/scrollbar';
@Component({ components: { } })
export default class InsSlideMenu extends Vue {
  @Prop({ default: 'left' }) private direction !: string;

  get showMenu () {
    return this.$store.state.isShowMenu;
  }

  handleClickOutside () {
    this.$store.dispatch('isShowMenu', false);
  }

  @Watch('showMenu', { deep: true })
  onShowMenu (val) {
    if (val) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }
}
</script>
<style scoped lang="less">
.drawer-bg {
  background: #000000;
  opacity: .5;
  width: 100%;
  top:0;
  height:100%;
  position: fixed;
  z-index: 10000;
}

.sidebar-container {
  -webkit-transition: -webkit-transform .28s;
  transition: -webkit-transform .28s;
  transition: transform .28s;
  transition: transform .28s,-webkit-transform .28s;
  // width: 100%;
  position: fixed;
  z-index: 1000;

  &.left {
    top: 0;
    left: 0;
    height: 100%;
    width: 55%;

    &.hiddenMenu {
        transform: translate3d(-100%, 0, 0);
    }

    .el-scrollbar {
      height: 100%;
    }
  }

  &.top {
    top: 0;
    height: auto;

    // max-height: 90%;
    overflow: scroll;

    width: 100%;
    &.hiddenMenu {
        transform: translate3d(0, -100%, 0);
    }
  }

  &.right {
    top:0;
    right: 0;
    height:100%;
    width: 80%;
    z-index: 99999;
    background: #fff;
    &.hiddenMenu {
        transform: translate3d(100%, 0, 0);
    }

    .el-scrollbar {
      height: 100%;
    }
  }
}

.hiddenMenu {
  pointer-events: none;
  transition-duration: 0.3s;
}

.el-drawer__title {
    display: none;
}

span {
    padding: 20px;
}
</style>
