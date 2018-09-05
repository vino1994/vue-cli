<template>
    <div class="content">
        <div class="weui-uploader">
            <div class="weui-uploader__hd">
                <p class="weui-uploader__title">获取网络状态</p>
            </div>
            <div class="weui-uploader__bd" style="margin-top:10px;">
                <a class="weui-btn weui-btn_mini weui-btn_primary" @click="getNetworkType">获取网络状态</a>
                <p>{{networkType}}</p>
            </div>
        </div>
        <div class="weui-uploader">
            <div class="weui-uploader__hd">
                <p class="weui-uploader__title">获取当前位置</p>
            </div>
            <div class="weui-uploader__bd" style="margin-top:10px;">
                <a class="weui-btn weui-btn_mini weui-btn_primary" @click="getLocation">获取当前位置</a>
                <p v-show="location.latitude">经纬度：{{location.latitude}},{{location.longitude}}</p>
            </div>
        </div>
        <div class="weui-uploader">
            <div class="weui-uploader__hd">
                <p class="weui-uploader__title">查看位置</p>
            </div>
            <div class="weui-uploader__bd" style="margin-top:10px;">
                <a class="weui-btn weui-btn_mini weui-btn_primary" @click="openLocation">查看位置</a>
            </div>
        </div>
        <div class="weui-uploader">
            <div class="weui-uploader__hd">
                <p class="weui-uploader__title">微信扫一扫</p>
            </div>
            <div class="weui-uploader__bd" style="margin-top:10px;">
                <a class="weui-btn weui-btn_mini weui-btn_primary" @click="scanQRCode">扫一扫</a>
                <p>{{str}}</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            networkType: "", //网络类型
            location: "", //地理位置
            str: "" //扫一扫结果
        };
    },
    methods: {
        //获取网络状态接口
        getNetworkType() {
            window.app.wxSDK.getNetworkType({
                success: res => {
                    this.networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
                }
            });
        },
        //获取地理位置接口
        getLocation() {
            window.app.wxSDK.getLocation({
                type: "wgs84", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: res => {
                    this.location = res;
                },
                cancel: res => {
                    window.app.weui.alert("用户拒绝位置授权");
                }
            });
        },
        //使用微信内置地图查看位置接口
        openLocation() {
            if (!this.location) {
                window.app.weui.toast("请获取当前位置");
                return;
            }
            window.app.wxSDK.openLocation({
                latitude: this.location.latitude, // 纬度，浮点数，范围为90 ~ -90
                longitude: this.location.longitude, // 经度，浮点数，范围为180 ~ -180。
                name: "wxsdk测试点", // 位置名
                address: "中国某地", // 地址详情说明
                scale: 16 // 地图缩放级别,整形值,范围从1~28。默认为最大
            });
        },
        //微信扫一扫
        scanQRCode() {
            window.app.wxSDK.scanQRCode({
                needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                success: res => {
                    this.str = res.resultStr;
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

