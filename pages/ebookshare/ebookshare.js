var message = require('../../component/message/message')
var isharereadfetch = require('../../comm/script/fetch')
var config = require('../../comm/script/config')
Page({
  data: {
    hasMore: true,
    showLoading: true,
    curPage: 1,
    pageSize: 10,
    bookClassId: 0,
    bookClassName: "",
    booklist: []
  },
  onLoad: function (options) {
    var that = this;
    console.log(options);
    var bookClassId = options.bookClassId;
    var bookClassName = options.bookClassName;
    var url = config.apiList.booklist + bookClassId;
    that.setData({
   
    })
  }
});
