<template>
    <div class="content">
        <div class="weui-uploader">
            <div class="weui-uploader__hd">
                <p class="weui-uploader__title">微信支付</p>
            </div>
            <div class="weui-uploader__bd" style="margin-top:10px;">
                <a class="weui-btn weui-btn_mini weui-btn_primary" @click="pay">支付0.01元</a>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    },
    methods: {
        pay() {
            window.app.wxSDK.chooseWXPay({
                timestamp: 0, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                nonceStr: "", // 支付签名随机串，不长于 32 位
                package: "", // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                signType: "", // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                paySign: "", // 支付签名
                success: function(res) {
                    // 支付成功后的回调函数
                }
            });
        }
    }
};
</script>

<style scoped>
.content {
    width: calc(100vw - 20px);
    overflow-x: hidden;
    padding: 10px;
}
</style>

