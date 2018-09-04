export default {
    // 通过config接口注入权限验证配置
    config(config) {
        window.app.wxSDK.config(config);
    },
    // 分享给好友
    shareFriend(params) {
        // 分享给朋友  ,在config里面填写需要使用的JS接口列表，然后这个方法才可以用
        window.app.wxSDK.ready(function () {
            window.app.wxSDK.onMenuShareAppMessage({
                title: params.title, // 分享标题
                desc: params.desc, // 分享描述
                link: params.link, // 分享链接
                imgUrl: params.imgUrl, // 分享图标
            })
        })
    },
    // 分享朋友圈
    sharefriends(params) {
        window.app.wxSDK.ready(function () {
            window.app.wxSDK.onMenuShareTimeline({
                title: params.title, // 分享标题
                link: params.link,
                imgUrl: params.imgUrl, // 分享图标
            })
        })
    },
    //分享到QQ
    shareQQ() {
        window.app.wxSDK.onMenuShareQQ({
            title: params.title, // 分享标题
            desc: params.desc, // 分享描述
            link: params.link, // 分享链接
            imgUrl: params.imgUrl, // 分享图标
        });
    },
    //分享到腾讯微博
    shareTencentWeibo(){
        window.app.wxSDK.onMenuShareWeibo({
            title: params.title, // 分享标题
            desc: params.desc, // 分享描述
            link: params.link, // 分享链接
            imgUrl: params.imgUrl, // 分享图标
        })
    },
    //分享到QQ空间
    ShareQZone(){
        window.app.wxSDK.onMenuShareQZone({
            title: params.title, // 分享标题
            desc: params.desc, // 分享描述
            link: params.link, // 分享链接
            imgUrl: params.imgUrl, // 分享图标
        })
    }
}
