var message = require('../../component/message/message')
var isharereadservice = require('../../comm/script/service')
var config = require('../../comm/script/config')
var app = getApp();
Page({
  data: {
    showTopTips: false,
    showLoading: true,
    bookhaveId: '0',
    username:'',
    userShare:{},
    ishareuserid:'',
    btnDisable: false,
    btnLoading: false,
    inputCount: 0,
    borrowMsgs:[],
    distance:'',
    userInfo:{}
  },
  onLoad: function (options) {
    var that = this;
    console.log(options);
    var bookhaveId = options.bookhaveId;
    var url = config.apiList.getusercanshare + bookhaveId;
    var ishareuserid = app.globalData.ishareuserid;
    var userInfo = app.globalData.userInfo;
    that.setData({
      username: options.username,
      bookhaveId: bookhaveId,
      ishareuserid: ishareuserid,
      userInfo: userInfo
    })
    //判断是否登录
    console.log(ishareuserid)
    if (ishareuserid === "") {
      //登陆
      wx.navigateTo({
        url: '../login/login'
      })
    }
    else{
        //取得书籍的分享信息
        wx.request({
          url: url + "/" + ishareuserid,
          method: 'GET',
          header: {
            "Content-Type": "application/json,application/json"
          },
          success: function (res) {
            console.log(res.data);
            var result = res.data;
            if (res.data.status === "200") {
              that.setData({
                userShare: res.data.body.userShare,
                userShareDate: res.data.body.userShare.haveDate.substring(0, res.data.body.userShare.haveDate.length-2),
                distance: res.data.body.distance
              });
              //
              getborromsg.call(that,bookhaveId);
            }
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
              showLoading: false
            })
          }
        })
    }
  },
  bindFormSubmit: function (e) {
    var that = this;
    var formData = e.detail.value;
    var bookhaveId = formData.bookhaveId;
    var url = config.apiList.dosendmsg;
    //判断是否登录
    if (that.data.ishareuserid === "") {
      //登陆
      wx.navigateTo({
        url: '../login/login'
      })
    }
    else
    {
        console.log(formData);
        if (formData.borrowmsg.length<5)
        {
          that.setData({
            showTopTips:true,
            showTipsMsg:'说点什么吧，至少5个字哦。'
          });
        }
        else{
        that.setData({
          btnDisable: true,
          btnLoading: true,
        });
        console.log(formData);
          //留言
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
                wx.showToast({
                  title: "成功"
                })
                /*
                var backurl = '../sendmsg/sendmsg?bookhaveId=' + that.data.bookhaveId + '&username=' + that.data.username
                console.log(backurl)
                wx.redirectTo(
                  {
                    url: backurl
                  }
                )*/
                getborromsg.call(that, bookhaveId);
              } else {
                that.setData({
                  showTopTips: true,
                  showTipsMsg: '留言失败！'
                })
              }
              setTimeout(function () {
                that.setData({
                  showTopTips: false
                });
              }, 3000);
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
            }
          })
        }
      }
    setTimeout(function () {
      that.setData({
        showTopTips: false
      });
    }, 3000);
    },
  inputtextarea: function (e) {
    this.setData({
      inputCount: e.detail.value.length
    })
  }
})

function getborromsg(bookhaveId, cb, fail_cb, complete_cb)
{
  var that = this;
  var url = config.apiList.getBorrowMsg + bookhaveId;
  wx.request({
    url: url,
    data: {
    },
    method: 'GET',
    header: {
      "Content-Type": "application/json,application/json"
    },
    success: function (res) {
        that.setData({
          borrowMsgs: res.data.body.borrowMsgList,
          showLoading: false
        })
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
      typeof fail_cb == 'function' && fail_cb()
    },
    complete: function () {
      that.setData({
        showLoading: false
      })
      typeof complete_cb == 'function' && complete_cb()
    }
  })
}
module.exports = {
  getborromsg: getborromsg
}