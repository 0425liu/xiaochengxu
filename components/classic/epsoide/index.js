// components/classic/epsoide/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      index:{
        type:String,
        observer: function (newVal, oldVal, changedPath){
          if (newVal < 10) {
            this.setData({
              _index: '0' + newVal
            })
          }
        }
      }
  },

  /**
   * 组件的初始数据
   */
  data: {
    months: [
      '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月',
      '十二月'
    ],
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  lifetimes:{
    attached:function(){
      let date = new Date()
      this.setData({
        year:date.getFullYear(),
        month: this.data.months[date.getMonth()]
      })
    }
  }
})