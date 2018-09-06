<template>
    <div class="content">
        <div class="weui-uploader">
            <div class="weui-uploader__hd">
                <p class="weui-uploader__title">人脸检测</p>
            </div>
            <div class="weui-uploader__bd" style="margin-top:10px;">
                <a class="weui-btn weui-btn_mini weui-btn_primary" @click="chooseImage">人脸检测</a>
            </div>
            <div class="weui-uploader__input-box" v-show="localData">
                <img id="uploaderInput" class="weui-uploader__input" :src="localData" alt="">
            </div>
        </div>
        <div>

        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            localData: "" //本地照片地址
        };
    },
    mounted() {
        // this.detectFace();
    },
    methods: {
        chooseImage() {
            app.wxSDK.chooseImage({
                count: 1, // 默认9
                sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
                success: res => {
                    let localIds = res.localIds[0]; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                    this.getLocalImgData(localIds);
                }
            });
        },
        getLocalImgData(id) {
            app.wxSDK.getLocalImgData({
                localId: id, // 图片的localID
                success: res => {
                    this.localData = res.localData; // localData是图片的base64数据，可以用img标签显示
                    this.detectFace();
                }
            });
        },
        detectFace() {
            let param = {
                type: "BASE64",
                image: this.localData.substring(22),
                face_field: "age,beauty,expression,faceshape,gender,glasses,race,quality,facetype",
                max_face_num: 10
            };
            return app.api.aip.detect(param).then(data => {
                if (data.status == 200) {
                    let face_list = data.data.result;
                }
            },(err)=>{
                alert(JSON.stringify(err))
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

