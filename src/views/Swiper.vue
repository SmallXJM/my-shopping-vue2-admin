<template>
  <div>
  <el-card class="swiper-container">
    <template #header>
      <div class="header">
        <el-button type="primary"  @click="handleAdd"><i class="el-icon-plus"></i>增加</el-button>
        <el-popconfirm
          title="确定删除吗？"
          confirmButtonText='确定'
          cancelButtonText='取消'
          @confirm="handleDelete"
        >
          <template #reference>
            <el-button type="danger" style="margin-left:10px"><i class="el-icon-delete"></i>批量删除</el-button>
          </template>
        </el-popconfirm>
      </div>
    </template>
    <el-table
      ref="multipleTable"
      :data="state.tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
     >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="轮播图"
        width="200">
        <template #default="scope">
          <img style="width: 150px;height: 150px" :src="scope.row.carouselUrl" alt="轮播图">
        </template>
      </el-table-column>
      <el-table-column
        label="跳转链接"
        >
        <template #default="scope">
          <a target="_blank" :href="scope.row.redirectUrl">{{ scope.row.redirectUrl }}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="carouselRank"
        label="排序值"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="添加时间"
        width="200"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        width="220"
      >
        <template #default="scope">
          <a style="cursor: pointer; margin-right: 10px" @click="handleEdit(scope.row.carouselId)">修改</a >
          <el-popconfirm
            title="确定删除吗？"
            confirmButtonText='确定'
            cancelButtonText='取消'
            @confirm="handleDeleteOne(scope.row.carouselId)"
          >
            <template #reference>
              <a style="cursor: pointer">删除</a >
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="state.total"
      :page-size="state.pageSize"
      :current-page="state.currentPage"
      @current-change="changePage"
    />
  </el-card>
  <dialog-add-swiper ref='addSwiper' :reload="getCarousels" :type="state.type"></dialog-add-swiper>
  <!-- <DialogAddSwiper  /> -->
  </div>
</template>

<script>


import axios from '@/utils/axios'
import DialogAddSwiper from '@/components/DialogAddSwiper.vue'
import { Message } from 'element-ui';

import { localGet, pathMap } from '@/utils'

export default {
  components: {
    DialogAddSwiper
  },
  data() {
    return {
      state:{
        loading: false,
        tableData: [], // 数据列表
        currentPage: 1,
        pageSize: 5,
        type: 'add', // 操作类型,
        multipleSelection: [], // 选中项
        total: 0, // 总条数
      }
    }
  },
  beforeMount(){
    this.getCarousels();
  },
  methods:{
    getCarousels(){
      
      this.state.loading = true
      axios.get('/carousels', {
        params: {
          pageNumber: this.state.currentPage,
          pageSize: this.state.pageSize
        }
      }).then(res => {
        this.state.tableData = res.list
        this.state.total = res.total
        this.state.currentPage = res.pageNum
        this.state.loading = false
      })
    },
    handleAdd(){
      //console.log('addSwiper', addSwiper.value)
      this.state.type = 'add'
      this.$refs['addSwiper'].open()
    },
    handleEdit(id){
      this.state.type = 'edit'
      this.$refs['addSwiper'].open(id)
    },
    handleSelectionChange(val) {
      this.state.multipleSelection = val
    },
     // 单个删除
     handleDeleteOne(id){
      axios.delete('/deleteCarousels', {
        data: {
          ids: [id]
        }
      }).then(() => {
        Message.success('删除成功')
        this.getCarousels()
      })
    },
    handleDelete(){
      if (!this.state.multipleSelection.length) {
        Message.error('请选择项')
        return
      }
      axios.delete('/deleteCarousels', {
        data: {
          ids: this.state.multipleSelection.map(i => i.carouselId)
        }
      }).then(() => {
        Message.success('删除成功')
        this.getCarousels()
      })
    },
    changePage(val){
      this.state.currentPage = val
      this.getCarousels()
    }
  }
}


</script>

<style>

</style>