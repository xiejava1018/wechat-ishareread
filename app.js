var config = require('comm/script/config')
//app.js
App({
  onLaunch: function () {
    // 获取用户信息
    this.getUserInfo();
    this.initStorage();
  },

  getUserInfo: function (cb) {
    var that = this;
    var url = config.apiList.getopenid;
    wx.login({
      success: function (res) {
        console.log(res);
        //获取openId
        wx.request({
          url: url,
          data: {
            js_code:res.code
          },
          method: 'GET',
          header: {
            "Content-Type": "application/json,application/json"
          },
          success: function (res) {
            that.globalData.openid=res.data.openid;
            that.globalData.ishareuserid=res.data.ishareuserid;
            typeof cb == 'function' && cb(res.data)
          },
          fail: function () {
            that.setData({
              showLoading: false
            })
            message.show.call(that, {
              content: '网络开小差了',
              icon: 'offline',
              duration: 3000
            })
          }
        });
        wx.getUserInfo({
          success: function (res) {
            that.globalData.userInfo = res.userInfo
            typeof cb == "function" && cb(that.globalData.userInfo)
          }
        })
      }
    })
  },
  initStorage: function () {
    wx.getStorageInfo({
      success: function (res) {
        // 判断书籍收藏是否存在，没有则创建
        if (!('book_favorite' in res.keys)) {
          wx.setStorage({
            key: 'book_favorite',
            data: []
          })
        }
        // 判断人物收藏是否存在，没有则创建
        if (!('person_favorite' in res.keys)) {
          wx.setStorage({
            key: 'person_favorite',
            data: []
          })
        }
        // 判断电影浏览记录是否存在，没有则创建
        if (!('film_history' in res.keys)) {
          wx.setStorage({
            key: 'film_history',
            data: []
          })
        }
        // 判断人物浏览记录是否存在，没有则创建
        if (!('person_history' in res.keys)) {
          wx.setStorage({
            key: 'person_history',
            data: []
          })
        }
        // 个人信息默认数据
        var personInfo = {
          name: '',
          nickName: '',
          gender: '',
          age: '',
          birthday: '',
          constellation: '',
          company: '',
          school: '',
          tel: '',
          email: '',
          intro: ''
        }
        // 判断个人信息是否存在，没有则创建
        if (!('person_info' in res.keys)) {
          wx.setStorage({
            key: 'person_info',
            data: personInfo
          })
        }
        // 判断相册数据是否存在，没有则创建
        if (!('gallery' in res.keys)) {
          wx.setStorage({
            key: 'gallery',
            data: []
          })
        }
        // 判断背景卡选择数据是否存在，没有则创建
        if (!('skin' in res.keys)) {
          wx.setStorage({
            key: 'skin',
            data: ''
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    openid:null,
    ishareuserid:null
  }
})