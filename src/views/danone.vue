<template>
    <div style="overflow: hidden;height: 100vh;">
        <Loading v-show="showLoading"></Loading>
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <!-- 第一屏 -->
                <div class="swiper-slide swiper-no-swiping">
                    <div class="slide1">
                        <img class="slide1_bg" src="../images/1111.png" alt="">
                        <div class="arrow" @click="next('one')">
                            <img src="../images/danone/01arrow.png" alt="">
                        </div>
                    </div>
                </div>
                <!-- 第二屏 -->
                <div class="swiper-slide swiper-no-swiping">
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
                        <div class="btn_explore" @click="next('two')">
                            <img src="../images/danone/02btn.png" alt="">
                        </div>
                    </div>
                </div>
                <!-- 第三屏 -->
                <div class="swiper-slide swiper-no-swiping">
                    <div class="explore-content">
                        <img src="../images/danone/03.png" alt="">
                        <div class="ul">
                            <div class="li" v-for="item in items" :key="item.id" @click="next('three',item.type)">
                                <img :src="item.src" alt="">
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 第四屏 -->
                <div class="swiper-slide swiper-no-swiping">
                    <div class="challenge-content" :style="{background:challengeItem.bg}">
                        <img class="challenge" :style="{width:challengeItem.wd}" :src="challengeItem.src" alt="">
                        <div class="challenge-btn" @click="next('four')">
                            <img src="../images/danone/challenge_btn.png" alt="">
                        </div>
                    </div>
                </div>
                <!-- 第五屏 -->
                <div class="swiper-slide swiper-no-swiping">
                    <div class="upload">
                        <div class="upload_content">
                            <img class="upload_img" src="../images/danone/upload.png" alt="">
                            <div class="photo_content">
                                <img v-show="!lrzImage" class="add" src="../images/danone/add.png" alt="">
                                <input v-show="!lrzImage" class="fileimage" type="file" name="image" id="iamge" @change="chooseImage" accept="image/*" />
                                <div class="lrz_content" v-show="lrzImage">
                                    <img class="lrz_image" :src="lrzImage" alt="">
                                </div>
                                <img class="close" v-show="lrzImage" @click="close" src="../images/danone/close.png" alt="">
                            </div>
                        </div>
                        <div class="upload_btn">
                            <img class="btn" src="../images/danone/btn03.png" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="choose" v-show="isShowInput">
            <span>选择图片</span>
            <input class="fileimage" type="file" name="image" id="iamge" @change="chooseImage" accept="image/*" />
        </div> -->
        <!-- <div class="laz-content" @touchmove.prevent>
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
            lrzImage: "",//用户预览图片
            name: "", //昵称
            man: require("../images/danone/02man.png"),
            woman: require("../images/danone/02woman.png"),
            choose_sex: "", //选择的性别
            mySwiper: "", //swiper容器
            items: [
                {
                    id: 1,
                    src: require("../images/danone/03yogurt.png"),
                    type: "yogurt"
                },
                {
                    id: 2,
                    src: require("../images/danone/03tableware.png"),
                    type: "tableware"
                },
                {
                    id: 3,
                    src: require("../images/danone/03bag.png"),
                    type: "bag"
                },
                {
                    id: 4,
                    src: require("../images/danone/03smile.png"),
                    type: "smile"
                },
                {
                    id: 5,
                    src: require("../images/danone/03fruit.png"),
                    type: "fruit"
                },
                {
                    id: 6,
                    src: require("../images/danone/03twouse.png"),
                    type: "use"
                }
            ],
            explore_type: "", //选择挑战类型
            challengeItem: {
                bg: "#fffade",
                src: require("../images/danone/challenge_yogurt.png")
            },
            yogurt: {
                bg: "#fffade",
                src: require("../images/danone/challenge_yogurt.png")
            },
            tableware: {
                bg: "#eae1d3",
                src: require("../images/danone/challenge_tableware.png"),
                wd: "80%"
            },
            bag: {
                bg: "#d5eff5",
                src: require("../images/danone/challenge_bag.png")
            },
            smile: {
                bg: "#ffffff",
                src: require("../images/danone/challenge_smile.png"),
                wd: "80%"
            },
            fruit: {
                bg: "#d5e4f5",
                src: require("../images/danone/challenge_fruit.png"),
                wd: "76%"
            },
            use: {
                bg: "#fff1ed",
                src: require("../images/danone/challenge_use.png"),
                wd: "72%"
            }
        };
    },
    components: {
        Loading
    },
    mounted() {
        // this.initWeChat();
        this.initSwiper();
        window.addEventListener("scroll", () => {
            if (window.scrollY > 0 && this.name != "") {
                window.scrollTo(0, 0);
            }
        });
    },
    methods: {
        //初始化swiper
        initSwiper() {
            let _this = this;
            var mySwiper = new Swiper(".swiper-container", {
                direction: "vertical",
                effect: "fade",
                speed: 300,
                setWrapperSize: true,
                noSwiping: true,
                on: {
                    slideChangeTransitionStart: function() {
                        switch (this.activeIndex) {
                            case 0:
                                document.title = "少塑派行动";
                                break;
                            case 1:
                                document.title = "少塑派宣言";
                                break;
                            case 2:
                                document.title = "环保少塑势在必行";
                                break;
                            case 3:
                                document.title = "开始挑战";
                                break;
                        }
                    },
                    imagesReady: function() {
                        _this.showLoading = false;
                    }
                }
            });
            _this.mySwiper = mySwiper;
        },
        //跳转到下一个swiper
        next(num, type = "") {
            if (num == "one") {
                this.mySwiper.slideNext();
            } else if (num == "two") {
                if (this.name.length == 0 || this.name.length > 6) {
                    this.$toast.center("请填写不多于6个字的昵称");
                } else if (this.choose_sex == "") {
                    this.$toast.center("请选择性别");
                } else {
                    this.mySwiper.slideNext();
                }
            } else if (num == "three") {
                this.explore_type = type;
                this.choose_challenge();
            }else if(num == "four"){
                this.mySwiper.slideNext();
            }
        },
        //选择性别
        choose(sex = "") {
            if (sex == "man") {
                this.choose_sex = "man";
                this.man = require("../images/danone/02man_choose.png");
                this.woman = require("../images/danone/02woman.png");
            } else {
                this.choose_sex = "woman";
                this.man = require("../images/danone/02man.png");
                this.woman = require("../images/danone/02woman_choose.png");
            }
        },
        //解决软键盘收起时的问题
        blur() {
            window.scrollTo(0, 0);
        },
        //选择挑战类型
        choose_challenge() {
            switch (this.explore_type) {
                case "yogurt":
                    this.challengeItem = this.yogurt;
                    break;
                case "tableware":
                    this.challengeItem = this.tableware;
                    break;
                case "bag":
                    this.challengeItem = this.bag;
                    break;
                case "smile":
                    this.challengeItem = this.smile;
                    break;
                case "fruit":
                    this.challengeItem = this.fruit;
                    break;
                case "use":
                    this.challengeItem = this.use;
                    break;
            }
            this.mySwiper.slideNext();
        },
        //上传图片
        chooseImage(e) {
            let _this = this;
            if (!e.target.files[0]) {
                return;
            }
            _this.showLoading = true;
            lrz(e.target.files[0]).then(function(rst) {
                if (rst.base64Len > 1024 * 1024 * 4) {
                    _this.lrzImage = "";
                    _this.$toast.center("图片不能超过4MB");
                    return;
                } else {
                    _this.showLoading = false;
                    _this.lrzImage = rst.base64;
                    // _this.compositePicture(rst.base64);
                }
            })
            .catch(function(err) {
                _this.lrzImage = "";
                _this.$toast.center("压缩图片失败");
            });
        },
        //关闭预览
        close() {
            this.lrzImage = '';
            document.getElementById('iamge').value = '';
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
            };
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
        }
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
.explore-content {
    width: 100%;
    height: 100vh;
    background-color: #daf0fe;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-content: center;
    .ul {
        display: flex;
        flex-direction: row;
        align-content: center;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        .li {
            width: 50%;
            margin-bottom: 10px;
            img {
                width: 58%;
                padding: 5px;
            }
            img:active {
                background: #7691ae;
            }
        }
        .li:nth-child(2n) {
            text-align: left;
            img {
                margin-left: 20px;
            }
        }
        .li:nth-child(2n-1) {
            text-align: right;
            img {
                margin-right: 20px;
            }
        }
        .li:nth-child(5),
        .li:nth-child(6) {
            margin-bottom: 0;
        }
    }
}
.challenge-content {
    width: 100%;
    height: 100vh;
    display: flex;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-content: center;
    .challenge {
        width: 90%;
    }
    .challenge-btn {
        width: 35%;
        margin-top: 30px;
        img {
            width: 100%;
        }
    }
}
.upload{
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-content: center;
    background: #daf0fe;
    .upload_content{
        width: 80%;
        position: relative;
        .upload_img{
            width: 100%;
        }
        .photo_content{
            width: 83.4%;
            height: 57.8vh;
            top: 9.9%;
            position: absolute;
            left: 0;
            right: 0;
            margin: 0 auto;
            overflow: hidden;
            .add{
                position: absolute;
                margin: auto;
                width: 90px;
                left: 0px;
                right: 0px;
                top: 0px;
                bottom: 0px;
            }
            .fileimage {
                position: absolute;
                top: 0;
                left: 0;
                opacity: 0;
                -ms-filter: "alpha(opacity=0)";
                width: 100px;
                height: 100px;
                bottom: 0;
                right: 0;
                margin: auto;
            }
            .lrz_content{
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                align-content: center;
                background: #fff;
                .lrz_image{
                    width: 100%;
                }
            }
            .close{
                position: absolute;
                top: 5%;
                right: 5%;
                width: 24px;
            }
        }
    }
    .upload_btn{
        width: 30%;
        margin-top: 30px;
        .btn{
            width: 100%;
        }
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
@import "../../node_modules/swiper/dist/css/swiper.min.css";
</style>
