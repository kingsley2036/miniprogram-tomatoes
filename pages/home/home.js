// pages/home/home.js
const { http } = require('../../lib/http.js')
const app = getApp()
const { app_id, app_secret } = app.globalData
Page({
  data: {
    visibleCreateConfirm: false,
    visibleUpdateConfirm: false,
    lists: [],
    updateContent:null,
    id:null
  },
  getLists(e) {
    http.get('/todos?completed=false').then(res => {
      console.log(res)
      let lists = res.data.resources
      this.setData({ lists: lists })
    }).catch(err => {
      console.log(err)
    })
  },
  createToDO(content) {
    http.post('/todos', { description: content }).then(res => {
      console.log(res)
      this.getLists()    
    }).catch(err => {
      console.log(err)
    })
  },
 
  confirmCreate(e) {
    console.log(e)
    let content = e.detail;
    if (content) {
      this.createToDO(content)
      this.hideCreateConfirm()
      
    }

  },
  destroyTodo(e) {
    let index = e.currentTarget.dataset.index
    let id = e.currentTarget.dataset.id
    this.data.lists[index].completed = true
    http.put(`/todos/${id}`, { completed:true}).then(res=>{
      console.log(res)
      this.setData({ lists: this.data.lists })
    }).catch(err=>{
      console.log(err)
    })
  },
  editToDo(e) {
    let index = e.currentTarget.dataset.index
    let id = e.currentTarget.dataset.id
    this.data.id = id
    let content = this.data.lists[index].description
    this.setData({ updateContent: content})
    this.showUpdateConfirm()
  },
  confirmUpdate(e){
    console.log(e)
    let content = e.detail
    let id=this.data.id
    http.put(`/todos/${id}`,{ completed: false, description: content})
    .then(res=>{
      this.getLists()
      this.hideUpdateConfirm()
      this.data.updateContent=null
    }).catch(err=>{
      console.log(err)
    })
  },

  hideCreateConfirm(e) {
    this.setData({ visibleCreateConfirm: false })
  },
  showCreateConfirm(e) {
    this.setData({ visibleCreateConfirm: true })
  },
  hideUpdateConfirm(e){
    this.setData({ visibleUpdateConfirm: false })
  },
  showUpdateConfirm(e) {
    this.setData({ visibleUpdateConfirm: true })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLists()
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