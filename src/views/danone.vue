<template>
    <div>
        <Loading v-show="showLoading"></Loading>
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <div class="slide1">
                        <img class="slide1_bg" src="../images/1111.png" alt="">
                        <div class="arrow">
                            <img src="../images/danone/01arrow.png" alt="">
                        </div>
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="slide2">
                        <img class="slide2_bg" src="../images/2222.png" alt="">
                        <input class="nickname" v-model='name' @blur="blur" placeholder="edit me" />
                        <div class="choose-sex">
                            <div class="sex" @click="choose('man')">
                                <img :src="man" alt="">
                            </div>
                            <div class="sex" @click="choose('woman')">
                                <img :src="woman" alt="">
                            </div>
                        </div>
                        <div class="btn_explore" @click="goExplore">
                            <img src="../images/danone/02btn.png" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="choose" v-show="isShowInput">
            <span>选择图片</span>
            <input class="fileimage" type="file" name="image" id="iamge" @change="chooseImage" accept="image/*" />
        </div> -->
        <!-- <div class="laz-content" @touchmove.prevent v-show="showLazImageContent">
            <img class="laz-img" :src="lrzImage" alt="">
            <img @click="close" class="close" src="../images/close.png" alt="">
        </div> -->
        <!-- <img id="QRcode" style="display:none;" src="../images/danone/L741197.jpg" alt=""> -->
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
            showLoading: true, //是否显示loading动画
            lrzImage: "",
            showLazImageContent: false,
            name: "",//昵称
            man: require("../images/danone/02man.png"),
            woman: require("../images/danone/02woman.png"),
            choose_sex:''//选择的性别
        };
    },
    components: {
        Loading
    },
    mounted() {
        this.initWeChat();
        this.initSwiper();
    },
    methods: {
        initSwiper() {
            let _this = this;
            var mySwiper = new Swiper(".swiper-container", {
                direction: "vertical",
                effect: "fade",
                speed: 300,
                observer:true,
                observeParents:true,
                on: {
                    init() {
                        if (this.activeIndex == 0) {
                            _this.isShowInput = true;
                        }
                    },
                    slideChangeTransitionStart: function() {
                        if (this.activeIndex == 0) {
                            document.title = "少塑派行动";
                        } else {
                            document.title = "少塑派宣言";
                        }
                    },
                    imagesReady: function() {
                        _this.showLoading = false;
                    }
                }
            });
            _this.mySwiper = mySwiper;
        },
        choose(sex = "") {
            if (sex == "man") {
                this.choose_sex = 'man';
                this.man = require("../images/danone/02man_choose.png");
                this.woman = require("../images/danone/02woman.png");
            } else {
                this.choose_sex = 'woman';
                this.man = require("../images/danone/02man.png");
                this.woman = require("../images/danone/02woman_choose.png");
            }
        },
        blur(){
            window.scrollTo(0,0)
        },
        goExplore() {
            if(this.name.length  == 0 || this.name.length > 6){
                this.$toast.center("请填写不多于6个字的昵称");
            }else if(this.choose_sex == ''){
                this.$toast.center("请选择性别");
            }else{
                this.$router.push({ path: 'explore' })
            }
        },
        chooseImage(e) {
            let _this = this;
            if (!e.target.files[0]) {
                return;
            }
            lrz(e.target.files[0])
                .then(function(rst) {
                    if (rst.base64Len > 1024 * 1024 * 4) {
                        _this.lrzImage = "";
                        _this.$toast.center("图片不能超过4MB");
                        return;
                    } else {
                        // _this.showLazImageContent = true;
                        // _this.lrzImage = rst.base64;
                        _this.compositePicture(rst.base64);
                    }
                })
                .catch(function(err) {
                    _this.lrzImage = "";
                    _this.$toast.center("压缩图片失败");
                });
        },
        //合成图片
        compositePicture(res) {
            let img1 = new Image();
            let QRcodeImgCover = document.getElementById("QRcode");
            img1.src = res;
            img1.onload = () => {
                let c = document.createElement("canvas"),
                    ctx = c.getContext("2d");
                c.width = img1.naturalWidth;
                c.height = img1.naturalHeight;

                ctx.rect(0, 0, c.width, c.height);
                ctx.fillStyle = "#fff";
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
            };
        },
        close() {
            this.showLazImageContent = false;
        },
        initWeChat() {
            return app.api.wxConfig
                .config({
                    url: location.href.split("#")[0]
                })
                .then(data => {
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
        },
    }
};
</script>

<style lang="less" scoped>
.slide1 {
    height: 100vh;
    display: flex;
    align-content: center;
    align-items: center;
    background: #cceaff;
    position: relative;
    .slide1_bg {
        width: 100%;
    }
    .arrow {
        position: absolute;
        bottom: 4%;
        left: 0;
        right: 0;
        margin: 0 auto;
        width: 26px;
        height: 15px;
        animation: scaleDraw 5s ease-in-out infinite;
        -webkit-animation: scaleDraw 5s ease-in-out infinite;
        img {
            width: 100%;
            height: 100%;
        }
    }
}
.slide2 {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    justify-content: center;
    background: #daf0fe;
    position: relative;
    @media only screen and (max-width: 320px) {
        .slide2_bg {
            width: 82%;
        }
    }
    @media only screen and (min-width: 321px) and (max-width: 414px) {
        .slide2_bg {
            width: 85%;
        }
    }
    @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
        .slide2_bg {
            width: 90%;
            margin-bottom: 10%;
        }
    }
    .nickname {
        outline: none;
        -webkit-appearance: none;
        border-radius: 0;
        width: 34%;
        height: 30px;
        line-height: 30px;
        padding-left: 5px;
        position: absolute;
        top: 52.4%;
        left: 38%;
        border: 2px solid #000000;
    }
    @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
        .nickname {
            top: 49.6%;
        }
    }
    .choose-sex {
        position: absolute;
        height: 120px;
        width: 70%;
        top: 60%;
        display: flex;
        flex-direction: row;
        align-content: center;
        align-items: center;
        justify-content: space-around;
        .sex {
            width: 36%;
        }
    }
    @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
        .choose-sex {
            top: 56%;
        }
    }
    .btn_explore {
        position: absolute;
        width: 36%;
        height: 40px;
        top: 84%;
        img {
            width: 100%;
            height: 100%;
        }
    }
    @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
        .btn_explore {
            top: 78%;
        }
    }
}
@keyframes scaleDraw {
    /*定义关键帧、scaleDrew是需要绑定到选择器的关键帧名称*/
    0% {
        transform: scale(1); /*开始为原始大小*/
    }
    25% {
        transform: scale(1.4); /*放大1.1倍*/
    }
    50% {
        transform: scale(1);
    }
    75% {
        transform: scale(1.4);
    }
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

.laz-content {
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
    width: 100%;
    height: 100vh;
    max-height: 100vh;
    min-height: 100vh;
    .laz-img {
        position: absolute;
        width: 90%;
        left: 0;
        right: 0;
        margin: 0 auto;
        margin-top: 5%;
        border-radius: 10px;
        height: calc(100vh - 140px);
    }
    .close {
        position: absolute;
        bottom: 5%;
        left: 0;
        right: 0;
        margin: 0 auto;
        width: 50px;
        height: 50px;
    }
}
@import '../../node_modules/swiper/dist/css/swiper.min.css';
</style>
