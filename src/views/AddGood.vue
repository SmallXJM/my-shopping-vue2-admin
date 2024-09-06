<!--
 * @Author: yingzi
 * @Date: 2024-08-26 20:22:35
 * @LastEditors: yingzi
 * @LastEditTime: 2024-08-26 20:52:08
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
        <el-form-item  label="商品主图" prop="goodsCoverImg">
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
        <el-form-item label="详情内容">
          <div ref='editor'></div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitAdd()">{{ state.id ? '立即修改' : '立即创建' }}</el-button>
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
        // categoryId: '',
        // category: {
        //   lazy: true,
        //   lazyLoad(node, resolve) {
        //     const { level = 0, value } = node
        //     axios.get('/categories', {
        //       params: {
        //         pageNumber: 1,
        //         pageSize: 1000,
        //         categoryLevel: level + 1,
        //         parentId: value || 0
        //       }
        //     }).then(res => {
        //       const list = res.list
        //       const nodes = list.map(item => ({
        //         value: item.categoryId,
        //         label: item.categoryName,
        //         leaf: level > 1
        //       }))
        //       resolve(nodes)
        //     })
        //   }
        // }
      },

    }
  },
  beforeMount(){
   
  },
 
  methods:{
    submitAdd(){
      this.$refs['goodRef'].validate((vaild) => {
        if (vaild) {
          // 默认新增用 post 方法
          let httpOption = axios.post
          let params = {
            //goodsCategoryId: this.state.categoryId,
            goodsCategoryId: 20,//默认商品类别ID是20
            goodsCoverImg: this.state.goodForm.goodsCoverImg,
            //goodsDetailContent: instance.txt.html(),
            goodsDetailContent:'商品介绍加载中...',
            goodsIntro: this.state.goodForm.goodsIntro,
            goodsName: this.state.goodForm.goodsName,
            goodsSellStatus: this.state.goodForm.goodsSellStatus,
            originalPrice: this.state.goodForm.originalPrice,
            sellingPrice: this.state.goodForm.sellingPrice,
            stockNum: this.state.goodForm.stockNum,
            tag: this.state.goodForm.tag
          }
          console.log('params', params)
          if (this.id) {
            params.goodsId = this.id
            // 修改商品使用 put 方法
            httpOption = axios.put
          }
          httpOption('/product/addProduct', params).then(() => {
            Message.success(this.id ? '修改成功' : '添加成功')
            this.$router.push({ path: '/good' });//跳转到商品列表;
          })
        }
      })
    },
    handleBeforeUpload(file){
      const sufix = file.name.split('.')[1] || ''
      if (!['jpg', 'jpeg', 'png'].includes(sufix)) {
        Message.error('请上传 jpg、jpeg、png 格式的图片')
        return false
      }
    },
    handleUrlSuccess(val){
      this.state.goodForm.goodsCoverImg = val.data || ''
    },
    handleChangeCate(val){
      this.state.categoryId = val[2] || 0
    }
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