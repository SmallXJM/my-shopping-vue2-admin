<!-- template写html; -->
<template>
  <div class="login-body">
    <div class="login-container">
      <div class="head">
        <div class="name">
          <div class="title">网上商城</div>
          <div class="tips">Vue2.0 后台管理系统</div>
        </div>
      </div>
      <el-form label-position="top" :rules="rules" :model="ruleForm" ref="loginForm" class="login-form">
        <el-form-item label="账号" prop="username">
          <el-input type="text" v-model.trim="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model.trim="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <div style="color: #333">登录表示您已同意<a>《服务条款》</a></div>
          <el-button style="width: 100%" type="primary" @click="submitForm('loginForm')">立即登录</el-button>
          <el-checkbox v-model="checked" @change="!checked">下次自动登录</el-checkbox>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<!-- javascript的vue的代码 -->
<script>
import axios from '@/utils/axios'
import md5 from 'js-md5'
import { localSet } from '@/utils'

export default {
    name: 'login',
    data(){
      return {
        ruleForm: {
          username: '',//用户名
          password: ''//密码
        },
        checked: true,
        rules: {
          username: [
            { required: 'true', message: '账户不能为空', trigger: 'blur' }
          ],
          password: [
            { required: 'true', message: '密码不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods:{
      //提交表单
       submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //提交的地址url:http://localhost:8088/manage-api/v1/adminUser/login
            axios.post('/adminUser/login', {
              loginUserName: this.ruleForm.username || '',
              //passwordMd5: this.$md5(this.ruleForm.password)
              loginPassword: this.ruleForm.password
            }).then(res => {
              console.log('submitForm(formName) 管理员登录 ------------>',res);
              
              localSet('adminObj', res)
              window.location.href = '/'//跳转到首页
            })
          } else {
            console.log('error submit!!')
            return false;
          }
        })
      },
      //重置
      resetForm:() => {
        this.$refs[formName].resetFields();
      }
    }
    
};


</script>


<!-- 写css的样式 -->
<style scoped>
  .login-body {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: #fff;
  }
  .login-container {
    width: 420px;
    height: 500px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0px 21px 41px 0px rgba(0, 0, 0, 0.2);
  }
  .head {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 0 20px 0;
  }
  .head img {
    width: 100px;
    height: 100px;
    margin-right: 20px;
  }
  .head .title {
    font-size: 28px;
    color: #f56c6c;
    font-weight: bold;
  }
  .head .tips {
    font-size: 12px;
    color: #999;
  }
  .login-form {
    width: 70%;
    margin: 0 auto;
  }
  .login-form >>> .el-form--label-top .el-form-item__label {
    padding: 0;
  }
  .login-form >>> .el-form-item {
    margin-bottom: 0;
  }
</style>