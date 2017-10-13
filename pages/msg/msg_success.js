Page({
  gotoBack:function()
  {
    wx.navigateBack({
      delta: 1
    })
  },
  gotoHome:function()
  {
    wx.switchTab({
      url: '../home/home'
    })
  }
});