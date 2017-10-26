var message = require('../../component/message/message')
var isharereadservice = require('../../comm/script/service')
var config = require('../../comm/script/config')
Page({
  data:{
    hasMore: true,
    showLoading: true,
    curPage: 1,
    pageSize:10,
    bookClassId:0,
    bookClassName:"",
    booklist:[]
  },
  onLoad:function(options)
  {
    var that = this;
    console.log(options);
    var bookClassId = options.bookClassId;
    var bookClassName = options.bookClassName;
    var url = config.apiList.booklist + bookClassId;
    that.setData({
      hasMore: true,
      showLoading: true,
      bookClassId: bookClassId,
      bookClassName: bookClassName
    })
    wx.setNavigationBarTitle({
      title: bookClassName
    })
    //取得目录下的书籍信息
    isharereadservice.fetchBookList.call(that, url, bookClassName, that.data.curPage, that.data.pageSize)
  },
  onPullDownRefresh: function (options)
  {
    console.log("booklist-onPullDownRefresh-options="+options);
    this.onLoad();
  },
  onReachBottom: function (options) {
    var that = this;
    var url = config.apiList.booklist + that.data.bookClassId;
    console.log(url);
    if (!that.data.showLoading) {
      isharereadservice.fetchBookList.call(that, url, that.data.bookClassName, that.data.curPage, that.data.pageSize)
    }
  },
  actionSheetTap: function () {
    wx.showActionSheet({
      itemList: ['加入我的书架', '加入我的书单'],
      success: function (e) {
        console.log(e.tapIndex)
      }
    })
  }
});
