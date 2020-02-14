// pages/me/me.js
const { http } = require('../../lib/http.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab:'tomato',
    lists:[],
    tomatoes:{},
    todos:{}
  },
  changeTab(e){
    console.log(e)
    let name=e.currentTarget.dataset.name
    this.setData({ tab: name })
  },
  fetchTomatoes() {
    http.get('/tomatoes', { is_group: "yes" }).then(res => {
      let tomatoes=res.data.resources
      this.setData({ tomatoes: tomatoes})

    }).catch(err=>{
      console.log(err)
    })
  },
  fetchTodos() {
    http.get('/todos', { is_group: "yes" }).then(res => {
      let todos = res.data.resources
      this.setData({ todos: todos})
    }).catch(err => {
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    http.get('/tomatoes', { is_group: "yes"}).then(res=>{
      console.log(res)
    })
    http.get('//todos', { is_group: "yes" }).then(res => {
      console.log(res)
    })
    this.fetchTomatoes()
    this.fetchTodos()
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