// pages/details/details.js
import {
  fatch
} from "../../utils/fatch.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookId: "",
    bookDetails: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options) //传递来的id数据
    this.setData({
      bookId:options.id
    })
    this.getData() 
  },
  getData() {
    fatch.get(`/book/${this.data.bookId}`).then(res => {
      console.log(res); //获取单本图书的接口数据
      this.setData({
        bookDetails: res.data
      })
      // console.log(this.data.bookDetails); //单本图书的详细数据
    })
  },
  jumpCatalog(event){
    // console.log(event)    //点击按钮传递到方法的数据 id
    const ID = event.currentTarget.id
    wx.navigateTo({
      url: `/pages/catalog/catalog?id=${ID}`,
      success(res) {},
      fail(res) {console.log(res)},
      complete: function(res) {},
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