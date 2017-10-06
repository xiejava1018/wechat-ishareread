var message = require('../../component/message/message')
var isharereadfetch = require('../../comm/script/fetch')
var config = require('../../comm/script/config')
Page({
  data: {
    hasMore: true,
    showLoading: true,
    showTopTips: false,
    showTipsMsg:"",
    selectShareId:"",
    bookName: "",
    booklist: []
  },
  onLoad: function (options) {
    var that = this;
    console.log(options);
    var url = config.apiList.ebookSharelist + options.bookid;
    //取得目录下的书籍信息
    isharereadfetch.fetcheBookShareList.call(that, url)
    that.setData({
      bookName: options.bookname
    })
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    var that = this;
    var radioItems = this.data.booklist;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].ebookShareId == e.detail.value;
    }
    that.setData({
      booklist: radioItems,
      selectShareId: e.detail.value
    });
  },

  bindFormSubmit:function(e) {
    var that = this;
    var tipMsg="";
    var showTopTips=true;
    console.log(that.data);
  
    if (that.data.selectShareId=="")
    {
      tipMsg = "请选择需要推送的电子书";
    }
    else if (e.detail.value.mail=="")
    {
      tipMsg="请输入邮箱";
    }
    else
    {
      showTopTips=false;
      //邮箱推送
    }
    this.setData({
      showTopTips: showTopTips,
      showTipsMsg:tipMsg
    });
    setTimeout(function () {
      that.setData({
        showTopTips: false
      });
    }, 3000);
  }
});
