// components/classic/control/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    total: Number,
    page: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    left: "images/triangle@left.png",
    disleft: "images/triangle.dis@left.png",
    right: "images/triangle@right.png",
    disright: "images/triangle.dis@right.png"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handlePrevios: function () {
      this.triggerEvent('Previos')
    },
    handleNext: function () {
      this.triggerEvent('Next')
    }
  }
})