<template>
  <div class="layout">
    <el-container v-if="state.showMenu" class="container">
      <el-aside class="aside">
        <div class="head">
          <div>
            
            <span>网上商城后台管理</span>
          </div>
        </div>
        <div class="line" />
        <el-menu
          background-color="#222832"
          text-color="#fff"
          :router="true"
           :default-openeds="state.defaultOpen"
           :default-active='state.currentPath'
        >
          <el-submenu index="1">
            <template #title>
              <span>Dashboard</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/"><i class="el-icon-s-home"></i>首页</el-menu-item>
              <el-menu-item index="/add"><i class="el-icon-plus"></i>添加商品</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
           <el-submenu index="2">
            <template #title>
              <span>首页配置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/swiper"><i class="el-icon-picture"></i>轮播图配置</el-menu-item>
              <el-menu-item index="/hot"><i class="el-icon-star-off"></i>热销商品配置</el-menu-item>
              <el-menu-item index="/new"><i class="el-icon-goods"></i>新品上线配置</el-menu-item>
              <el-menu-item index="/recommend"><i class="el-icon-shopping-cart-full"></i>为你推荐配置</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template #title>
              <span>模块管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/category"><i class="el-icon-shopping-cart-full"></i>分类管理</el-menu-item>
              <el-menu-item index="/good"><i class="el-icon-goods"></i>商品管理</el-menu-item>
              <el-menu-item index="/guest"><i class="el-icon-s-custom"></i>会员管理</el-menu-item>
              <el-menu-item index="/order"><i class="el-icon-s-order"></i>订单管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template #title>
              <span>系统管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/account"><i class="el-icon-lock"></i>修改密码</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 整个网站的主体内容begin -->
      <el-container class="content">
        <Header />
        <div class="main">
          <!-- 路由占位符，显示在路由占位符的内容是变化的； -->
          <router-view />
        </div>
        <Footer />
      </el-container>
    </el-container>
      <!-- 整个网站的主体内容end -->
    <el-container v-else class="container">
      <router-view />
    </el-container>
  </div>
</template>

<script>

import router from './router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { localGet, pathMap } from '@/utils'
export default {
    components:{
      Header,
      Footer
    },
    data(){
      return {
        state:{
          showMenu: false,
          defaultOpen: ['1', '2', '3', '4'],
          currentPath: '/'
        }
      }
    },
    watch:{
      '$route.path': function(val){
       
        
        this.state.currentPath = val;
        const noMenu = ['/login']
        this.state.showMenu = !noMenu.includes(val)
        document.title = pathMap[this.$route.name]
      }
    },
    
    beforeMount(){
      
      //
      // router.afterEach((to, from) => {
      //   
      // })

      // router.beforeEach((to, from, next) => {
      //   console.log('-------->to',to);
      //   console.log('-------->from',from);
      //   console.log('-------->next',next);
      //   this.state.currentPath = to.path
      //   document.title = pathMap[to.name]
      //   console.log('document.title---------->',document.title);
      //   console.log(' this.state.currentPath---------->', this.state.currentPath);
        
      // })
      // this.state.showMenu = !noMenu.includes(this.$route.path);
      // this.state.currentPath = this.$route.path;
      // document.title = pathMap[this.$route.name]
    }

}


</script>

<style scoped>
.layout {
  min-height: 100vh;
  background-color: #ffffff;
}
.container {
  height: 100vh;
}
.aside {
  width: 200px!important;
  background-color: #222832;
}
.head {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
}
.head > div {
  display: flex;
  align-items: center;
}

.head img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}
.head span {
  font-size: 20px;
  color: #ffffff;
}
.line {
  border-top: 1px solid hsla(0,0%,100%,.05);
  border-bottom: 1px solid rgba(0,0,0,.2);
}
.content {
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  overflow: hidden;
}
.main {
  height: calc(100vh - 100px);
  overflow: auto;
  padding: 10px;
}
</style>

<style>
  body {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  .el-menu {
    border-right: none!important;
  }
  .el-submenu {
    border-top: 1px solid hsla(0, 0%, 100%, .05);
    border-bottom: 1px solid rgba(0, 0, 0, .2);
  }
  .el-submenu:first-child {
    border-top: none;
  }
  .el-submenu [class^="el-icon-"] {
    vertical-align: -1px!important;
  }
  a {
    color: #409eff;
    text-decoration: none;
  }
  .el-pagination {
    text-align: center;
    margin-top: 20px;
  }
  .el-popper__arrow {
    display: none;
  }
</style>