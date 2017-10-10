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
    userInfo: null,
    openid: null
  },
  onLoad: function (options) {
    var that = this;
    //获取微信登录用户信息
    if (app.globalData.userInfo != null) {
      that.setData({
        userInfo: app.globalData.userInfo,
        openid: app.globalData.openid
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
    var formData = e.detail.value;
    if (e.detail.value.username === "") {
      tipMsg = "请输入用户名";
      that.setData({
        showTopTips: showTopTips,
        showTipsMsg: tipMsg
      });
    }
    else if (e.detail.value.password.length < 4) {
      tipMsg = "请输入密码并且长度大于4";
      that.setData({
        showTopTips: showTopTips,
        showTipsMsg: tipMsg
      });
    }
    else if (e.detail.value.password != e.detail.value.confirmpassword) {
      tipMsg = "确认密码不一致";
      that.setData({
        showTopTips: showTopTips,
        showTipsMsg: tipMsg
      });
    }
    else if (e.detail.value.email==="") {
      tipMsg = "请输入Email";
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
      var url = config.apiList.touserRegist;

      //验证用户名口令
      wx.request({
        url: url,
        data: formData,
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          console.log(res.data);
          var result = res.data;
          if (res.data === "注册成功") {
            that.setData({
              showTopTips: true,
              showTipsMsg: '注册成功！'
            });
            wx.navigateBack({
              delta: 1
            })
          } else {
            that.setData({
              showTopTips: true,
              showTipsMsg: res.data
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
  },
  bindAgreeChange: function (e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  }
});