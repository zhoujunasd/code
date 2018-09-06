// pages/details/details.js
import {
  fatch,
  transformtime
} from "../../utils/fatch.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookId: "",
    bookDetails: {},
    isLoding: false,
    catalog_id: "",
    catalog: [], //目录内容
    isreading: false, //判断是否读过
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      bookId: options.id,
      isLoding:true
    })
    // 加载是否读过书籍
    this.getReadBook().then(res => {
      // console.log(res)
      if (res.errMsg == "getStorage:ok") {
        this.setData({
          catalog_id: res.data,
          isreading: true
        })
      } else {
        console.log("未阅读，无数据")
        this.setData({
          isreading: false
        })
      }
    })
    // console.log(options) //传递来的id数据
    this.getData()
  },
  getData() {
    this.setData({
      isLoding: true
    })
    fatch.get(`/book/${this.data.bookId}`).then(res => {
      // console.log(res); //获取单本图书的接口数据
      this.setData({
        bookDetails: res.data,
      })
      // console.log(this.data.bookDetails); //单本图书的详细数据
      this.upDate()
    })
    // 将本书的目录,在页面卸载时存至本地缓存
    fatch.get(`/titles/${this.data.bookId}`).then(res => {
      // console.log(res)
      this.setData({
        catalog: res.data.data,
        isLoding: false
      })
    })
  },
  upDate() {
    let data = this.data.bookDetails;
    // console.log(data.data.updateTime)
    data.data.updateTime = transformtime(data.data.updateTime)
    this.setData({
      bookDetails: data
    })
  },
  jumpCatalog(event) {
    // console.log(event)    //点击按钮传递到方法的数据 id
    const ID = event.currentTarget.id
    wx.navigateTo({
      url: `/pages/catalog/catalog?id=${ID}`,
      success(res) {},
      fail(res) {
        console.log(res)
      },
      complete: function(res) {},
    })
  },
  readBook() {
    let bookid = this.data.bookId
    // console.log(bookid)
    let dirconten = this.data.catalog
    // console.log(dirconten)
    if (this.data.isreading) {
      let id = this.data.catalog_id
      wx.navigateTo({
        url: `/pages/book/book?cata_id=${id}&bookId=${bookid}`,
      })
    } else {
      let dirconten = this.data.catalog
      wx.navigateTo({
        url: `/pages/book/book?cata_id=${dirconten[0]._id}&bookId=${bookid}`,
      })
    }
  },
  // getCatalogID() {
  //   return new Promise((resolve, reject) => {
  //     wx.getStorage({
  //       key: "catalog_id",
  //       success(res) {
  //         resolve(res)
  //       },
  //       fail(err) {
  //         reject(err)
  //       }
  //     })
  //   })
  // },
  getReadBook() {
    return new Promise((resolve, reject) => {
      wx.getStorage({
        key: this.data.bookId,
        success(res) {
          // console.log(res) //读取的本地缓存的信息
          resolve(res)
        },
        fail(err) {
          console.log("还未阅读本书")
          // reject(err)
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
    // this.getCatalogID().then((res, err) => {
    //   // console.log(res)
    //   if (err) throw err;
    //   this.setData({
    //     catalog_id: res.data
    //   })
    // })

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
    // wx.removeStorage({
    //   key: 'catalog',
    //   success: function (res) {
    //     // console.log(res.data)
    //     console.log("catalog")
    //   }
    // })
    wx.setStorage({
      key: 'catalog',
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
  onShareAppMessage() {
    return {
      title: this.data.bookDetails.data.title,
      path: `/pages/details/details?id=${this.data.bookId}`,
      imageUrl:this.data.bookDetails.data.img
    }
  }
})