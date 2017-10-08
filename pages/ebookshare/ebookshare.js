var message = require('../../component/message/message')
var isharereadservice = require('../../comm/script/service')
var config = require('../../comm/script/config')
var app = getApp();
Page({
  data: {
    hasMore: true,
    showLoading: true,
    loadingMsg:"玩命加载中…",
    btnDisable:false,
    showTopTips: false,
    showTipsMsg:"",
    selectShareId:"",
    bookName: "",
    booklist: []
  },
  onLoad: function (options) {
   
    var that = this;
    var url = config.apiList.ebookSharelist + options.bookid;
    //取得目录下的书籍信息
    isharereadservice.fetcheBookShareList.call(that, url)
    that.setData({
      bookName: options.bookname
    })

    var ishareuserid = app.globalData.ishareuserid;
    if (ishareuserid === "") {
      //登陆
      wx.navigateTo({
        url: '../login/login'
      })
    }

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
   
    if (that.data.selectShareId==="")
    {
      tipMsg = "请选择需要推送的电子书";
      that.setData({
        showTopTips: showTopTips,
        showTipsMsg: tipMsg
      });
    }
    else if (e.detail.value.mail==="")
    {
      tipMsg="请输入邮箱";
      that.setData({
        showTopTips: showTopTips,
        showTipsMsg: tipMsg
      });
    }
    else
    {
      that.setData({
        btnDisable: true,
        showTopTips:false
      });
      var url = config.apiList.sendebookmail;
      var ishareuserid = app.globalData.ishareuserid;
      console.log("ishareuserid="+ishareuserid);
      if (ishareuserid==="")
      {
        that.setData({
          btnDisable: false
        });
        //登陆
        wx.navigateTo({
          url: '../login/login'
        })
      }
      else
      {
        //邮箱推送
        isharereadservice.sendEbookMail.call(that,url,ishareuserid,e.detail.value.mail, that.data.selectShareId);
      }
    }
    setTimeout(function () {
      that.setData({
        showTopTips: false
      });
    }, 3000);
  }
});
