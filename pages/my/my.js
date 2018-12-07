import { BookModels } from "../../models/book"
const bookModels = new BookModels();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    booksCount: 0,
    favor: [],
    hasUserInfo: true,
    userInfo: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.hasGottenUserInfo()
    this.getBooksCount()
    this.getMyFavor()
  },
  getBooksCount: function () {
    bookModels.getBooksCount().then(res => {
      this.setData({
        booksCount: res.data.count
      })
    })
  },
  getMyFavor: function () {
    bookModels.getMyFavor().then(res => {
      this.setData({
        favor: res.data
      })
    })
  },
  onStudy: function () {
    wx.navigateTo({
      url: '/pages/course/course',
    })
  },
  onAbout: function () {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },
  hasGottenUserInfo: function () {
    wx.getSetting({
      success: (data) => {
        if (data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: (data) => {
              console.log(data.userInfo)
              this.setData({
                hasUserInfo: true,
                userInfo: data.userInfo
              })
            }
          })
        } else {
          this.setData({
            hasUserInfo: false
          })
        }
      }
    })
  },
  getuserinfo: function (event) {
    let userInfo = event.detail.userInfo
    if (userInfo) {
      this.setData({
        hasUserInfo: true,
        userInfo: userInfo
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})