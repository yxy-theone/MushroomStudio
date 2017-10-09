//index.js
//获取应用实例
const app = getApp()
var util = require('../../utils/util.js');
Page({
  data: {
    imgUrls: [
      'https://yuphp.cn/images/slide1.jpg',
      'https://yuphp.cn/images/slide2.jpg',
      'https://yuphp.cn/images/slide3.jpg',
    ],
    autoplay: false,
    swiperCurrent: 0,
    list_data: [],
    page: 1,
    on_req: false,
    no_more:false,
    on_fiexd: false
  },
  // 请求案例列表并保存
  req: function () {
    var self = this;
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    setTimeout(function () {
      wx.request({
        url: 'https://www.yuphp.cn/api.php?act=getCaseList',
        data: {
          page: self.data.page
        },
        success(res) {
          if (res.data.is_success) {
            self.setData({
              list_data: res.data.data
            })
          } else {
            self.setData({
              list_data: 0
            })
          }
          wx.hideLoading()
        }
      })
    }, 100)
  },
  onLoad: function () {
    this.req();//请求案例列表
  },
  // 轮播图点切换
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  //滚动监听
  scroll: function (e) {
    var self = this,
    scrollTop = self.data.scrollTop;
    if (e.detail.scrollTop > 360 && !self.data.on_fiexd) {
      self.setData({
        scrollTop: 361,
        on_fiexd: true
      })
    }
    if (e.detail.scrollTop < 360 && self.data.on_fiexd) {
      self.setData({
        scrollTop: 0,
        on_fiexd: false
      })
    }
  },
  onReachBottom: function () {
    var self = this;
    if (self.data.on_req) {
      return false;
    }
    if (self.data.no_more){
      return false;
    }
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    var old_list = this.data.list_data;
    if (!self.data.on_req) {
      self.setData({
        on_req: true
      })
      self.data.page++
      wx.request({
        url: 'https://www.yuphp.cn/api.php?act=getCaseList',
        data: {
          page: self.data.page
        },
        success(res) {
          if (res.data.is_success == false) {
            self.data.page--
            self.setData({
              no_more: true,
            })
            wx.hideLoading()
            wx.showModal({
              title: res.data.data,
              showCancel: false
            })
          } else {
            var new_list = old_list.concat(res.data.data)
            self.setData({
              list_data: new_list,
            })
          }
          self.setData({
            on_req: false
          })
          wx.hideLoading()
        }
      })
    }
  },
  // 返回顶部
  toTop: function () {
    this.setData({
      scrollY: 0
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    // app.globalData.userInfo = e.detail.userInfo
    // this.setData({
    //   userInfo: e.detail.userInfo,
    //   hasUserInfo: true
    // })
  },
  onShareAppMessage: function (res) {
    var self = this
    return {
      title: '蘑菇工作室',
      path: '/page/index/index'
    }
  }
})
