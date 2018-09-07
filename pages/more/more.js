// pages/more/more.js
import {
  fatch,
  transformtime
} from "../../utils/fatch.js"

// 可以试着将本地的阅读数据，同步到本页

Page({

  /**
   * 页面的初始数据
   */
  data: {
    readList: [],
    // progress: []
    // bookId: [],
    isLoging: false, //判断是否已经登录
    isLoading: false, //判断数据是否加载好
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      isLoading: true
    })
    try {
      let islogin = wx.getStorageSync("isLogin")
      if (islogin == "") {
        // console.log(`a${islogin}b`)
        this.setData({
          isLoging: false,
          isLoading: false,
        })
      } else {
        this.getData()
        this.setData({
          isLoging: islogin,
          isLoading: false,
        })
      }
    } catch (e) {
      console.log(e)
    }
    // console.log(islogin)
  },
  getData() {
    this.setData({
      isLoading: true
    })
    fatch.get("/readList").then(res => {
      this.setData({
        readList: res.data.data,
      })
      // console.log(this.data.readList)
      // this.getCatalog()
      // parseInt方法无法直接在页面内使用
      this.data.readList.forEach(item => {
        // console.log(item)
        let num = parseInt(((item.title.index + 1) / item.title.total) * 100)
        // console.log(num)
        item.progress = num
        item.updatedTime = transformtime(item.updatedTime)
        // console.log(item)
      })
      // console.log(this.data.readList)
      // 修改数据后，需要进行重新赋值，才会渲染数据
      this.setData({
        readList: this.data.readList,
        isLoading: false
      })
      this.sync_data()
    })
  },
  to_details(event) {
    const id = event.currentTarget.id
    wx.navigateTo({
      url: `/pages/details/details?id=${id}`,
      success() {},
      fail(err) {
        console.log(err)
      }
    })
  },
  read_on(event) {
    // console.log(event) 从点击事件获取的数据
    const book_id = event.currentTarget.dataset.id
    const cata_id = event.currentTarget.id
    wx.navigateTo({
      url: `/pages/book/book?cata_id=${cata_id}&bookId=${book_id}`,
      success(res) {},
      fail(res) {},
    })
  },
  // 将网上的阅读记录，同步到本地，并且覆盖本地的记录，将本地的阅读记录同步到网上有点麻烦，就直接覆盖吧
  sync_data() {
    this.data.readList.forEach(item => {
      // console.log(item);
      wx.setStorage({
        key: item.title.bookId,
        data: item.title._id,
        success(res) {
          // console.log("成功同步网上数据")
        },
        fail(err) {
          console.log("数据同步失败")
        }
      })
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
    try {
      let islogin = wx.getStorageSync("isLogin")
      if (islogin == "") {
        // console.log(`a${islogin}b`)
        this.setData({
          isLoging: false
        })
      } else {
        this.getData()
        this.setData({
          isLoging: islogin
        })
      }
    } catch (e) {
      console.log(e)
    }
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