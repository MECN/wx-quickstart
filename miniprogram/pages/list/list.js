const db=wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image:[]
  },
  insert:function(){
    db.collection('user').add({
      data:{
        name:'cc',
        age:21
      }
    }).then(res=>{
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
  },
  update:function(){
    db.collection('user').doc('90b4093b5d6c8ec30fe6affb4c1aa874').update({
      data:{
        age:17
      }
    }).then(res=>{
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
  },
  remove:function(){
    db.collection('user').doc('90b4093b5d6c8eb20fe6a5d44ee7162f').remove().then(res=>{
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
  },
  upload:function(){
    wx.chooseImage({
      count: 2,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths);
        // 将图片上传至云存储空间
        wx.cloud.uploadFile({
          // 指定上传到的云路径
          cloudPath: new Date().getTime()+'.png',
          // 指定要上传的文件的小程序临时文件路径
          filePath: tempFilePaths[0],
          // 成功回调
          success: res => {
            console.log(res.fileID)
            db.collection('image').add({
              data:{
                fileId:res.fileID
              }
            }).then(res=>{
              console.log(res)
            }).catch(err=>{
              console.log(err)
            })
          },
        })
      }
    })
  },
  getFile:function(){
    wx.cloud.callFunction({
      name:'login'
    }).then(res=>{
      console.log(res)
      db.collection('image').where({
        _opendid: res.openid
      }).get().then(res=>{
        console.log(res)
        this.setData({
          image:res.data
        })
      }).catch(err=>{
        console.log(res)
      })
    }).catch(err=>{
      console.log(err)
    })
  },
  downloadFile:function(e){
    console.log(e)
    console.log(e.currentTarget.dataset.fileid)
    wx.cloud.downloadFile({
      fileID: e.currentTarget.dataset.fileid,
    }).then(res => {
      // get temp file path
      console.log(res.tempFilePath)
      wx.saveImageToPhotosAlbum({
        filePath: res.tempFilePath,
        success(res) { 
          wx.showToast({
            title: '保存成功',
            icon:'success'
          })
        }
      })
    }).catch(error => {
      console.log(error)
      // handle error
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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