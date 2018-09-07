// pages/book/book.js
import {
  fatch
} from "../../utils/fatch.js"
const app = getApp()
// // 引入markdown格式渲染后，的事件绑定
// 'bind:touchstart', 'bind:touchmove', 'bind:touchcancel', 'bind:touchend',
// 'bind:tap', 'bind:longpress', 'bind:longtap', 'bind:transitionend',
// 'bind:animationstart', 'bind:animationiteration', 'bind:animationend', 'bind:touchforcechange'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookId: "", //在文章信息里面有bookid
    catalogId: "", //章节的id
    article: {}, //文章的详细内容
    catalog: [], //文章列表数据
    catalot_title: "",
    isShow: false, //章节列表是否显示
    scrollTop: 0, //设置滚动条的高度
    isMenu: false, //菜单显示与否
    font: 42, //字体大小
    isData: true, //loading图标
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // console.log(options) //从图书章节获取的数据，bookid以及catalogid
    this.setData({
      bookId: options.bookId,
      catalogId: options.cata_id
    })
    this.getData()
    this.getCatalog().then( res => {
      // console.log(res) //成功时传递过来的数据
      this.setData({
        catalog: res.data
      })
      // console.log(this.data.catalog) //获取到列表的数据
    }).catch(err=>{
      // console.log("本地缓存没有目录数据")
      fatch.get(`/titles/${this.data.bookId}`).then(res => {
        this.setData({
          catalog: res.data.data,
        })
        // console.log(this.data.catalog) //图书列表数据
      })
    })

    // //自定义事件，格式为`eventRun_`+`绑定类型`+`_`+`事件类型`
    // //例如`bind:touchstart`则为：
    // this['eventRun_bind_touchmove'] = (event) => {
    //   // console.log(event.target.dataset._el);     // 打印出元素信息
    //   console.log('touchmove')
    // };
  },
  getData() {
    this.timeout_Func()
    fatch.get(`/article/${this.data.catalogId}`).then(res => {
      // let data = app.towxml.toJson(res.data.data.article.content, 'markdown');
      // //设置文档显示主题，默认'light'
      // // data.theme = 'dark';

      // console.log(res) // 根据catalogid获取的文章的内容
      this.setData({
        isData: false,
        article: res.data.data.article,
        scrollTop: 0,
        catalot_title: res.data.data.title,
        catalogId: res.data.data.article._id
      })
      wx.hideToast()
      // console.log(this.data.article) //转换后的数据
      // console.log(this.data.catalot_title) //章节题目
    }).catch(err => {
      wx.showToast({
        title: '数据获取失败',
        icon: "none"
      })
    })
    // 将章节数存进本地缓存
    // console.log(this.data.catalogId)
    const catalog_ID = this.data.catalogId
    const bookID = this.data.bookId
    // wx.setStorage({
    //   key: 'catalog_id',
    //   data: catalog_ID
    // })
    wx.setStorage({
      key: bookID,
      // data: catalog_ID,
      data:this.data.catalogId
    })
  },
  timeout_Func() {
    this.setData({
      isData: true
    })
    setTimeout((() => {
      if (this.data.isData) {
        wx.showToast({
          title: '',
          icon: "loading",
          duration: 5000
        })
      }
    }).bind(this), 500)
  },
  fontSizeAdd() {
    if (this.data.font > 54) {
      wx.showModal({
        title: '字体',
        content: '字体已至最大',
        showCancel: false
      })
    } else {
      this.setData({
        font: this.data.font + 2
      })
    }
  },
  fontSizeSub() {
    if (this.data.font < 30) {
      wx.showModal({
        title: '字体',
        content: '字体已至最小',
        showCancel: false
      })
    } else {
      this.setData({
        font: this.data.font - 2
      })
    }
  },
  catalogSub() {
    // console.log(this.data.article.index) // 本章节数据
    let catalogid = this.data.article.index;
    // console.log(catalogid)
    if (catalogid) {
      // let a= this.data.catalog[catalogid+1]._id //章节目录中的数据id
      // console.log(a)
      this.setData({
        catalogId: this.data.catalog[catalogid - 1]._id
      })
      this.getData()
    } else {
      // showToast有延迟，不可用于数据加载时的动画，即使没有延迟，也会在数据加载时出现
      // 可以设置一个监听器，当数据加载超过一秒时，显示loading图标
      wx.showToast({
        title: '已经是第一章',
        icon: "success"
      })
    }
  },
  catalogAdd() {
    let catalogid = this.data.article.index;
    if (this.data.catalog[catalogid + 1]) {
      this.setData({
        catalogId: this.data.catalog[catalogid + 1]._id
      })
      this.getData()
    } else {
      wx.showToast({
        title: '已经是最后一章',
        icon: "success"
      })
    }
  },
  getCatalog() {
    // fatch.get(`/titles/${this.data.bookId}`).then(res=>{
    //   // console.log(res)
    // })
    return new Promise((resolve, reject) => {
      wx.getStorage({
        key: "catalog",
        success(res) {
          // console.log(res.data) //本地缓存的目录数据
          resolve(res)
        },
        fail(err) {
          // console.log(err)
          reject(err)
        }
      })
    })
  },
  getfontSize() {
    return new Promise((resolve, reject) => {
      wx.getStorage({
        key: "fontsize",
        success(res) {
          resolve(res)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  },
  toggleCatalog() {
    this.setData({
      isShow: !this.data.isShow,
      isMenu: !this.data.isMenu
    })
  },
  handleGet(en) {
    // console.log(en) //点击时获取的图书章节的id
    this.setData({
      catalogId: en.currentTarget.dataset.id
    })
    this.getData()
    this.toggleCatalog()

  },
  click() {
    this.setData({
      isMenu: !this.data.isMenu
    })
  },
  hiddenMenu(e) {
    this.setData({
      isData: true
    })
    // console.log(e) 
    this.setData({
      isMenu: !this.data.isMenu
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.getfontSize().then((res, err) => {
      if (err) throw err;
      // console.log(res.data)
      this.setData({
        font: res.data
      })
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    // wx.setStorage({
    //   key: bookID,
    //   data: catalog_ID,
    // })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    wx.setStorage({
      key: 'fontsize',
      data: this.data.font
    })
    // console.log(this.data.font)
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