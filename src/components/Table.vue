<!--
 * @Author: yingzi
 * @Date: 2024-08-07 14:24:55
 * @LastEditors: yingzi
 * @LastEditTime: 2024-08-08 20:10:15
 * @Description: 请填写简介
-->
<template>
  <div>
  <el-table
      :data="state.tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
  >
    <slot name='column'></slot>
  </el-table>
  <el-pagination
    background
    layout="prev, pager, next"
    :total="state.total"
    :page-size="state.pageSize"
    :current-page="state.currentPage"
    @current-change="changePage"
  />
  </div>
</template>

<script>

import axios from '@/utils/axios'
export default{
  props:{
    action: String
  },
  data(){
    return {
      state:{
        loading: false,
        tableData: [], // 数据列表
        total: 0, // 总条数
        currentPage: 1, // 当前页
        pageSize: 10, // 分页大小
        multipleSelection: []
      }
    }
  },
  methods:{
    getList(){
      this.state.loading = true
      axios.get(this.action, {
        params: {
          pageNumber:  this.state.currentPage,
          pageSize:  this.state.pageSize
        }
      }).then(res => {
        this.state.tableData = res.list
        this.state.total = res.totalCount
        this.state.currentPage = res.currPage
        this.state.loading = false
        this.goTop &&  this.goTop() // 回到顶部
      })
    },

    handleSelectionChange(val){
      this.state.multipleSelection = val
    },

    changePage(val){
      this.state.currentPage = val
      this.getList()
    }
  },
  beforeMount(){
    this.getList()
  }
}

// const { goTop } = app.appContext.config.globalProperties

// script setup 写法，需要通过 defineExpose 方法，将属性暴露出去，才能在父组件通过 ref 形式拿到本组件的内部参数
// defineExpose({ state: state, getList: getList })
</script>