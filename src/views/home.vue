<template>
    <div>
        <div class="weui-cells">
            <router-link :to="{name:'detect'}" class="weui-cell weui-cell_access">
                <div class="weui-cell__bd">
                    <p>人脸检测</p>
                </div>
                <div class="weui-cell__ft"></div>
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    mounted(){
        this.initWeChat();
    },
    methods:{
        initWeChat() {
            app.api.wxConfig.config({url: location.href.split("#")[0]}).then(data=>{
                if (data.status == 200) {
                    data.data.debug = false;
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
    }
}
</script>

