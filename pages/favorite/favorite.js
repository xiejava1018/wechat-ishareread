var bookNullTip = {
      tipText: '亲，找不到书籍的收藏',
      actionText: '去逛逛',
      routeUrl: '../../pages/sort/sort'
    }
var personNullTip = {
      tipText: '亲，找不到人物的收藏',
      actionText: '去逛逛',
      routeUrl: '../../pages/sort/sort'
    }
Page({
  data:{
    book_favorite: [],
    person_favorite: [],
    show: 'bookfavorite',
    nullTip: bookNullTip
  },
  onLoad:function(options){
    var that = this
    wx.getStorage({
      key: 'book_favorite',
      success: function(res){
        that.setData({
          book_favorite: res.data
        })
      }
    })
    wx.getStorage({
      key: 'person_favorite',
      success: function(res){
        that.setData({
          person_favorite: res.data
        })
      }
    })
    wx.stopPullDownRefresh()
  },
  viewBookDetail: function(e) {
		var data = e.currentTarget.dataset
		wx.redirectTo({
			url: "../bookdetail/bookdetail?qtype=id&id=" + data.id
		})
  },
  viewPersonDetail: function(e) {
		var data = e.currentTarget.dataset
		wx.redirectTo({
			url: "../personDetail/personDetail?id=" + data.id
		})
  },
  changeViewType: function(e) {
    var data = e.currentTarget.dataset
    this.setData({
      show: data.type,
      nullTip: data.type == 'book_favorite' ? bookNullTip : personNullTip
    })
  }
})