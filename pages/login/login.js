var message = require('../../component/message/message')
var isharereadservice = require('../../comm/script/service')
var config = require('../../comm/script/config')
var app = getApp();
Page({
  data: {
    hasMore: true,
    showLoading: true,
    loadingMsg: "玩命加载中…",
    btnDisable: false,
    showTopTips: false,
    showTipsMsg: "",
    userInfo:null,
    openid:null,
    location:null,
  },
  onLoad: function (options) {
    var that = this;
    //获取微信登录用户信息
    if (app.globalData.userInfo != null) {
      that.setData({
        userInfo: app.globalData.userInfo,
        openid: app.globalData.openid,
        location: app.globalData.location
      })
    } else {
      app.getUserInfo()
    }
 
    console.log(app.globalData.userInfo);
  },
  bindFormSubmit: function (e) {
    var that = this;
    var tipMsg = "";
    var showTopTips = true;
    var formData=e.detail.value;
    if (e.detail.value.username === "") {
      tipMsg = "请输入登录名/邮箱";
      that.setData({
        showTopTips: showTopTips,
        showTipsMsg: tipMsg
      });
    }
    else if (e.detail.value.password === "") {
      tipMsg = "请输入密码";
      that.setData({
        showTopTips: showTopTips,
        showTipsMsg: tipMsg
      });
    }
    else {
      that.setData({
        btnDisable: true,
        showTopTips: false
      });
      var url = config.apiList.tologin;

      //验证用户名口令
      wx.request({
        url: url,
        data:formData,
        method: 'GET',
        header: {
          "Content-Type": "application/json,application/json"
        },  
        success: function (res) {
          console.log(res.data);
          var result = res.data;
          if (res.data.body.result === "1") {
            that.setData({
              showTopTips: true,
              showTipsMsg: '登录成功！'
            });
            app.globalData.openid=res.data.body.user.wxOpenid;
            app.globalData.ishareuserid = res.data.body.user.id;
            /*
            wx.switchTab({
              url: '../mine/mine'
            })
            */
            wx.navigateBack({
              delta: 1
            })
          } else {
            that.setData({
              showTopTips: true,
              showTipsMsg: '登录名或密码不正确，登录失败！'
            })
          }
          setTimeout(function () {
            that.setData({
              showTopTips: false
            });
          }, 3000);
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
        },
        complete: function () {
          that.setData({
            showLoading: false,
            btnDisable: false
          })
          typeof complete_cb == 'function' && complete_cb()
        }
      })
       

    }
    setTimeout(function () {
      that.setData({
        showTopTips: false
      });
    }, 3000);
  }
});