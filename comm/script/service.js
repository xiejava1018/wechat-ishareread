var config = require('./config.js')
var message = require('../../component/message/message')

// 获取书籍目录列表
function fetchBookClass(url, start, count, cb, fail_cb) {
  var that = this
  message.hide.call(that)
  if (that.data.hasMore) {
    wx.request({
      url: url,
      data: {
        city: config.city,
        start: start,
        count: config.count
      },
      method: 'GET',
      header: {
        "Content-Type": "application/json,application/json"
      },
      success: function (res) {
        if (res.data.body.bookclasslist.length === 0) {
          that.setData({
            hasMore: false,
          })
        } else {
          that.setData({
            bookclassArray: res.data.body.bookclasslist,
            showLoading: false
          })
          console.log(that.data.start);
        }
        wx.stopPullDownRefresh()
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
        wx.stopPullDownRefresh()
        typeof fail_cb == 'function' && fail_cb()
      }
    })
  }
}

// 获取书籍列表
function fetchBookList(url, selectedclass,curPage, pageSize, cb, fail_cb) {
  var that = this
  message.hide.call(that)
  if (that.data.hasMore) {
    wx.request({
      url: url,
      data: {
        pageSize: pageSize,
        curPage: curPage
      },
      method: 'GET', 
      header: {
        "Content-Type": "application/json,application/json"
      },
      success: function(res){
        console.log(res.data);
        if (res.data.body.booklist.length === 0){
          that.setData({
            hasMore: false,
          })
        }else{
          that.setData({
            bookClassName: selectedclass,
            booklist: that.data.booklist.concat(res.data.body.booklist),
            curPage: that.data.curPage+1,
            showLoading: false
          })
          console.log("curPage="+curPage);
        }
        wx.stopPullDownRefresh()
        typeof cb == 'function' && cb(res.data)
      },
      fail: function() {
        that.setData({
            showLoading: false
        })
        message.show.call(that,{
          content: '网络开小差了',
          icon: 'offline',
          duration: 3000
        })
        wx.stopPullDownRefresh()
        typeof fail_cb == 'function' && fail_cb()
      }
    })
  }
}

// 获取书籍详情
function fetchBookDetail(url, id, cb) {
  var that = this;
  message.hide.call(that)
  wx.request({
    url: url + id,
    method: 'GET',
    header: {
      "Content-Type": "application/json,application/json"
    },
    success: function(res){
      if(res.data.code===6000)
      {
        that.setData({
          showLoading: false,
          showContent: false
        })
        message.show.call(that, {
          content: 'Sorry,没有找到该书的信息!',
          icon: 'offline',
          duration: 3000
        })
      }
      else
      {
        that.setData({
          bookDetail: res.data,
          showLoading: false,
          showContent: true
        })
        wx.setNavigationBarTitle({
            title: res.data.title
        })
      }
      typeof cb == 'function' && cb(res.data)
    },
    fail: function() {
      that.setData({
          showLoading: false
      })
      message.show.call(that,{
        content: '网络开小差了',
        icon: 'offline',
        duration: 3000
      })
    }
  })
}


// 获取电子书分享列表
function fetcheBookShareList(url,cb, fail_cb) {
  var that = this
  message.hide.call(that)
  if (that.data.hasMore) {
    wx.request({
      url: url,
      data: {
      },
      method: 'GET',
      header: {
        "Content-Type": "application/json,application/json"
      },
      success: function (res) {
        if (res.data.shareEbooks.length === 0) {
          that.setData({
            hasMore: false,
            showLoading: false
          })
        } else {
          that.setData({
            booklist: res.data.shareEbooks,
            showLoading: false
          })
        }
        wx.stopPullDownRefresh()
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
        wx.stopPullDownRefresh()
        typeof fail_cb == 'function' && fail_cb()
      }
    })
  }
}

//通过电子邮件推送书籍
function sendEbookMail(url, ishareuserid,receiver, shareId, cb, fail_cb, complete_cb) {
  var that = this;
  console.log(receiver);
  message.hide.call(that)
  if (that.data.hasMore) {
    wx.request({
      url: url,
      data: {
        ishareuserid: ishareuserid,
        receiver: receiver,
        shareId: shareId
      },
      method: 'GET',
      header: {
        "Content-Type": "application/json,application/json"
      },
      success: function (res) {
        wx.showToast({
          title: "推送成功"
        });
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
          showLoading: false,
          btnDisable: false,
          btnLoading: false
        })
        typeof complete_cb == 'function' && complete_cb()
      }
    })
  }
}

// 获取人物详情
function fetchPersonDetail(url, id, cb) {
  var that = this;
  message.hide.call(that)
  wx.request({
    url: url + id,
    method: 'GET', 
    header: {
      "Content-Type": "application/json,application/json"
    },
    success: function(res){
      that.setData({
        personDetail: res.data,
        showLoading: false,
        showContent: true
      })
      wx.setNavigationBarTitle({
          title: res.data.name
      })
      wx.stopPullDownRefresh()
      typeof cb == 'function' && cb(res.data)
    },
    fail: function() {
      that.setData({
          showLoading: false
      })
      message.show.call(that,{
        content: '网络开小差了',
        icon: 'offline',
        duration: 3000
      })
    }
  })
}

// 搜索（关键词或者类型）
function search(url, keyword, cb){
  var that = this
  message.hide.call(that)
  var url = decodeURIComponent(url)
  if (that.data.hasMore) {
    wx.request({
      url: url,
      data: {
        q: keyword
      },
      method: 'GET',
      header: {
        "Content-Type": "application/json,application/json"
      },
      success: function(res){
        console.log(res.data);
        if (res.data.body.booklist=== null||res.data.body.booklist.length === 0){
          that.setData({
            hasMore: false,
            showLoading: false
          })
        }else{
          that.setData({
            booklist: res.data.body.booklist,
            showLoading: false
          })
        }
        typeof cb == 'function' && cb(res.data)
      },
      fail: function() {
        that.setData({
            showLoading: false
        })
        message.show.call(that,{
          content: '网络开小差了',
          icon: 'offline',
          duration: 3000
        })
      },
      complete: function () {
        that.setData({
          showLoading: false
        })
        typeof complete_cb == 'function' && complete_cb()
      }
    })
  }
}

// 用户登录
function logiontoishare(url, username,password,cb) {
  var that = this;
  message.hide.call(that)
  wx.request({
    url: url + id,
    method: 'GET',
    header: {
      "Content-Type": "application/json,application/json"
    },
    success: function (res) {
      console.log(res);
      if (res.data === true) {
        that.setData({
          showTopTips: true,
          showTipsMsg: '登录成功！'
        })
      } else {
        that.setData({
          showTopTips: true,
          showTipsMsg: '登录失败！'
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
        btnDisable: false
      })
      typeof complete_cb == 'function' && complete_cb()
    }
  })
}

module.exports = {
  fetchBookClass: fetchBookClass,
  fetchBookList: fetchBookList,
  fetchBookDetail: fetchBookDetail,
  fetcheBookShareList: fetcheBookShareList,
  fetchPersonDetail: fetchPersonDetail,
  sendEbookMail: sendEbookMail,
  search: search
}