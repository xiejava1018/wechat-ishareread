var message = require('../../component/message/message')
var isharereadfetch = require('../../comm/script/fetch')
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
    //取得目录下的书籍信息
    isharereadfetch.fetchBookList.call(that, url, bookClassName, that.data.curPage, that.data.pageSize)
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
      isharereadfetch.fetchBookList.call(that, url, that.data.bookClassName, that.data.curPage, that.data.pageSize)
    }
  }
});
