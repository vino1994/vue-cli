<template>
    <div class="content">
        <div class="weui-uploader">
            <div class="weui-uploader__hd">
                <p class="weui-uploader__title">拍照或从手机相册中选图接口</p>
            </div>
            <div class="weui-uploader__bd">
                <ul class="weui-uploader__files" v-show="chooseImageLocalIds.length > 0" id="uploaderFiles">
                    <img @click="uploadImage(index)" v-for="(item,index) in chooseImageLocalIds" :key="index" class="weui-uploader__file" :src="item" />
                </ul>
                <div class="weui-uploader__input-box">
                    <div id="uploaderInput" class="weui-uploader__input" @click="chooseImage"></div>
                </div>
            </div>
        </div>
        <div class="weui-uploader">
            <div class="weui-uploader__hd">
                <p class="weui-uploader__title">预览图片接口</p>
            </div>
            <div class="weui-uploader__bd">
                <ul class="weui-uploader__files" v-show="chooseImageLocalIds.length > 0" id="uploaderFiles">
                    <img @click="previewImage(index)" v-for="(item,index) in chooseImageLocalIds" :key="index" class="weui-uploader__file" :src="item" />
                </ul>
            </div>
        </div>
        <div class="weui-uploader">
            <div class="weui-uploader__hd">
                <p class="weui-uploader__title">上传图片接口</p>
            </div>
            <div class="weui-uploader__bd">
                <strong class="weui-uploader__title">点击 拍照或从手机相册中选图接口 中的图片即可体验上传功能</strong>
            </div>
        </div>
        <div class="weui-uploader">
            <div class="weui-uploader__hd">
                <p class="weui-uploader__title">下载图片接口</p>
            </div>
            <div class="weui-uploader__bd">
                <a class="weui-btn weui-btn_mini weui-btn_primary" @click="downloadImage">下载图片</a>
                <img class="weui-uploader__file" v-show="downloadImageLocalId" :src="downloadImageLocalId" />
            </div>
        </div>
        <div class="weui-uploader">
            <div class="weui-uploader__hd">
                <p class="weui-uploader__title">获取本地图片接口</p>
            </div>
            <div class="weui-uploader__bd">
                <a class="weui-btn weui-btn_mini weui-btn_primary" @click="downloadImage">获取本地图片</a>
                <img class="weui-uploader__file" v-show="imgSrc" :src="imgSrc" />
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            imgSrc: "", //base64后的图片链接
            chooseImageLocalIds: [], //选定照片的本地ID列表
            serverId: "", //上传图片后的服务器端ID,下载图片时的服务器端ID
            downloadImageLocalId: "" //下载后的图片localId
        };
    },
    mounted() {
    },
    methods: {
        //选择本地图片
        chooseImage() {
            window.app.wxSDK.chooseImage({
                count: 3, // 默认9
                sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
                success: res => {
                    var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                    this.chooseImageLocalIds = res.localIds;
                }
            });
        },
        //预览图片
        previewImage(i) {
            window.app.wxSDK.previewImage({
                current: this.chooseImageLocalIds[i], // 当前显示图片的http链接
                urls: this.chooseImageLocalIds // 需要预览的图片http链接列表
            });
        },
        //上传图片接口
        uploadImage(i) {
            window.app.weui.confirm("确认上传图片吗？", {
                title: "提醒",
                buttons: [
                    {
                        label: "取消",
                        type: "default",
                        onClick: () => {
                            console.info("--------no---------");
                        }
                    },
                    {
                        label: "确定",
                        type: "primary",
                        onClick: () => {
                            console.info("--------yes---------");
                            window.app.wxSDK.uploadImage({
                                localId: this.chooseImageLocalIds[i], // 需要上传的图片的本地ID，由chooseImage接口获得
                                isShowProgressTips: 1, // 默认为1，显示进度提示
                                success: res => {
                                    this.serverId = res.serverId; // 返回图片的服务器端ID
                                    //备注：上传图片有效期3天，可用微信多媒体接口下载图片到自己的服务器，此处获得的 serverId 即 media_id。
                                }
                            });
                        }
                    }
                ]
            });
        },
        //下载图片接口
        downloadImage() {
            if (this.serverId == "") {
                window.app.weui.toast("请先上传图片");
                return;
            }
            window.app.wxSDK.downloadImage({
                serverId: this.serverId, // 需要下载的图片的服务器端ID，由uploadImage接口获得
                isShowProgressTips: 1, // 默认为1，显示进度提示
                success: res => {
                    this.downloadImageLocalId = res.localId; // 返回图片下载后的本地ID
                }
            });
        },
        //获取本地图片接口
        //备注：此接口仅在 iOS WKWebview 下提供，用于兼容 iOS WKWebview 不支持 localId 直接显示图片的问题。
        getLocalImgData() {
            if (this.chooseImageLocalIds.length == 0) {
                window.app.weui.toast("请先上传图片");
                return;
            }
            window.app.wxSDK.getLocalImgData({
                localId: this.chooseImageLocalIds[0], // 图片的localID
                success: res => {
                    this.imgSrc = res.localData; // localData是图片的base64数据，可以用img标签显示
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
