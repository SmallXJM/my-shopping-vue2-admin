<template>
  <el-dialog
    :title="type == 'add' ? '添加轮播图' : '修改轮播图'"
    :visible.sync="state.visible"
    width="600px"
  >
    <el-form :model="state.ruleForm" :rules="state.rules" ref="formRef" label-width="100px" class="good-form">
      <el-form-item label="图片" prop="url">
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
          <img style="width: 200px; height: 100px; border: 1px solid #e9e9e9;" v-if="state.ruleForm.url" :src="state.ruleForm.url" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="跳转链接" prop="link">
        <el-input type="text" v-model="state.ruleForm.link"></el-input>
      </el-form-item>
      <el-form-item label="排序值" prop="sort">
        <el-input type="number" v-model="state.ruleForm.sort"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="state.visible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>

import axios from '@/utils/axios'
import { localGet, uploadImgServer } from '@/utils'
import { Message } from 'element-ui';
export default{
  props: {
    type: String,
    reload: Function
  },
  data() {
    return {
      state:{
        uploadImgServer,
        token: localGet('token') || '',
        visible: false,
        ruleForm: {
          url: '',
          link: '',
          sort: ''
        },
        rules: {
          url: [
            { required: 'true', message: '图片不能为空', trigger: ['change'] }
          ],
          sort: [
            { required: 'true', message: '排序不能为空', trigger: ['change'] }
          ]
        },
        id: ''
      }
    }
  },
  methods:{
    getDetail(id){
      axios.get(`/getCarouselDetail/${id}`).then(res => {
        this.state.ruleForm = {
          url: res.carouselUrl,
          link: res.redirectUrl,
          sort: res.carouselRank
        }
      })
    },
    handleBeforeUpload(file){
      const sufix = file.name.split('.')[1] || ''
      if (!['jpg', 'jpeg', 'png'].includes(sufix.toLowerCase())) {
        Message.error('请上传 jpg、jpeg、png 格式的图片')
        return false
      }
    },
    handleUrlSuccess(val){
      this.state.ruleForm.url = val.data || ''
    },
    open(id){
      this.state.visible = true
      if (id) {
        this.state.id = id
        this.getDetail(id)
      } else {
        this.state.ruleForm = {
          url: '',
          link: '',
          sort: ''
        }
      }
    },
    close(){
      this.state.visible = false
    },
    submitForm(){
      //console.log(formRef.value.validate)
      this.$refs['formRef'].validate((valid) => {
        if (valid) {
          if (this.type == 'add') {
            axios.post('/addCarousels', {
              carouselUrl: this.state.ruleForm.url,
              redirectUrl: this.state.ruleForm.link,
              carouselRank: this.state.ruleForm.sort
            }).then(() => {
              Message.success('添加成功')
              this.state.visible = false
              if (this.reload) this.reload()
            })
          } else {
            axios.put('/updateCarousels', {
              carouselId: this.state.id,
              carouselUrl: this.state.ruleForm.url,
              redirectUrl: this.state.ruleForm.link,
              carouselRank: this.state.ruleForm.sort
            }).then(() => {
              Message.success('修改成功')
              this.state.visible = false
              if (this.reload) this.reload()
            })
          }
        }
      })
    }
  }
}

// defineExpose({ open, close })
</script>

<style scoped>
  .avatar-uploader {
    width: 100px;
    height: 100px;
    color: #ddd;
    font-size: 30px;
  }
  .avatar-uploader >>> .el-upload {
    width: 100%;
    text-align: center;
  }
  .avatar-uploader-icon {
    display: block;
    width: 100%;
    height: 100%;
    border: 1px solid #e9e9e9;
    padding: 32px 17px;
  }
</style>