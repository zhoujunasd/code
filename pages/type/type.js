// pages/type/type.js
import {
  fatch,
  transformtime
} from "../../utils/fatch.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type_id: "", //书籍种类的ID
    isloading: false, //判断数据是否加载好
    type_book: {}, //相同种类的书籍数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options)
    this.setData({
      type_id: options.typeId,
      isloading: true
    })
    // console.log(this.data.type_id)
    this.getData()
  },
  getData() {
    fatch.get(`/category/${this.data.type_id}/books`).then(res => {
      // console.log(res)
      // this.setData({
      //   type_book: res.data.data,
      //   isloading: false
      // })
      // console.log(res.data.data)
      this.update_time(res.data.data).then(res => {
        //  console.log(res)
        this.setData({
          type_book: res,
          isloading: false
        })
        console.log(this.data.type_book)
      })
      // console.log(this.data.type_book)
    }).catch(err => {
      console.log("获取数据失败")
      this.setData({
        isloading: false
      })
    })
  },
  update_time(data) {
    // console.log(data)
    return new Promise((resolve, reject) => {
      try {
        data.books.forEach(item => {
          item.updateTime = transformtime(item.updateTime)
        })
        // console.log(data)
        resolve(data)
      } catch (err) {
        reject(`${err}：修改时间时出错`)
      }
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