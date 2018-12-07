// components/classic/episode/index.js
let mManger = wx.getBackgroundAudioManager();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    image: String,
    content: String,
    category: Number,
    src: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    playUrl: 'images/player@playing.png',
    pasueUrl: 'images/player@waitting.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handlePlay() {
      let play = this.data.playing;
      if (!play) {

        mManger.src = this.properties.src
        mManger.title = this.properties.title
      } else {
        mManger.pause();
      }
      this.setData({
        playing: !play
      })
    },
    _recoverPlaying() {
      let src = this.data.src;
      console.log(mManger.paused)
      if (mManger.src !== src || mManger.paused) {
        this.setData({
          playing: false
        })
      } else {
        this.setData({
          playing: true
        })
      }
    },
    _audioStatus() {
      mManger.onPlay(() => {
        this._recoverPlaying()
      })
      mManger.onPause(() => {

        this._recoverPlaying()
      })
      mManger.onStop(() => {
        this._recoverPlaying()
      })
      mManger.onEnded(() => {
        this._recoverPlaying()
      })
    }
  }
})