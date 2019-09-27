<template>
  <div>

  </div>
</template>

<script>
export default {
  name: "WxAuth",
  created() {
    const { showLoading, hideLoading } = this.$tools;
    showLoading();
    // 如果连接中有微信返回的 code，则用此 code 调用后端接口，向微信服务器请求用户信息
    // 如果不是从微信重定向过来的，没有带着微信的 code，则直接进入首页
    if (this.$route.query.code) {
      this.$tools
        .callServer("get", "/djh/wx_xyf/userinfo", {
          code: this.$route.query.code
        })
        .then(res => {
          hideLoading();
          if (res.code == 0) {
            // 把用户信息存入localStorage中
            localStorage.setItem("wxUserInfo", JSON.stringify(res.data));
            let redirectUrl = sessionStorage.getItem("wxRedirectUrl");
            this.$router.replace(redirectUrl);
          }
        });
    } else {
      hideLoading();
      this.$router.replace("/");
    }
  }
};
</script>