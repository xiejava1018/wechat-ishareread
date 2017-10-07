const isharereadAPIUrl = require('../../config').isharereadUrl
var isharereadservice = require('../../comm/script/service')
var config = require('../../comm/script/config')
Page({
  data: {
    hasMore: true,
    showLoading: true,
    start: 0,
    bookClassName: "",
    bannerList: config.bannerList,
    bookclassArray: [
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
    booklist: []
  },
  onLoad: function (options) {
    var that = this;
    //isharereadfetch.fetchBookClass.call(that, config.apiList.bookclasslist, that.data.start);
    var defclass = 0;
    var url = config.apiList.booklist + defclass;
    var selectedclass = this.data.bookclassArray[defclass].bookClassName;
    //取得默认目录下的书籍信息
    isharereadservice.fetchBookList.call(that, url, selectedclass, 1, 5);
  },
  viewSearch: function () {
    console.log('gotosearch...');
    wx.switchTab({
      url: '../sort/sort'
    })
  }
});
