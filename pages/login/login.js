// pages/login/login.js
const { http } = require('../../lib/http.js')
const app = getApp()
const { app_id, app_secret } = app.globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  login(event) { 
    let code, iv, encrypted_data
    encrypted_data = event.detail.encryptedData
    iv = event.detail.iv
    wx.login({
      success(res) {
        code = res.code;
        http.post('/sign_in/mini_program_user', {
          code,
          iv,
          encrypted_data,
          app_id,
          app_secret
        }).then(res=>{
          console.log(res)
          wx.setStorageSync('me', res.data.resource)
          wx.setStorageSync('X-token', res.header['X-token'])
          wx.reLaunch({
            url: '/pages/home/home',
          })
        }).catch(err=>{
          console.log(err)
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})