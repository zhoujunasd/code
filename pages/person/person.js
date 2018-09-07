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
    // hasUserInfo 存到了本地缓存，来判读是否登录，在登录时赋值，并存至本地缓存，不是很合理===================待改进
    hasUserInfo: false, //判断是否登录
    isLoading: false, //判断是否加载好数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      isLoading: true,
      // hasUserInfo: false
    })
    // try {
    //  let is_login = wx.getStorageSync("isLogin")
    //   this.setData({
    //     hasUserInfo: is_login
    //   })
    //   console.log(this.data.hasUserInfo)
    // } catch (e) {
    //   this.setData({
    //     hasUserInfo: false
    //   })
    //   console.log("第一次进，未登陆")
    // }

    let is_login = wx.getStorageSync("isLogin")
    // if (is_login == "") {
    //   // console.log("还没有数据")
    //   this.setData({
    //     hasUserInfo: false
    //   })
    // } else {
    //   this.setData({
    //     hasUserInfo: is_login
    //   })
    // }

    if (is_login == true){
      this.setData({
        hasUserInfo: is_login
      })
    }else{
      this.setData({
        hasUserInfo: false
      })
    }

    // console.log("error")
    // console.log(this.data.hasUserInfo)

    // login()
    // 可以在页面内调用wx.getUserInfo判断是否登录，现在已经写成这样了，不改了========================================
    wx.getUserInfo({
      success: (data) => {
        // console.log(data)
        this.setData({
          userInfo: data.userInfo,
          hasUserInfo: true,
          isLoading: false
        })
        wx.setStorageSync("isLogin", this.data.hasUserInfo)
      },
      fail: (err) => {
        console.log("登录失败")
        this.setData({
          isLoading: false
        })
      }
    })
  },
  getUserInfo: function(e) {
    this.setData({
      isLoading: true
    })
    console.log(e)
    if (e.detail.errMsg == "getUserInfo:fail auth deny") {
      console.log("未授权")
      this.setData({
        hasUserInfo: false
      })
      wx.setStorageSync("isLogin", this.data.hasUserInfo)
      this.setData({
        isLoading: false
      })
    } else {
      login().then(res => {
        console.log(res)
        if (res.data.code == 200) {
          this.setData({
            isLoading: false
          })
        }
      }).catch(err => {
        throw err
      })
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      wx.setStorageSync("isLogin", this.data.hasUserInfo)
    }
  },
  go_mycollect() { //============================================================
    wx.navigateTo({
      url: "/pages/collect/collect",
      success(res) {
        // console.log("跳转成功")
      },
      fail(res) {
        console.log(res)
      },
    })
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