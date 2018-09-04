// pages/index/index.js
const app = getApp()
import {
  fatch,transformtime
} from "../../utils/fatch.js"

Page({
  /*页面的初始数据*/
  data: {
    sowingMap: [],
    allContent: [],
    isLoding: true,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 500,
    date:""
  },
  /* 生命周期函数--监听页面加载*/
  onLoad(options) {
    this.getDate();
    this.getContent();
    // transformtime(){

    // }
  },
  getDate() {
    // this.setData({
    //   isLoading: true
    // })
    fatch.get('/swiper').then(res => {
      // console.log(res) //轮播图接口数据
      this.setData({
        sowingMap: res.data.data,
        isLoding: false,
        // date:
      })
      // console.log(this.data.sowingMap) //轮播图数据
    }).catch(err => {
      this.setData({
        isLoding: false
      })
    })
  },
  getContent() {
    fatch.get('/category/books').then(res => {
      // console.log(res) //首页图书列表接口数据
      this.setData({
        allContent: res.data.data
      })
      console.log(this.data.allContent) //首页图书列表数据
    })
  },
  jumpBook(event) {
    const id = event.currentTarget.id
    console.log(event)
    wx.navigateTo({
      url: `/pages/details/details?id=${id}`,
      success(res) {},
      failn(res) {
        throw res
      },
      complete(res) {}, //接口调用结束的回调函数，无论成功与否都调用
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