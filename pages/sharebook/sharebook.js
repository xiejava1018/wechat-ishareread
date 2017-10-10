var isharereadservice = require('../../comm/script/service')
var util = require('../../util/util')
var config = require('../../comm/script/config')
var app = getApp();
Page({
  data: {
    showTopTips: false,
    sharetypes: ["出借", "交换", "赠送"],
    sharetypeIndex: 0,
    userId: "",
    bookId:"", 
    shareType:"出借",
    btnDisable: false,
    btnLoading:false,
    inputCount:0,
    qtype:'',
    id:''
  },
  onLoad: function (options) {
    var ishareuserid = app.globalData.ishareuserid;
    if (ishareuserid === "") {
      //登陆
      wx.navigateTo({
        url: '../login/login'
      })
    }
    else
    {
      console.log(options);
      this.setData({
        userId: ishareuserid,
        bookId:options.bookid,
        qtype:options.qtype,
        id:options.id
      })
      var titlestr = '分享《'+options.bookname+'》'
      wx.setNavigationBarTitle({
        title: titlestr
      })
    }
  },
  showTopTips: function () {
    var that = this;
    this.setData({
      showTopTips: true
    });
    setTimeout(function () {
      that.setData({
        showTopTips: false
      });
    }, 3000);
  },
  bindShareTypeChange: function (e) {
    this.setData({
      sharetypeIndex: e.detail.value,
      shareType: this.data.sharetypes[e.detail.value]
    })
  },
  inputtextarea:function(e)
  {
    this.setData({
      inputCount: e.detail.value.length
    })
  },
  bindFormSubmit: function (e){
    var that=this;
    var formData = e.detail.value;
    var url = config.apiList.dosharebook;
    that.setData({
      btnDisable: true,
      btnLoading:true
    });
    //分享书籍
    wx.request({
      url: url,
      data: formData,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res.data);
        var result = res.data;
        if (res.data === 1) {
          that.setData({
            showTopTips: true,
            showTipsMsg: '分享成功！'
          });
          var backurl = '../bookdetail/bookdetail?qtype=' + that.data.qtype + '&id=' + that.data.id
          console.log(backurl)
          wx.redirectTo(
            {
              url: backurl
            }
          )
        } else {
          that.setData({
            showTopTips: true,
            showTipsMsg: '分享失败！'
          })
        }
        setTimeout(function () {
          that.setData({
            showTopTips: false
          });
        }, 3000);
        typeof cb == 'function' && cb(res.data)
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
          showLoading: false,
          btnDisable: false,
          btnLoading: false
        })
        typeof complete_cb == 'function' && complete_cb()
      }
    })

  }
});