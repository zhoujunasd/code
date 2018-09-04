// pages/book/book.js
import {
  fatch
} from "../../utils/fatch.js"
const app = getApp()

// 引入markdown格式渲染后，的事件绑定
'bind:touchstart', 'bind:touchmove', 'bind:touchcancel', 'bind:touchend',
'bind:tap', 'bind:longpress', 'bind:longtap', 'bind:transitionend',
'bind:animationstart', 'bind:animationiteration', 'bind:animationend', 'bind:touchforcechange'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // bookId: "",  //在文章信息里面有bookid
    catalogId: "", //章节的id
    article: {}, //文章的详细内容
    catalog: [], //文章列表数据
    isShow: false, //章节列表是否显示
    scrollTop: 0, //设置滚动条的高度
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options) //从图书章节获取的数据，bookid以及catalogid
    this.setData({
      // bookId: options.bookId,
      catalogId: options.cata_id
    })
    this.getData()
    this.getCatalog().then((res, err) => {
      if (err) throw err;
      // console.log(res) //成功时传递过来的数据
      this.setData({
        catalog: res.data
      })
      // console.log(this.data.catalog) //获取到列表的数据
    })
    //自定义事件，格式为`eventRun_`+`绑定类型`+`_`+`事件类型`
    //例如`bind:touchstart`则为：
    this['eventRun_bind_touchmove'] = (event) => {
      // console.log(event.target.dataset._el);     // 打印出元素信息
      // console.log('touchmove')
    };
  },
  getData() {
    fatch.get(`/article/${this.data.catalogId}`).then(res => {
      // console.log(res) // 根据catalogid获取的文章的内容
      let data = app.towxml.toJson(res.data.data.article.content, 'markdown');
      //设置文档显示主题，默认'light'
      // data.theme = 'dark';
      this.setData({
        article: data
      })
      // console.log(this.data.article)  //转换后的数据
    })
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
          reject(err)
        }
      })
    })
  },
  toggleCatalog() {
    this.setData({
      isShow: !this.data.isShow
    })
  },
  handleGet(en) {
    // console.log(en) //点击时获取的图书章节的id
    this.setData({
      catalogId: en.currentTarget.dataset.id
    })
    this.getData()
    this.toggleCatalog()
    
    // this.goTop()
  },
  // goTop() {
  //   this.setData({
  //     scrollTop: 0
  //   })
  //   console.log(this.data.scrollTop)
  // },
  // scroll(e) {
  //   this.setData({
  //     scrollTop: e.detail.scrollTop
  //   })
  //   console.log(this.data.scrollTop)
  // },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

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
    wx.removeStorage({
      key: 'catalog',
      success: function(res) {
        console.log(res.data)
      }
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