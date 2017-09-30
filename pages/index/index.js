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
    swiperCurrent: 0
  },
  onLoad: function () {
  },
  // 轮播图点切换
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  //滚动监听
  scroll: function (e) {
  },
  onReachBottom: function () {
    
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
