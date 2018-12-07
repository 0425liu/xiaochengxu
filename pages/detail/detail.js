import { BookModels } from "../../models/book"
import { LikeModel } from '../../models/like.js'
const bookModels = new BookModels();
const likeModel = new LikeModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {},
    comment: [],
    like: false,
    count: 0,
    posting: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading()
    const id = options.id;
    Promise.all([bookModels.getDetail(id), bookModels.getComment(id), bookModels.getLikeStatus(id)]).then(res => {
      this.setData({
        detail: res[0].data,
        comment: res[1].data.comments,
        like: res[2].data.like_status,
        count: res[2].data.fav_nums
      })
      wx.hideLoading()
    })
  },
  onFakePost: function () {
    this.setData({
      posting: true
    })
  },
  onlike: function (event) {
    likeModel.likeStatus({
      status: event.detail.behavior,
      art_id: this.data.detail.id,
      type: 400
    })
  },
  onPost: function (event) {
    const comment = event.detail.value || event.detail.text;
    if (!comment) return;
    if (comment.length > 12) {
      wx.showToast({
        title: '短评最多12个字',
        icon: 'none'
      })
      return
    }
    bookModels.postComment(this.data.detail.id, comment).then(res => {
      wx.showToast({
        title: '+ 1',
        icon: "none"
      })
      this.data.comment.unshift({
        content: comment,
        nums: 1
      })
      this.setData({
        comment: this.data.comment
      })
    }).catch(error => {
      wx.showToast({
        title: '评论失败',
      })
    })
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