// pages/collect/collect.js
import {
  fatch
} from "../../utils/fatch.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collect_data: [], //存放收藏记录的书籍信息
    isLoading: false, //判断是否加载完数据
    del_color: "#87ceeb", //长按点击后icon的颜色
    // is_del:false,
    is_Show: false, //删除功能是否显示
    is_able: false, //删除键是否可用
    isLogin: false, //判断是否登录
    num: 0, //====================================================================
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      isLoading: true,
      isLogin: false
    })
    let that = this
    wx.getUserInfo({
      success(data) {
        // console.log(data)
          that.getData()
      },
      fail() {
        // this.setData({
        //     isLogin: false
        // })
        // wx.showToast({
        //   title: '未登录',
        //   image: "/static/images/error.png",
        //   duration:1000
        // })
        that.setData({
          isLoading: false,
          isLogin: false,

        })
        // console.log(err)
      }
    })
  },
  getData() {
    // this.setData({
    //   isLoading: true
    // })
    fatch.get("/collection").then(res => {
      // console.log(res)
      res.data.data.forEach(item => {
        item.is_del = false
      })
      this.setData({
        collect_data: res.data.data,
        isLoading: false,
        isLogin: true
      })
      // console.log(this.data.collect_data)
    })
  },
  go_detail(en) {
    // console.log(en)
    let bookid = en.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/details/details?id=${bookid}`,
      success(res) {},
      fail(res) {},
    })
  },
  //===================
  // 每一个书籍信息需要一个数据dele_btn:true，记录是否点击了删除的icon
  // 每次点击都需要改变一次icon的color
  // 长按，改变数据的dele_btn值，并且显示所有的icon
  // 需要一个删除按钮，点击时删除，在长按后，显示出来
  longpress(en) {
    let book_id = en.currentTarget.dataset.id
    // console.log(book_id)
    this.data.collect_data.forEach(item => {
      // console.log(item)
      if (item.book._id == book_id) {
        item.is_del = true
      }
    })
    this.setData({
      collect_data: this.data.collect_data,
      is_Show: true,
      is_able: true,
      num: 1
    })
    // console.log(this.data.num)//=====================================================
    // console.log(this.data.collect_data)

    // this.setData({
    //   is_del:true
    // })
  },
  // 单个书籍的长按删除功能，不用
  // longpress(en){
  //   let book_id = en.currentTarget.dataset.id
  //   console.log(en)
  //   // console.log("删除书籍")
  //   fatch.del(`/collection/${book_id}`).then(res=>{
  //     this.getData()
  //     console.log("书籍删除成功")
  //   }).catch(err=>{
  //     console.log("书籍删除失败")
  //   }
  //   )
  // },
  del_book_on() {
    let book_will_del = []
    this.data.collect_data.forEach(item => {
      if (item.is_del == true) {
        book_will_del.push(item.book._id)
      }
    })
    // console.log(book_will_del)
    fatch.post(`/collection/delete`, {
      arr: book_will_del
    }).then(res => {
      this.getData()
      this.setData({
        is_able: false
      })
    }).catch(err => {
      wx.showToast({
        title: '删除失败',
        image: "/static/images/error.png",
        duration: 1000
      })
    })
  },
  del_cilck(en) {
    // console.log(en)
    let book_id = en.currentTarget.dataset.id
    this.data.collect_data.forEach(item => {
      // console.log(item)
      if (item.book._id == book_id) {
        if (item.is_del == true) {
          item.is_del = false
          this.data.num -= 1
        } else if (item.is_del == false) {
          item.is_del = true
          this.data.num += 1
        }
      }
    })
    // console.log(this.data.num)
    if (this.data.num >= 1) {
      this.setData({
        collect_data: this.data.collect_data,
        is_able: true
      })
    } else {
      this.setData({
        collect_data: this.data.collect_data,
        is_able: false
      })
    }

    // if (en.currentTarget.dataset.id == '#87ceeb'){
    //   this.setData({
    //     del_color: "#ccc"
    //   })
    // }else{
    //   this.setData({
    //     del_color: "#87ceeb"
    //   })
    // }
  },
  cancel_btn() {
    this.data.collect_data.forEach(item => {
      item.is_del = false
    })
    this.setData({
      collect_data: this.data.collect_data,
      is_Show: false
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