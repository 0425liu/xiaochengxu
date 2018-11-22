// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    count: Number,
    like:Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    yesSrc:"images/like@2x.png",
    noSrc: "images/like@2xdis.png"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTap:function(){
     let {like,count} = this.data;
     count = like ? --count : ++count;
      this.setData({
       count,
       like:!like
     })
     let behavior = this.properties.like;
      this.triggerEvent('TabLike', { behavior})

    } 
  }
})
