import axios from 'axios';
axios.defaults.timeout = 180000;
// axios.defaults.withCredentials = true;
let baseURL = window.location.origin;
baseURL = baseURL.indexOf('.com') > -1 ? "http://xyf.dazhongdianjin.com" : "http://xyf.dazhongdianjin.cn"
axios.defaults.baseURL = baseURL;
axios.interceptors.response.use(response => { //响应拦截器
    return response.data
}, error => {
    return Promise.reject(error)
});

let tools = (function() {
    // 请求数据
    function callServer(type, url, params) {
        if (!url) return;
        type = type.toUpperCase();
        if (type == 'GET') {
            url = addParamsForUrl(url, params);
            return axios.get(url, {})
        } else {
            return axios.post(url, params)
        }
    };
    // 把参数添加到url上
    function addParamsForUrl(url, params) {
        if (typeof params !== "object") return url
        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                if (params[key] && params[key] != 'undefined') {
                    if (url.indexOf('?') != -1) {
                        url += '&' + '' + key + '=' + params[key] || '' + ''
                    } else {
                        url += '?' + '' + key + '=' + params[key] || '' + ''
                    }
                }
            }
        }
        return url
    };
    // 判断是否为空
    function isEmpty(val) {
        if (val == null || typeof(val) == 'undefined' ||
            (typeof(val) == 'string' && (trim(val) == '' || trim(val) == 'null'))) {
            return true;
        } else {
            return false;
        }
    };

    // 清除前后空格
    function trim(val) {
        return val.replace(/(^\s*)|(\s*$)/g, '');
    };

    // 判断是安卓手机还是苹果手机
    function iosOrAndroid() {
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isiOS == true) {
            return isiOS;
        } else {
            return isAndroid;
        }
    };
    // 验证身份证
    function isIdentityCardNo(card) {
        var pattern = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
        return pattern.test(card);
    };
    //号码验证正则
    function regPhone(phone) {
        var regPhone = /^1[3|4|5|6|7|8][0-9]{9}$/;
        return regPhone.test(phone)
    };
    /**
   * 手机号码验证运营商
 移动：134(0 - 8) 、135、136、137、138、139、147、150、151、152、157、158、159、178、182、183、184、187、188、198 
联通：130、131、132、145、155、156、175、176、185、186、166
电信：133、153、173、177、180、181、189、199 
   * */

    function regPhoneType(phone) {
        var $CM = /^((13[456789])|(147)|(15[012589])|(178)|(18[2348])|(198))\d{8}$/g,
            $CU = /^((13[012])|(145)|(15[56])|(166)|(17[0156])|(18[56]))\d{8}$/g,
            $CT = /^((133)|(153)|(17[37])|(18[019])|(199))\d{8}$/g;
        if ($CM.test(phone)) {
            return { type: 'zgyd', name: '中国移动' }
        }
        if ($CU.test(phone)) {
            return { type: 'zglt', name: '中国联通' }
        }
        if ($CT.test(phone)) {
            return { type: 'zgdx', name: '中国电信' }
        }
        return { type: null, name: '' }
    };

    // 邮箱验证正则
    function regEmail(email) {
        var regEmail = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/;
        return regEmail.test(email)
    };


    //从 canvas 提取图片 base64 image
    function convertCanvasToImage(canvas) {
        //新Image对象，可以理解为DOM
        //alert(typeof(canvas));
        var image = new Image();
        // canvas.toDataURL 返回的是一串Base64编码的URL，当然,浏览器自己肯定支持
        // 指定格式 PNG
        image.src = canvas.toDataURL("image/png");
        return image;
    };

    // 把base64 转换成文件对象
    function dataURLtoFile(base64Str, fileName) {
        var arr = base64Str.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), //对base64串进行操作，去掉url头，并转换为byte
            len = bstr.length,
            ab = new ArrayBuffer(len), //将ASCII码小于0的转换为大于0
            u8arr = new Uint8Array(ab);
        while (len--) {
            u8arr[len] = bstr.charCodeAt(len)
        };
        // 创建新的 File 对象实例[utf-8内容，文件名称或者路径，[可选参数，type：文件中的内容mime类型]]
        return new File([u8arr], fileName, {
            type: mime
        })
    };

    /**
     * 文件上传,异步
     */
    function uploadfile(file, callback) {
        showLoading();
        var formFile = new FormData();
        formFile.append('file', file);
        axios.post('/file_xyf/upload', formFile).then(res => {
            if (res.code == 0) {
                hideLoading();
                callback(res.data)
            } else {
                showMsg(res.msg)
            }
        }).catch(error => {})
    };

    /**
     * 显示信息用于请求回调的错误信息显示
     * 需要检查reset.css中是否有tipsBox样式
     * @param {*} str 
     */

    function showMsg(str, time) {
        time = time || 1500;
        var timer1 = null,
            timer2 = null;
        // 判断是否已经存在tipsbox元素，如果存在就不用添加了
        var oldtipsbox = document.getElementById('tipsbox');
        if (oldtipsbox != null) {
            clearTimeout(timer1);
            oldtipsbox.getElementsByClassName('tips')[0].innerHTML = str;
            oldtipsbox.style.display = "flex";
            timer1 = window.setTimeout(function() {
                oldtipsbox.style.display = "none";
            }, time)
        } else {
            clearTimeout(timer2);
            var fragment = document.createDocumentFragment();
            var tipsbox = document.createElement('div');
            var tips = document.createElement('div');
            tipsbox.setAttribute("class", "tipsbox");
            tipsbox.setAttribute("id", "tipsbox");
            tips.setAttribute("class", "tips");
            tips.innerHTML = str;
            tipsbox.appendChild(tips);
            fragment.appendChild(tipsbox);
            // 把文档碎片添加到body中
            document.body.appendChild(fragment);
            //  默认显示的时间
            timer2 = window.setTimeout(function() {
                tipsbox.style.display = "none";
            }, time)
        }
    };


    /**
     * 显示loading
     */
    function showLoading() {
        var oldLoadingBox = document.getElementById("loadingBox");
        if (oldLoadingBox != null) {
            oldLoadingBox.style.display = 'flex';
        } else {
            var fragment = document.createDocumentFragment();
            var loadingBox = document.createElement('div');
            loadingBox.setAttribute('class', 'loadingBox');
            loadingBox.setAttribute('id', 'loadingBox');
            var containerStr = '<div class="spinner">' +
                '<div class="spinner-container container1">' +
                '<div class="circle1"></div>' +
                '<div class="circle2"></div>' +
                '<div class="circle3"></div>' +
                '<div class="circle4"></div>' +
                '</div>' +
                '<div class="spinner-container container2">' +
                '<div class="circle1"></div>' +
                '<div class="circle2"></div>' +
                '<div class="circle3"></div>' +
                '<div class="circle4"></div>' +
                '</div>' +
                '<div class="spinner-container container3">' +
                '<div class="circle1"></div>' +
                '<div class="circle2"></div>' +
                '<div class="circle3"></div>' +
                '<div class="circle4"></div>' +
                '</div>' +
                '</div>';
            loadingBox.innerHTML = containerStr;
            loadingBox.style.display = 'flex';
            fragment.appendChild(loadingBox);
            // 把文档碎片添加到body中
            document.body.appendChild(fragment);
        }
    };

    /**
     * 隐藏loading
     */
    function hideLoading() {
        var loadingBox = document.getElementById('loadingBox');
        loadingBox.style.display = 'none'
    };
    // 判断是否是微信浏览器环境
    function isWeiXin() {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger' || ua.match(/_SQ_/i) == '_sq_') {
            return true;
        } else {
            return false;
        }
    };

    /**
     * 获取临时URL地址，用于图片回显
     */
    function getObjectURL(file) {
        var url = null;
        if (window.createObjectURL != undefined) {
            // 正常浏览器
            url = window.createObjectURL(file)
        } else if (window.URL != undefined) {
            // mozilla firefox
            url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) {
            // webkit chrome
            url = window.webkitURL.createObjectURL(file);
        }
        return url
    };

    /**
     * 时间格式化
     */
    function dateFormat(value, format) {
        let nowDate = new Date(value),
            year = nowDate.getFullYear(),
            month = (nowDate.getMonth() + 1).toString().padStart(2, "0"),
            day = (nowDate.getDate()).toString().padStart(2, "0"),
            ymd = null;
        if (format == "yyyy-mm-dd") {
            ymd = year + "-" + month + "-" + day;
        } else if (format == "yyyy-mm") {
            ymd = year + "-" + month;
        } else {
            ymd = year + "年" + month + "月" + day + "日";
        }
        return ymd
    };

    /**
     * 
     *获取cookie
     */
    function getCookie(c_name) {
        var c_start = null,
            c_end = null;
        if (document.cookie.length > 0) {
            c_start = document.cookie.indexOf(c_name + "=")
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1
                c_end = document.cookie.indexOf(";", c_start)
                if (c_end == -1) c_end = document.cookie.length
                return unescape(document.cookie.substring(c_start, c_end))
            }
        }
        return ""
    };

    /**
     * 设置cookie
     */
    function setCookie(c_name, value, expiredays) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        document.cookie = c_name + "=" + escape(value) +
            ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + ';path=/';
    };

    /**
     * 获取当前页面导航参数值
     */
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }

    return {
        callServer,
        isEmpty,
        iosOrAndroid,
        isIdentityCardNo,
        regPhone,
        regPhoneType,
        convertCanvasToImage,
        dataURLtoFile,
        uploadfile,
        showMsg,
        showLoading,
        hideLoading,
        addParamsForUrl,
        isWeiXin,
        getObjectURL,
        regEmail,
        dateFormat,
        setCookie,
        getCookie,
        getQueryString
    }
})();

export default tools