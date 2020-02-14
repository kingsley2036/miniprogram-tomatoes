// pages/tomato/tomato.js
const { http } = require('../../lib/http.js')
const app = getApp()
const { app_id, app_secret } = app.globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultSecond: 6,
    time: null,
    timer: null,
    timerStatus: true,
    visibleAbandon: false,
    description: '',
    againButtonVisible: false,
    visibleFinished: false,
    id: null,
    tomato: null,
    completed:false,
    abandon:false
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
    this.startTimer()
    http.post('/tomatoes').then(res => {
      console.log(res)
      this.data.id = res.data.resource.id
      this.data.tomato = res.data.resource
    }).catch(err => {
      console.log(err)
    })
  },
  startTimer() {
    let timer = setInterval(() => {
      this.data.defaultSecond--;
      this.changeTime()
    }, 1000)
    this.data.timer = timer;
  },
  changeTime() {
    if (this.data.defaultSecond === 0) {
      clearTimeout(this.data.timer)
      this.setData({ againButtonVisible: true })
      this.setData({ visibleFinished: true })
      this.data.completed=true;
    }
    let min = Math.floor(this.data.defaultSecond / 60)
    let sec = Math.floor(this.data.defaultSecond % 60)
    if (sec < 10) {
      sec = `0${sec}`;
    }
    if (min < 10) {
      min = `0${min}`;
    }
    this.time = `${min} : ${sec}`;
    this.setData({ time: this.time })

  },
  pause() {
    clearTimeout(this.data.timer)
    this.setData({ timerStatus: false })
  },
  start() {
    this.startTimer()
    this.setData({ timerStatus: true })
  },
  abandonShow() {
    this.setData({ visibleAbandon: true })
    this.pause()
  },
  confirmAbandon(e) {
    // this.data.description=e.detail;
    let description = e.detail;
    let id = this.data.id
    console.log(id)
    this.abandon(id, description)
    // this.setData({ defaultSecond: 1500 })
    // this.changeTime()
    // this.pause()
    // this.setData({ visibleAbandon: false })
    this.data.abandon=true
    wx.navigateBack({
      to: -1
    })

  },
  hideAbandon() {
    this.setData({ visibleAbandon: false })
    this.start()
  },
  againTimer() {
    this.setData({ againButtonVisible: false })
    this.setData({ defaultSecond: 1500 })
    this.changeTime()
    this.start()
    this.data.completed = false;
  },
  confirmFinished(e) {
    this.setData({ visibleFinished: false })
    console.log(e)
    let id=this.data.id
    let description=e.detail
    http.put(`/tomatoes/${id}`, { description: description, aborted: false })
      .then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    // wx.navigateBack({
    //   to: -1
    // })
  },
  hideFinished() {
    this.setData({ visibleFinished: false })
    wx.navigateBack({
      to: -1
    })
  },
  abandon(id, description = '放弃') {
    http.put(`/tomatoes/${id}`, { description: description, aborted: true })
      .then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    if (this.data.completed || this.data.abandon) { return }
    let id = this.data.id
    this.abandon(id)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    if (this.data.completed || this.data.abandon){return}
    let id = this.data.id
    this.abandon(id)
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