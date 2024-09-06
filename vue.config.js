/*
 * @Author: yingzi
 * @Date: 2024-07-11 09:13:04
 * @LastEditors: yingzi
 * @LastEditTime: 2024-08-19 18:54:24
 * @Description: 请填写简介
 */
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false //关闭了eslint的代码检查
})
