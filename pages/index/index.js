// pages/index/index.js
const app = getApp()
import {
  fatch
} from "../../utils/fatch.js"

Page({
  /*页面的初始数据*/
  data: {
    sowingMap: [],
    allContent: [],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 500
  },
  /* 生命周期函数--监听页面加载*/
  onLoad(options) {
    this.getDate();
    this.getContent()
  },
  getDate() {
    fatch.get('/swiper').then(res => {
      console.log(res)
      this.setData({
        sowingMap: res.data.data
      })
      console.log(this.data.sowingMap)
    })
  },
  getContent() {
    fatch.get('/category/books').then(res => {
      console.log(res)
      this.setData({
        allContent: res.data.data
      })
      console.log(this.data.allContent)
    })
  },

  /* 生命周期函数--监听页面初次渲染完成 */
  onReady: function() {

  },

  /* 生命周期函数--监听页面显示*/
  onShow: function() {

  },

  /* 生命周期函数--监听页面隐藏*/
  onHide: function() {

  },

  /* 生命周期函数--监听页面卸载*/
  onUnload: function() {

  },

  /* 页面相关事件处理函数--监听用户下拉动作*/
  onPullDownRefresh: function() {

  },

  /* 页面上拉触底事件的处理函数*/
  onReachBottom: function() {

  },

  /* 用户点击右上角分享*/
  onShareAppMessage: function() {

  }
})