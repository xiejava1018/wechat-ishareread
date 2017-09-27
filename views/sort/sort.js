const isharereadAPIUrl = require('../../config').isharereadUrl

Page({
  data:{
    selectedclass:"",
    bookclassArray:[
      /*
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
      */
    ],
    booklist:[]
  },
  onLoad:function(options)
  {
    var self = this;
    var getParentClassApi = isharereadAPIUrl +"/bookclass/parentclass";
    wx.request({
      url: getParentClassApi,
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //howRequestInfo()
        console.log(res.data)
        self.setData({
          bookclassArray: res.data.body.bookclasslist
        })
      }
    })
  },
  sortChangeSort: function (e) {
    var self = this;
    var currentTarget = e.currentTarget,
    index = currentTarget.dataset.sortIndex;
    var bookClassId = this.data.bookclassArray[index].bookClassId;
    var selectedclass = this.data.bookclassArray[index].bookClassName;
    //取得目录下的书籍信息
    var getParentClassApi = isharereadAPIUrl + "/wxapi/book/booklist/" + bookClassId +"?pageSize=5&curPage=0";
    wx.request({
      url: getParentClassApi,
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //howRequestInfo()
        console.log(res.data)
        self.setData({
          selectedclass: selectedclass,
          booklist: res.data.body.booklist
        })
      }
    })
  }
});
