<template>
    <div style="position:relative;">
        <Loading v-show="showLoading"></Loading>
        <div class="swiper-container">
            <div class="swiper-wrapper swiper-content">
                <div class="swiper-slide">
                    <img src="../images/danone/1.jpg" alt="">
                </div>
                <div class="swiper-slide">
                    <img src="../images/danone/2.jpg" alt="">
                </div>
                <div class="swiper-slide">
                    <img src="../images/danone/3.jpg" alt="">
                </div>
                <div class="swiper-slide">
                    <img src="../images/danone/4.jpg" alt="">
                </div>
                <div class="swiper-slide">
                    <img src="../images/danone/5.jpg" alt="">
                </div>
            </div>
        </div>
        <div class="choose" v-show="isShowInput">
            <span>选择图片</span>
            <input class="fileimage" type="file" name="image" id="iamge" @change="chooseImage" accept="image/*" />
        </div>
        <div class="laz-content" @touchmove.prevent v-show="showLazImageContent">
            <img class="laz-img" :src="lrzImage" alt="">
            <img @click="close" class="close" src="../images/close.png" alt="">
        </div>
        <img id="QRcode" style="display:none;" src="../images/danone/L741197.jpg" alt="">
    </div>
</template>

<script>
import Swiper from "swiper";
import Loading from "../components/loading";
import lrz from "lrz";
import wxSdk from "../js/wx-sdk";
export default {
    data() {
        return {
            showLoading: true,//是否显示loading动画
            isShowInput: false,//是否显示选择图片
            lrzImage:'',
            showLazImageContent:false
        };
    },
    components: {
        Loading
    },
    mounted() {
        this.initWeChat();
        this.initSwiper();
        // this.initDemo();
    },
    methods: {
        initSwiper() {
            let _this = this;
            var mySwiper = new Swiper(".swiper-container", {
                direction: "vertical",
                effect: "fade",
                on: {
                    init() {
                        if (this.activeIndex == 0) {
                            _this.isShowInput = true;
                        }
                    },
                    slideChangeTransitionStart: function() {
                        _this.isShowInput = this.activeIndex == 0 ? true : false;
                    },
                    imagesReady: function() {
                        _this.showLoading = false;
                    }
                }
            });
        },
        chooseImage(e) {
            let _this = this;
            if (!e.target.files[0]) {
                return;
            }
            lrz(e.target.files[0]).then(function(rst) {
                if (rst.base64Len > 1024 * 1024 * 4) {
                    _this.lrzImage = '';
                    _this.$toast.center('图片不能超过4MB');
                    return;
                }else{
                    // _this.showLazImageContent = true;
                    // _this.lrzImage = rst.base64;
                    _this.compositePicture(rst.base64);
                }
            })
            .catch(function(err) {
                _this.lrzImage = '';
                _this.$toast.center("压缩图片失败");
            });
        },
        //合成图片
        compositePicture(res){
            let img1 = new Image;
            let QRcodeImgCover = document.getElementById('QRcode');
            img1.src = res;
            img1.onload = (()=>{
                let c = document.createElement('canvas'),
                    ctx = c.getContext('2d');
                c.width = img1.naturalWidth;
                c.height = img1.naturalHeight;

                ctx.rect(0, 0, c.width, c.height);
                ctx.fillStyle = '#fff';
                ctx.fill();

                /*下面是为底图增加上文字(绘制图片资源, x坐标, y坐标, 宽, 高)*/
                ctx.drawImage(img1, 0, 0, c.width, c.height);
                //设置字体样式
                ctx.font = "48px Courier New";
                //设置字体填充颜色
                ctx.fillStyle = "red";
                //从坐标点(92,800)开始绘制文字
                ctx.fillText("这是文字内容", 92, 800);
                //从坐标点(0,0)开始绘制文字
                ctx.drawImage(QRcodeImgCover, 10, 10);

                /*上面是增加文字,可以无限加*/
                this.lrzImage = c.toDataURL("image/jpeg", 1); //如果绘制完成了,就把base64数据填进数组,然后回调,没完成则继续这步
                this.showLazImageContent = true;
            })
        },
        close(){
            this.showLazImageContent = false
        },
        initWeChat(){
            return app.api.wxConfig.config({
                url: location.href.split("#")[0]
            }).then((data)=>{
                if(data.status == 200){
                    wxSdk.config(data.data)
                }
            })
        },
        initDemo(){
            return app.api.demo.users().then((res)=>{
                console.info(res)
            })
        }
    }
};
</script>

<style lang="less" scoped>
.swiper-content .swiper-slide img {
    width: 100%;
    height: 100vh !important;
}

.choose {
    position: absolute;
    top: 0;
    left: 0;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    .fileimage {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        -ms-filter: "alpha(opacity=0)";
        width: 100%;
        height: 100%;
    }
}

.laz-content{
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.6);
    width: 100%;
    height: 100vh;
    max-height: 100vh;
    min-height: 100vh;
    .laz-img{
        position: absolute;
        width: 90%;
        left: 0;
        right: 0;
        margin: 0 auto;
        margin-top: 5%;
        border-radius: 10px;
        height: calc(100vh - 140px);
    }
    .close{
        position: absolute;
        bottom: 5%;
        left: 0;
        right: 0;
        margin: 0 auto;
        width: 50px;
        height: 50px;
    }
}

</style>
