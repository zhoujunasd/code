// pages/index/index.js
const app = getApp()
import {
  fatch,
  transformtime,
  login
} from "../../utils/fatch.js"

Page({
  /*页面的初始数据*/
  data: {
    sowingMap: [], //轮播图数据
    allContent: [], //首页图书列表数据
    moreContent: [], //上拉加载的数据
    hasMore: true, //判断是否还有数据
    isLoding: true, //数据是否加载好
    // 轮播图数据
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 500,
    pn: 1, //控制页面上拉加载数据
    // update: "",//
  },
  /* 生命周期函数--监听页面加载*/
  onLoad(options) {
    this.setData({
      isLoading: true
    })
    Promise.all([this.getDate(), this.getContent()]).then(() => {
      this.setData({
        isLoding: false,
      })
    })
    // this.getDate();
    // this.getContent();
  },
  getDate() {
    return new Promise((resolve, reject) => {
      fatch.get('/swiper').then(res => {
        // console.log(res) //轮播图接口数据
        this.setData({
          sowingMap: res.data.data,
        })
        resolve(res)
        // console.log(this.data.sowingMap) //轮播图数据
      }).catch(err => {
        reject(err)
      })
    })
  },
  getContent() {
    return new Promise((resolve, reject) => {
      fatch.get('/category/books').then(res => {
        // console.log(res) //首页图书列表接口数据
        this.setData({
          allContent: res.data.data
        })
        // console.log(this.data.allContent) //首页图书列表数据
        // let data = this.upDateTime(this.data.allContent)
        let update = this.upDateTime(this.data.allContent)
        // console.log(update)
        this.setData({
          allContent: update
        })
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })

  },
  jumpBook(event) {
    const id = event.currentTarget.id
    // console.log(event)
    wx.navigateTo({
      url: `/pages/details/details?id=${id}`,
      success(res) {},
      failn(res) {
        throw res
      },
      complete(res) {}, //接口调用结束的回调函数，无论成功与否都调用
    })
  },
  upDateTime(data) {
    // let data = this.data.allContent;
    data.forEach(item => {
      let bookdata = item.books
      return bookdata.forEach(item => {
        let trans_time = transformtime(item.updateTime)
        return item.updateTime = trans_time
        // console.log(item)
        // console.log(item.updateTime)
        // console.log(trans_time)
      })
      // console.log(item)
      // console.log(bookdata)
    })
    // console.log(data)
    return data

    // console.log(data) //修改后的时间
    // ?
    // let trantime =  this.data.allContent.forEach(item => {
    //   // console.log(item)
    //   return item.books.forEach(item => {
    //     // console.log(item)
    //     return item.updateTime = transformtime(item.updateTime)
    //     // console.log(item.updateTime)
    //   })
    // })
    // this.setData({
    //   allContent: trantime
    // })
  },
  /* 页面相关事件处理函数--监听用户下拉动作*/
  onPullDownRefresh() {
    // wx.showLoading({
    //   title: '正在加载',
    //   mask:true,
    // })
    this.setData({
      isLoding: true,
      hasMore:true,
      pn:1,
      sowingMap: [],
      allContent: [],
    })
    Promise.all([this.getDate(), this.getContent()]).then(() => {
      // wx.stopPullDownRefresh(),
      wx.hideLoading()
      this.setData({
        isLoding: false,
      })
    })
  },
  getMoreContent() {
    return new Promise((resolve, reject) => {
      fatch.get('/category/books', {
        pn: this.data.pn
      }).then(res => {
        // console.log(res.data.data) //获取的数据
        // let Content = [...this.data.allContent,...res.data.data]
        // this.setData({
        //   moreContent: res.data.data
        // })
        let moreUpdate = this.upDateTime(res.data.data)
        this.setData({
          moreContent: moreUpdate
        })
        this.setData({
          allContent: [...this.data.allContent, ...this.data.moreContent]
        })
        // console.log(this.data.allContent) //时间更新后的数据
        resolve(res);
      })
    })
  },
  /* 页面上拉触底事件的处理函数*/
  onReachBottom() {
    if (this.data.hasMore) {
      this.setData({
        pn: this.data.pn + 1
      })
      this.getMoreContent().then(res => {
        // console.log(res)
        if (res.data.data.length < 2) {
          this.setData({
            hasMore: false
          })
        }
      })
    } else {
      console.log("没有数据了")
    }
  },
  /* 生命周期函数--监听页面初次渲染完成 */
  onReady: function() {

  },

  /* 生命周期函数--监听页面显示*/
  onShow() {},

  /* 生命周期函数--监听页面隐藏*/
  onHide: function() {

  },

  /* 生命周期函数--监听页面卸载*/
  onUnload: function() {

  },


  /* 用户点击右上角分享*/
  onShareAppMessage: function() {

  }
})