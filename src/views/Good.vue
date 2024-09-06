<!--
 * @Author: yingzi
 * @Date: 2024-08-23 20:59:39
 * @LastEditors: yingzi
 * @LastEditTime: 2024-08-23 21:02:38
 * @Description: 请填写简介
-->
<template>
  <el-card class="good-container">
    <template #header>

      <div class="header">
        <el-input v-model="goodsSearch.searchName" placeholder="请输入商品名称"
          style="width: 200px; margin-right: 10px;"></el-input>
        <el-select v-model="goodsSearch.searchStatus" placeholder="上架状态">
          <!-- <el-option label="请选择" value=""></el-option> -->
          <el-option label="销售中" value="0"></el-option>
          <el-option label="已下架" value="1"></el-option>
        </el-select>
        <el-date-picker v-model="goodsSearch.searchTime" type="daterange" range-separator="至" start-placeholder="开始日期"
          end-placeholder="结束日期" style="width: 300px; margin-right: 10px;">
        </el-date-picker>
        <el-button type="primary" @click="getGoodList">查询</el-button>
        <el-button type="primary" @click="clearSearch" style="margin-left: 10px;"><i
            class="el-icon-delete"></i>重置</el-button>
        <hr>
        <el-button type="primary" @click="handleAdd"><i class="el-icon-plus"></i>新增商品</el-button>
      </div>
    </template>
    <el-table :data="state.tableData" tooltip-effect="dark" style="width: 100%">
      <el-table-column prop="goodsId" label="商品编号">
      </el-table-column>
      <el-table-column prop="goodsName" label="商品名">
      </el-table-column>
      <el-table-column prop="goodsIntro" label="商品简介">
      </el-table-column>
      <el-table-column label="商品图片" width="150px">
        <template #default="scope">
          <img style="width: 100px; height: 100px;" :key="scope.row.goodsId"
            :src="$filters.prefix(scope.row.goodsCoverImg)" alt="商品主图">
        </template>
      </el-table-column>
      <el-table-column prop="stockNum" label="商品库存">
      </el-table-column>
      <el-table-column prop="sellingPrice" label="商品售价">
      </el-table-column>
      <el-table-column label="上架状态">
        <template #default="scope">
          <span style="color: green;" v-if="scope.row.goodsSellStatus == 0">销售中</span>
          <span style="color: red;" v-else>已下架</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="140">
        <template #default="scope">
          <a style="cursor: pointer; margin-right: 10px" @click="toGoodsDetail(scope.row.goodsId)">详情</a>
          <a style="cursor: pointer; margin-right: 10px" @click="handleEdit(scope.row.goodsId)">修改</a>
          <a style="cursor: pointer; margin-right: 10px" v-if="scope.row.goodsSellStatus == 0"
            @click="handleStatus(scope.row.goodsId, 1)">下架</a>
          <a style="cursor: pointer; margin-right: 10px" v-else @click="handleStatus(scope.row.goodsId, 0)">上架</a>
        </template>
      </el-table-column>
    </el-table>
    <!--总数超过一页，再展示分页器-->
    <el-pagination background layout="prev, pager, next" :total="state.total" :page-size="state.pageSize"
      :current-page="state.currentPage" @current-change="changePage" />
  </el-card>
</template>

<script>



import axios from '@/utils/axios'
import { Message } from 'element-ui';


export default {

  data() {
    return {
      state: {
        loading: false,
        tableData: [], // 数据列表
        total: 0, // 总条数
        currentPage: 1, // 当前页
        pageSize: 10, // 分页大小
      },
      goodsSearch: {
        searchName: '',
        searchStatus: null,
        searchTime: []
      }
    }
  },
  beforeMount() {//vue的生命周期事件,在vue组件挂载之前会执行这个方法
    this.getGoodList();//获取商品列表;
  },
  methods: {
    // 获取轮播图列表
    getGoodList() {
      this.state.loading = true

      const [startDate, endDate] = this.goodsSearch.searchTime || [];

      axios.get('/product/list', {
        params: {
          pageNumber: this.state.currentPage,
          pageSize: this.state.pageSize,
          goodsName: this.goodsSearch.searchName,
          goodsSellStatus: this.goodsSearch.searchStatus,
          startDate: startDate ? startDate.toISOString() : null,
          endDate: endDate ? endDate.toISOString() : null,

        }
      }).then(res => {
        this.state.tableData = res.list
        this.state.total = res.totalCount
        this.state.currentPage = res.currPage
        this.state.loading = false
        this.goTop && this.goTop()
      })
    },
    clearSearch() {
      this.goodsSearch = {
        searchName: '',
        searchStatus: null,
        searchTime: []
      }
    },
    handleAdd() {//添加商品
      this.$router.push({ path: '/add' })
    },
    handleEdit(id) {//修改商品;
      this.$router.push({ path: '/add', query: { id } })
    },
    toGoodsDetail(id){
      this.$router.push({ path: '/goodsDetail', query: { id } })
    },
    changePage(val) {//翻页
      this.state.currentPage = val
      this.getGoodList()
    },
    // handleStatus(id, status){
    //   axios.put(`/goods/status/${status}`, {
    //     ids: id ? [id] : []
    //   }).then(() => {
    //     Message.success('修改成功')
    //     this.getGoodList()
    //   })
    // }
  }
}


// const { goTop } = app.appContext.config.globalProperties

</script>

<style scoped>
.good-container {
  min-height: 100%;
}

.el-card.is-always-shadow {
  min-height: 100% !important;
}
</style>
