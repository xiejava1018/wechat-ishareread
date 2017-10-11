var message = require('../../component/message/message')
var isharereadservice = require('../../comm/script/service')
var config = require('../../comm/script/config')
Page({
  data: {
    hasMore: true,
    showLoading: true,
    curPage: 1,
    bookId:'',
    bookName:'',
    cansharelist: []
  },
  onLoad: function (options) {
    var that = this;
    console.log(options);
    var bookId = options.bookid;
    var bookName = options.bookname;
    var url = config.apiList.getcansharelist + bookId;
    that.setData({
      hasMore: true,
      showLoading: true,
      bookName: bookName
    })
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
            cansharelist: res.data.body.canshareList
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
})