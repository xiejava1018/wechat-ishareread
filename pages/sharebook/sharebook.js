var isharereadservice = require('../../comm/script/service')
var util = require('../../util/util')
var config = require('../../comm/script/config')
var app = getApp();
Page({
  data: {
    showTopTips: false,
    sharetypes: ["出借", "交换", "赠送"],
    sharetypeIndex: 0,
    userId: "",
    bookId:"", 
    shareType:"出借",
    btnDisable: false,
  },
  onLoad: function (options) {
    var ishareuserid = app.globalData.ishareuserid;
    if (ishareuserid === "") {
      //登陆
      wx.navigateTo({
        url: '../login/login'
      })
    }
    else
    {
      this.setData({
        userId: ishareuserid,
        bookId:options.bookid
      })
    }
  },
  showTopTips: function () {
    var that = this;
    this.setData({
      showTopTips: true
    });
    setTimeout(function () {
      that.setData({
        showTopTips: false
      });
    }, 3000);
  },
  bindShareTypeChange: function (e) {
    console.log(e);
    this.setData({
      sharetypeIndex: e.detail.value
    })
  },
  bindFormSubmit: function (e){
    var formData = e.detail.value;
    console.log(formData);
  }
});