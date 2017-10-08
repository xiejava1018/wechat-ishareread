var message = require('../../component/message/message')
var isharereadservice = require('../../comm/script/service')
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
    var keyword = options.keyword;
    var url = config.apiList.search.byKeyword;
    that.setData({
      hasMore: true,
      showLoading: true
    })
    wx.setNavigationBarTitle({
      title: keyword+'的搜索结果'
    })
    //取得目录下的书籍信息
    isharereadservice.search.call(that, url, keyword)
  }
});
