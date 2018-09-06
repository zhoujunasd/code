// pages/person/person.js
import {
  login
} from "../../utils/fatch.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
   let is_login = wx.getStorageSync("isLogin")
    this.setData({
      hasUserInfo: is_login
    })
    // login()
    wx.getUserInfo({
      success: (data) => {
        console.log(data)
        this.setData({
          userInfo: data.userInfo,
          hasUserInfo: true
        })
        wx.setStorageSync("isLogin", this.data.hasUserInfo)
      }
    })
  },
  getUserInfo: function(e) {
    login()
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    wx.setStorageSync("isLogin", this.data.hasUserInfo)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})