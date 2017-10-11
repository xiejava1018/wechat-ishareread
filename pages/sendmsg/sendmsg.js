var message = require('../../component/message/message')
var isharereadservice = require('../../comm/script/service')
var config = require('../../comm/script/config')
var app = getApp();
Page({
  data: {
    showLoading: true,
    bookhaveId: '0',
    username:''
  },
  onLoad: function (options) {
    var that = this;
    console.log(options);
    var bookhaveId = options.bookhaveId;
    that.setData({
      username: options.username
    })
  }
})