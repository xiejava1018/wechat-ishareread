var isharereadservice = require('../../comm/script/service')
var util = require('../../util/util')
var config = require('../../comm/script/config')
var app = getApp();
Page({
  data: {
    bookDetail: {},
    showLoading: true,
    showContent: false,
    isBookFavorite:false,
    qtype:'',
    id:'',
    similarBookList:[]
  },
  onLoad: function (options) {
    var that = this;
    console.log(options);
    var qtype=options.qtype;
    var url="";
    if(qtype==="id")
    {
      url = config.apiList.bookDetailbyId;
    }
    else if(qtype==="isbn")
    {
      url = config.apiList.bookDetailbyISBN;
    }
    var id = options.id;
    that.setData({
      id: id,
      qtype: qtype
    })
    isharereadservice.fetchBookDetail.call(that, url, id, function (data) {
      console.log(data);
      if(data.code===6000)
      {}
      else
      {
        /// 判断是否收藏
        wx.getStorage({
          key: 'book_favorite',
          success: function (res) {

              for (var i = 0; i < res.data.length; i++) {
                if (res.data[i].id == data.id) {
                  that.setData({
                    isBookFavorite: true
                  })
                }
              }
            
          }
        })

        //同类好书
        getSimilarBookList.call(that,data.bookId);
      }
      /*
      // 存储浏览历史
      var date = util.getDate()
      var time = util.getTime()
      var film_history = []
      console.log('----进入----')
      wx.getStorage({
        key: 'film_history',
        success: function (res) {
          film_history = res.data
          console.log('----获取缓存----')
          console.log(res.data)
          // 当前的数据
          var now_data = {
            time: time,
            data: data
          }
          // 今天的数据，没有时插入
          var sub_data = {
            date: date,
            films: []
          }
          sub_data.films.push(now_data)
          if (film_history.length == 0) { // 判断是否为空
            console.log('----为空插入----')
            film_history.push(sub_data)
          } else if ((film_history[0].date = date)) { //判断第一个是否为今天
            console.log('----今日插入----')
            console.log(film_history[0].films.length)
            for (var i = 0; i < film_history[0].films.length; i++) {
              // 如果存在则删除，添加最新的
              if (film_history[0].films[i].data.id == data.id) {
                film_history[0].films.splice(i, 1)
              }
            }
            film_history[0].films.push(now_data)
          } else { // 不为今天(昨天)插入今天的数据
            console.log('----昨日插入今日----')
            film_history.push(sub_data)
          }
          wx.setStorage({
            key: 'film_history',
            data: film_history,
            success: function (res) {
              console.log(res)
              console.log('----设置成功----')
            }
          })
          console.log(film_history)
        },
        fail: function (res) {
          console.log('----获取失败----')
          console.log(res)
        }
      })
      */
    })
  },
  viewBookDetail: function (e) {
    var data = e.currentTarget.dataset;
    wx.redirectTo({
      url: '../bookdetail/bookdetail?qtype=id&id=' + data.doubanid
    })
  },
  viewebookshare: function (e)
  {
    var data = e.currentTarget.dataset;
    var bookid=data.id;
    var bookname=data.name;
    wx.navigateTo({
      url: '../ebookshare/ebookshare?bookid=' + bookid+'&bookname='+bookname
    })
  },
  viewFilmByTag: function (e) {
    var data = e.currentTarget.dataset
    var keyword = data.tag
    wx.redirectTo({
      url: '../searchResult/searchResult?url=' + encodeURIComponent(config.apiList.search.byTag) + '&keyword=' + keyword
    })
  },
  favoriteBook: function () {
    var that = this;
    // 判断原来是否收藏，是则删除，否则添加
    wx.getStorage({
      key: 'book_favorite',
      success: function (res) {
        console.log('getStorage sucess');
        console.log(res.data);
        var book_favorite = res.data
        console.log(that.data.isBookFavorite);
        if (that.data.isBookFavorite) {
          // 删除
          for (var i = 0; i < book_favorite.length; i++) {
            if (book_favorite[i].id == that.data.bookDetail.id) {
              book_favorite.splice(i, 1)
              that.setData({
                isBookFavorite: false
              })
            }
          }
          wx.setStorage({
            key: 'book_favorite',
            data: book_favorite,
            success: function (res) {
              console.log(res)
              console.log('----设置成功----')
            }
          })
        } else {
          // 添加
          book_favorite.push(that.data.bookDetail)
          wx.setStorage({
            key: 'book_favorite',
            data: book_favorite,
            success: function (res) {
              that.setData({
                isBookFavorite: true
              })
            }
          })
        }
      },
      fail: function (res) {
        console.log(res);
        var book_favorite =[];
        book_favorite.push(that.data.bookDetail);
        wx.setStorage({
          key: 'book_favorite',
          data: book_favorite,
          success: function (res) {
            console.log(res)
            console.log('----设置成功----')
            that.setData({
              isBookFavorite: true
            })
          }
        })
      }
    })
  },
  shareBook: function (e){
    var that=this;
    var data = e.currentTarget.dataset;
    var bookid = data.id;
    var bookname = data.name;
    var ishareuserid = app.globalData.ishareuserid;
    if (ishareuserid === "") {
      //登陆
      wx.navigateTo({
        url: '../login/login'
      })
    }
    else{
      wx.redirectTo({
        url: '../sharebook/sharebook?bookid=' + bookid + '&bookname='+bookname+'&qtype='+that.data.qtype+'&id='+that.data.id
      })
    }
  },
  shareBooklist: function (e) {
    var that = this;
    var data = e.currentTarget.dataset;
    var bookid = data.id;
    var bookname = data.name;
    wx.redirectTo({
      url: '../sharelist/sharelist?bookid=' + bookid + '&bookname=' + bookname
    })
  }
})

function getSimilarBookList(bookId, cb, fail_cb, complete_cb) {
  var that = this;
  var url = config.apiList.getSimilarBookList + bookId;
  wx.request({
    url: url,
    data: {
    },
    method: 'GET',
    header: {
      "Content-Type": "application/json,application/json"
    },
    success: function (res) {
      console.log(res.data.body);
      that.setData({
        similarBookList: res.data.body.similarBookList,
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
  getSimilarBookList: getSimilarBookList
}