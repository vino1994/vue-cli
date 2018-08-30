<template>
    <div>
        <p>sdkjflkasjdf</p>
    </div>
</template>
<script>
import wxSdk from "../js/wx-sdk";
export default {
    data() {
        return {};
    },
    mounted() {
        this.initWeChat();
    },
    methods: {
        initWeChat() {
            return app.api.wxConfig.config({
                    url: location.href.split("#")[0]
                }).then(data => {
                    if (data.status == 200) {
                        wxSdk.config(data.data);
                        wxSdk.shareFriend({
                            title: "测试title",
                            desc: "测试desc",
                            link: location.href.split("#")[0],
                            imgUrl:
                                "https://energymonster.oss-cn-shanghai.aliyuncs.com/upload_img/sjb_wx_higo_tc_20180627.png"
                        });
                    }
                });
        }
    }
};
</script>
