<template>
    <div class="content">
        <div class="weui-cells__title">DEMO</div>
        <div class="weui-uploader">
            <div class="weui-uploader__hd">
                <p class="weui-uploader__title">图像接口</p>
                <div class="weui-uploader__info">拍照或从手机相册中选图接口</div>
            </div>
            <div class="weui-uploader__bd">
                <div class="weui-uploader__input-box">
                    <input id="uploaderInput" class="weui-uploader__input" @click="chooseImage" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    },
    mounted() {
        this.initWeChat();
    },
    methods: {
        initWeChat() {
            return app.api.wxConfig
                .config({
                    url: location.href.split("#")[0]
                })
                .then(data => {
                    if (data.status == 200) {
                        window.app.wx.config(data.data);
                        window.app.wx.shareFriend({
                            title: "测试title",
                            desc: "测试desc",
                            link: location.href.split("#")[0],
                            imgUrl:
                                "https://energymonster.oss-cn-shanghai.aliyuncs.com/upload_img/sjb_wx_higo_tc_20180627.png"
                        });
                    }
                });
        },
        chooseImage() {

        }
    }
};
</script>
