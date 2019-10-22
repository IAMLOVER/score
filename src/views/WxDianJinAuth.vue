<template>
  <div></div>
</template>

<script>
export default {
  name: "WxDianJinAuth",
  created() {
    const { showLoading, hideLoading } = this.$tools;
    showLoading();
    // 如果连接中有微信返回的 code，则用此 code 调用后端接口，向微信服务器请求用户信息
    // 如果不是从微信重定向过来的，没有带着微信的 code，则直接进入首页
    if (this.$route.query.code) {
      this.$tools
        .callServer("get", "/djh/weixin/userinfo", {
          code: this.$route.query.code
        })
        .then(res => {
          hideLoading();
          if (res.code == 0) {
            let djOpenid = res.data.openid;
            // 把用户信息存入localStorage中
            localStorage.setItem("wxDianJinUserInfo", JSON.stringify(res.data));
            // 用返回回来的openId调用下登录接口
            const wxUserInfo = JSON.parse(
              localStorage.getItem("wxUserInfo")
                ? localStorage.getItem("wxUserInfo")
                : null
            );
            this.$tools
              .callServer("post", "/djh/user_info/login", {
                djOpenid: djOpenid,
                openid: wxUserInfo.openid
              })
              .then(res => {
                if (res.code == 0) {
                  localStorage.setItem(
                    "store",
                    JSON.stringify(res.data)
                  );
                 let wxDianJinRedirectUrl = sessionStorage.getItem("wxDianJinRedirectUrl");
                 this.$router.replace(wxDianJinRedirectUrl);
                }
              });

          }
        });
    } else {
      hideLoading();
      this.$router.replace("/");
    }
  }
};
</script>