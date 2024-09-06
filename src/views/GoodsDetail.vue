<!--
 * @Author: yingzi
 * @Date: 2024-08-26 18:23:20
 * @LastEditors: yingzi
 * @LastEditTime: 2024-08-26 19:22:53
 * @Description: 请填写简介
-->
<template>
  <div class="add">
    <el-card class="add-container">
      <el-form :model="state.goodForm" :rules="state.rules" ref="goodRef" label-width="100px" class="goodForm">
        <!-- <el-form-item required label="商品分类">
          <el-cascader :placeholder="state.defaultCate" style="width: 300px" :props="state.category" @change="handleChangeCate"></el-cascader>
        </el-form-item> -->
        <el-form-item label="商品名称" prop="goodsName">
          <el-input style="width: 300px" v-model="state.goodForm.goodsName" placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label="商品简介" prop="goodsIntro">
          <el-input style="width: 300px" type="textarea" v-model="state.goodForm.goodsIntro" placeholder="请输入商品简介(100字)"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="originalPrice">
          <el-input type="number" min="0" style="width: 300px" v-model="state.goodForm.originalPrice" placeholder="请输入商品价格"></el-input>
        </el-form-item>
        <el-form-item label="商品售卖价" prop="sellingPrice">
          <el-input type="number" min="0" style="width: 300px" v-model="state.goodForm.sellingPrice" placeholder="请输入商品售价"></el-input>
        </el-form-item>
        <el-form-item label="商品库存" prop="stockNum">
          <el-input type="number" min="0" style="width: 300px" v-model="state.goodForm.stockNum" placeholder="请输入商品库存"></el-input>
        </el-form-item>
        <el-form-item label="商品标签" prop="tag">
          <el-input style="width: 300px" v-model="state.goodForm.tag" placeholder="请输入商品小标签"></el-input>
        </el-form-item>
        <el-form-item label="上架状态" prop="goodsSellStatus">
          <el-radio-group v-model="state.goodForm.goodsSellStatus">
            <el-radio label="0">上架</el-radio>
            <el-radio label="1">下架</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item required label="商品主图" prop="goodsCoverImg">
          <el-upload
            class="avatar-uploader"
            :action="state.uploadImgServer"
            accept="jpg,jpeg,png"
            :headers="{
              token: state.token
            }"
            :show-file-list="false"
            :before-upload="handleBeforeUpload"
            :on-success="handleUrlSuccess"
          >
            <img style="width: 100px; height: 100px; border: 1px solid #e9e9e9;" v-if="state.goodForm.goodsCoverImg" :src="state.goodForm.goodsCoverImg" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <!-- <el-form-item label="详情内容">
          <div ref='editor'></div>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="goBack()"><i class="el-icon-back"></i>返回商品列表</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import WangEditor from 'wangeditor'
import axios from '@/utils/axios'
import { Message } from 'element-ui';
import { localGet, uploadImgServer, uploadImgsServer } from '@/utils'


// let instance;

export default{
  data(){
    return {
      state:{
        uploadImgServer,
        token: localGet('token') || '',
        id: this.$route.query.id,
        defaultCate: '',
        goodForm: {
          goodsName: '',
          goodsIntro: '',
          originalPrice: '',
          sellingPrice: '',
          stockNum: '',
          goodsSellStatus: '0',
          goodsCoverImg: '',
          tag: ''
        },
        rules: {
          goodsName: [
            { required: 'true', message: '请填写商品名称', trigger: ['change'] }
          ],
          goodsIntro:[
            { required: 'true', message: '请填写商品简介', trigger: ['change'] }
          ],
          originalPrice: [
            { required: 'true', message: '请填写商品价格', trigger: ['change'] }
          ],
          sellingPrice: [
            { required: 'true', message: '请填写商品售价', trigger: ['change'] }
          ],
          stockNum: [
            { required: 'true', message: '请填写商品库存', trigger: ['change'] }
          ],
        },
      },

    }
  },
  beforeMount(){//当vue组件挂载之前执行
    var id = this.$route.query.id;//可以获取到商品的ID
    if (id) {
      axios.get(`/product/${id}`).then(res => {
        const goods = res
        this.state.goodForm = {
          goodsName: goods.goodsName,//商品名称
          goodsIntro: goods.goodsIntro,//商品简介
          originalPrice: goods.originalPrice,//商品价格
          sellingPrice: goods.sellingPrice,//商品售价
          stockNum: goods.stockNum,//商品库存
          goodsSellStatus: String(goods.goodsSellStatus),//上架状态
          goodsCoverImg: this.$filters.prefix(goods.goodsCoverImg),//商品主图
          tag: goods.tag//商品标签
        }
       
      })
    }
  },
 
  methods:{
    goBack(){//返回商品列表;
      this.$router.push({ path: '/good'});//通过编程式路由跳转到商品列表;
    },
   
  }

}
</script>

<style scoped>
  .add {
    display: flex;
  }
  .add-container {
    flex: 1;
    height: 100%;
  }
  .avatar-uploader {
    width: 100px;
    height: 100px;
    color: #ddd;
    font-size: 30px;
  }
  .avatar-uploader-icon {
    display: block;
    width: 100%;
    height: 100%;
    border: 1px solid #e9e9e9;
    padding: 32px 17px;
  }
</style>