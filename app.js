var config = require('comm/script/config')
//app.js
App({
  onLaunch: function () {
    // 获取用户信息
    this.getUserInfo();
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

  globalData: {
    userInfo: null,
    openid:null
  }
})