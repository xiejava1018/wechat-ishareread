var message = require('../../component/message/message')
var isharereadservice = require('../../comm/script/service')
var config = require('../../comm/script/config')
var app = getApp();
Page({
  data: {
    showTopTips: false,
    showLoading: true,
    bookhaveId: '0',
    username:'',
    userShare:{},
    ishareuserid:'',
    btnDisable: false,
    btnLoading: false,
  },
  onLoad: function (options) {
    var that = this;
    console.log(options);
    var bookhaveId = options.bookhaveId;
    var url = config.apiList.getusercanshare + bookhaveId;
    var ishareuserid = app.globalData.ishareuserid;
    that.setData({
      username: options.username,
      bookhaveId: bookhaveId,
      ishareuserid: ishareuserid
    })
    //判断是否登录
    console.log(ishareuserid)
    if (ishareuserid === "") {
      //登陆
      wx.navigateTo({
        url: '../login/login'
      })
    }
    else{
        //取得书籍的分享信息
        wx.request({
          url: url,
          method: 'GET',
          header: {
            "Content-Type": "application/json,application/json"
          },
          success: function (res) {
            console.log(res.data);
            var result = res.data;
            if (res.data.status === "200") {
              that.setData({
                userShare: res.data.body.userShare,
                userShareDate: res.data.body.userShare.haveDate.substring(0, res.data.body.userShare.haveDate.length-2)
              });
            }
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
              showLoading: false
            })
          }
        })
    }
  },
  bindFormSubmit: function (e) {
    var that = this;
    var formData = e.detail.value;
    var url = config.apiList.dosendmsg;
    //判断是否登录
    if (that.data.ishareuserid === "") {
      //登陆
      wx.navigateTo({
        url: '../login/login'
      })
    }
    else
    {
      that.setData({
        btnDisable: true,
        btnLoading: true,
      });
      console.log(formData);
        //留言
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
            if (res.data === 1) {
              that.setData({
                showTopTips: true,
                showTipsMsg: '留言成功！'
              });
              var backurl = '../sendmsg/sendmsg?bookhaveId=' + that.data.bookhaveId + '&username=' + that.data.username
              console.log(backurl)
              wx.redirectTo(
                {
                  url: backurl
                }
              )
            } else {
              that.setData({
                showTopTips: true,
                showTipsMsg: '留言失败！'
              })
            }
            setTimeout(function () {
              that.setData({
                showTopTips: false
              });
            }, 3000);
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
              btnDisable: false,
              btnLoading: false
            })
          }
        })
      }
    }
})