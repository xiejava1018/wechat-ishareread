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
      that.setData({
        bookDetail: res.data,
        showLoading: false,
        showContent: true
      })
      wx.setNavigationBarTitle({
          title: res.data.title
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
function search(url, keyword, start, count, cb){
  var that = this
  message.hide.call(that)
  var url = decodeURIComponent(url)
  if (that.data.hasMore) {
    wx.request({
      url: url + keyword,
      data: {
        start: start,
        count: count
      },
      method: 'GET',
      header: {
        "Content-Type": "application/json,application/json"
      },
      success: function(res){
        if(res.data.subjects.length === 0){
          that.setData({
            hasMore: false,
            showLoading: false
          })
        }else{
          that.setData({
            films: that.data.films.concat(res.data.subjects),
            start: that.data.start + res.data.subjects.length,
            showLoading: false
          })
          wx.setNavigationBarTitle({
              title: keyword
          })
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
      }
    })
  }
}
module.exports = {
  fetchBookClass: fetchBookClass,
  fetchBookList: fetchBookList,
  fetchBookDetail: fetchBookDetail,
  fetchPersonDetail: fetchPersonDetail,
  search: search
}