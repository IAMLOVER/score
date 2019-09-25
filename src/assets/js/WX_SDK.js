import wx from 'weixin-jsapi';
// 设置需要用到的微信api接口
const jsApiList = ['chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'chooseWXPay']

// 调取后台接口获取凭证，注入权限验证配置
const getTicket = function () {
  this.$tools.callServer('post', '/djh/hlhwx/ticket', {}).then(res => {
    if (res.code == 0) {
      wx.config({
        debug: false,
        appId: 'wx67f82d608be81246', // 必填，公众号的唯一标识
        timestamp: '', // 必填，生成签名的时间戳
        nonceStr: '', // 必填，生成签名的随机串
        signature: '',// 必填，签名
        jsApiList: jsApiList // 必填，需要使用的JS接口列表
      })
    }
  })
}


export default {
  methods: {
    myWXPay(successCallBack, failCallBack, cancelCallBack) {
      // getTicket 获取凭证
      getTicket.call(this);

      wx.ready(() => {
        wx.chooseWXPay({
          timestamp: 0, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
          nonceStr: '', // 支付签名随机串，不长于 32 位
          package: '', // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
          signType: '', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
          paySign: '', // 支付签名
          success: successCallBack,
          fail: failCallBack,
          cancel: cancelCallBack
        })
      })
    }
  }
}






