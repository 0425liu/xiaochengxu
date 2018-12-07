import { ClassisModel } from '../../models/classic.js'
import { LikeModel } from '../../models/like.js'
const classisModel = new ClassisModel()
const likeModel = new LikeModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic: null,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    classisModel.getClassicData((res) => {
      this.setData({
        classic: res,
        total: res.index,
        likestatus: res.like_status,
        likecount: res.fav_nums
      })

    })

  },
  onlike: function (event) {
    likeModel.likeStatus({
      status: event.detail.behavior,
      art_id: this.data.classic.id,
      type: this.data.classic.type
    })
  },
  onPrevios: function (e) {
    this._getPage("previous")
  },
  onNext: function (e) {
    this._getPage("next")
  },
  _getPage: function (direction) {
    const index = this.data.classic.index
    classisModel.getPageData(index, direction, (res, storage) => {
      this.setData({
        classic: res
      })
      if (storage) {
        this.setData({
          likestatus: res.like_status,
          likecount: res.fav_nums
        })
      } else {
        likeModel.getLikeStatus(res.type, res.id, (res) => {
          this.setData({
            likestatus: res.like_status,
            likecount: res.fav_nums
          })
        })
      }
    })
    this.monitorControl()
  },
  monitorControl: function () {
    this.selectComponent("#music")._recoverPlaying()
    this.selectComponent("#music")._audioStatus()
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