import wx from 'weixin-jsapi';
// 设置需要用到的微信api接口
const jsApiList = ['chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'chooseWXPay', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone', 'onMenuShareWeibo'];

// 调取后台接口获取凭证，注入权限验证配置
let getTicket = function() {
    this.$tools.callServer('post', '/djh/wx_xyf/ticket', {}).then(res => {
        if (res.code == 0) {
            const pra = {
                jsApiTicket: res.data.accessToken,
                url: window.location.href
            }
            return pra
        }
    }).then((pra) => {
        this.$tools.callServer('post', '/djh/wx_xyf/signature', pra).then(json => {
            if (json.code == 0) {
                let _nonceStr = json.data.nonceStr,
                    _timestamp = json.data.timestamp,
                    _signature = json.data.signature;
                wx.config({
                    debug: false,
                    appId: 'wx67f82d608be81246', // 必填，公众号的唯一标识
                    timestamp: parseInt(_timestamp), // 必填，生成签名的时间戳
                    nonceStr: _nonceStr, // 必填，生成签名的随机串
                    signature: _signature, // 必填，签名
                    jsApiList: jsApiList // 必填，需要使用的JS接口列表
                })
                this.$tools.hideLoading();
            }
        })
    })
};


export default {
    methods: {
        async myWXPay(params, successCallBack, failCallBack, cancelCallBack) {
            // getTicket 获取凭证 注入权限验证配置
            await getTicket.call(this);

            wx.ready(() => {
                wx.chooseWXPay({
                    timestamp: params.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                    nonceStr: params.nonceStr, // 支付签名随机串，不长于 32 位
                    package: params.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                    signType: params.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                    paySign: params.sign, // 支付签名
                    success: successCallBack, //z支付成功回调
                    fail: failCallBack, //支付失败回调
                    cancel: cancelCallBack //支付取消回调
                })
            })
        },
        async myWxShare(params, successCallBack, failCallBack, cancelCallBack) {
            await getTicket.call(this);
            wx.ready(() => {
                // 分享给朋友
                wx.onMenuShareAppMessage({
                    link: params.shareLink, //分享链接
                    title: params.shareTitle, //分享标题
                    desc: params.shareDesc, //分享描述
                    imgUrl: params.shareImg, //分享图标
                    success: successCallBack, //分享成功回调
                    fail: failCallBack, //分享失败回调
                    cancel: cancelCallBack //取消分享回调
                });
                // 分享到朋友圈
                wx.onMenuShareTimeline({
                    link: params.shareLink, //分享链接
                    title: params.shareTitle, //分享标题
                    desc: params.shareDesc, //分享描述
                    imgUrl: params.shareImg, //分享图标
                    success: successCallBack, //分享成功回调
                    fail: failCallBack, //分享失败回调
                    cancel: cancelCallBack //取消分享回调
                })
            })
        }
    }
}