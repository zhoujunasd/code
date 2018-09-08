// pages/catalog/catalog.js
import {
  fatch
} from "../../utils/fatch.js"


Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookID: "",
    catalog: [],
    isLoding:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options) //从书籍详情页获取的信息 id
    this.setData({
      bookID: options.id
    })
    this.getData()
  },
  getData() {
    this.setData({
      isLoding:true
    })
    // console.log(this.data.bookID)
    fatch.get(`/titles/${this.data.bookID}`).then(res => {
      // console.log(res) //获取的图书列表接口数据
      this.setData({
        catalog: res.data.data,
        isLoding: false
      })
      // console.log(this.data.catalog) //图书列表数据
    })
    // 存到本地缓存
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
    wx.setStorage({
      key: this.data.bookID,
      data: this.data.catalog
    })
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