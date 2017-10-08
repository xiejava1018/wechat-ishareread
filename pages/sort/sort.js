var message = require('../../component/message/message')
var isharereadservice = require('../../comm/script/service')
var config = require('../../comm/script/config')
Page({
  data:{
    hasMore: true,
    showLoading: true,
    start: 0,
    bookClassName:"",
    bookclassArray:[
      {
        "bookClassOrder": 0,
        "bookClassId": 1,
        "bookClassDesc": "",
        "bookParentClassName": "",
        "bookParentClassId": 0,
        "bookClassName": "小说作品",
        "subBookClass": []
      },
      {
        "bookClassOrder": 0,
        "bookClassId": 2,
        "bookClassDesc": "",
        "bookParentClassName": "",
        "bookParentClassId": 0,
        "bookClassName": "成功励志",
        "subBookClass": []
      },
      {
        "bookClassOrder": 0,
        "bookClassId": 3,
        "bookClassDesc": "",
        "bookParentClassName": "",
        "bookParentClassId": 0,
        "bookClassName": "经济管理",
        "subBookClass": []
      },
      {
        "bookClassOrder": 0,
        "bookClassId": 4,
        "bookClassDesc": "",
        "bookParentClassName": "",
        "bookParentClassId": 0,
        "bookClassName": "人文社科",
        "subBookClass": []
      },
      {
        "bookClassOrder": 0,
        "bookClassId": 5,
        "bookClassDesc": "",
        "bookParentClassName": "",
        "bookParentClassId": 0,
        "bookClassName": "品质生活",
        "subBookClass": []
      },
      {
        "bookClassOrder": 0,
        "bookClassId": 6,
        "bookClassDesc": "",
        "bookParentClassName": "",
        "bookParentClassId": 0,
        "bookClassName": "两性情感",
        "subBookClass": []
      },
      {
        "bookClassOrder": 0,
        "bookClassId": 7,
        "bookClassDesc": "",
        "bookParentClassName": "",
        "bookParentClassId": 0,
        "bookClassName": "科学技术",
        "subBookClass": []
      },
      {
        "bookClassOrder": 0,
        "bookClassId": 8,
        "bookClassDesc": "",
        "bookParentClassName": "",
        "bookParentClassId": 0,
        "bookClassName": "亲子少儿",
        "subBookClass": []
      },
      {
        "bookClassOrder": 0,
        "bookClassId": 9,
        "bookClassDesc": "",
        "bookParentClassName": "",
        "bookParentClassId": 0,
        "bookClassName": "名著译著",
        "subBookClass": []
      },
      {
        "bookClassOrder": 0,
        "bookClassId": 10,
        "bookClassDesc": "",
        "bookParentClassName": "",
        "bookParentClassId": 0,
        "bookClassName": "杂志期刊",
        "subBookClass": []
      }
 
    ],
    booklist:[]
  },
  onLoad:function(options)
  {

  },
  search: function (e) {
    var that = this
    var keyword = e.detail.value.keyword
    if (keyword == '') {
      message.show.call(that, {
        content: '请输入内容',
        icon: 'null',
        duration: 1500
      })
      return false
    } else {
      /*
      var searchUrl = that.data.searchType == 'keyword' ? config.apiList.search.byKeyword : config.apiList.search.byTag
      wx.redirectTo({
        url: '../searchResult/searchResult?url=' + encodeURIComponent(searchUrl) + '&keyword=' + keyword
      })
      */
    }
  },
  searchByBookClass:function (e)
  {
    var that = this;
    var currentTarget = e.currentTarget;
    var index = currentTarget.dataset.sortIndex;
    var bookClassId = this.data.bookclassArray[index].bookClassId;
    var selectedclass = this.data.bookclassArray[index].bookClassName;
    //跳转到书籍列表页面
    wx.navigateTo({
      url: '../booklist/booklist?bookClassId='+bookClassId+'&bookClassName='+selectedclass
    })
  },
  search: function (e) {
    var that = this;
    var keyword = e.detail.value.keyword;
    //跳转到书籍列表页面
    wx.navigateTo({
      url: '../bookshresult/bookshresult?keyword=' + keyword
    })
  },
});
