<template>
    <div :class="{isBegin:isBegin}">
        <Loading v-show="showLoading"></Loading>
        <div class="swiper-container" v-show="isBegin && !isOver">
            <div class="swiper-wrapper">
                <!-- 第一屏 -->
                <div class="swiper-slide swiper-no-swiping">
                    <div class="slide1">
                        <img class="slide1_bg" src="../images/danone/111.png" alt="">
                        <div class="arrow" @click="next('one')">
                            <img src="../images/danone/01arrow.png" alt="">
                        </div>
                    </div>
                </div>
                <!-- 第二屏 -->
                <div class="swiper-slide swiper-no-swiping">
                    <div class="slide2">
                        <img class="slide2_bg" src="../images/danone/222.png" alt="">
                        <input class="nickname" v-model='name' @blur="blur" placeholder="请填写昵称" />
                        <div class="choose-sex">
                            <div class="sex" @click="choose('man')">
                                <img :src="man" alt="">
                            </div>
                            <div class="sex2" @click="choose('woman')">
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
                    <div class="explore-content" v-cloak>
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
                    <div class="challenge-content" :style="{background:challengeItem.bg}" v-show="!!challengeItem.bg" v-cloak>
                        <img class="challenge" :style="{width:challengeItem.wd}" :src="challengeItem.src" alt="">
                        <div class="challenge-btn" @click="next('four')">
                            <img src="../images/danone/challenge_btn.png" alt="">
                        </div>
                    </div>
                </div>
                <!-- 第五屏 -->
                <div class="swiper-slide swiper-no-swiping">
                    <div class="upload" v-cloak>
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
                        <div class="upload_btn" @click="next('five')">
                            <img class="btn" src="../images/danone/btn03.png" alt="">
                        </div>
                    </div>
                </div>
                <!-- 第六屏 -->
                <div class="swiper-slide swiper-no-swiping">
                    <div class="save" id="save" v-cloak>
                        <img class="save_bg" :src="save_bg_img" alt="">
                        <div class="name">
                            <div v-cloak>恭喜{{name}}</div>
                            <div class="g">
                                <div>喜</div>
                                <div>提</div>
                            </div>
                        </div>
                        <div class="save_img">
                            <img v-show="activeIndex == 5 && lrzImage" :src="lrzImage" alt="">
                        </div>
                        <div class="save_img_content" v-show="saveImgSrc">
                            <img :src="saveImgSrc" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <img style="width:750px;" src="../images/danone/not_started.jpg" alt="" v-show="!isBegin && !isOver">
        <img style="width:750px;" src="../images/danone/isOver.jpg" alt="" v-show="!isBegin && isOver">
    </div>
</template>

<script>
import Swiper from "swiper";
import Loading from "../components/loading";
import lrz from "lrz";
import wxSdk from "../js/wx-sdk";
import html2canvas from "html2canvas";
export default {
    data() {
        return {
            showLoading: false, //是否显示loading动画
            lrzImage: "", //用户预览图片
            name: "", //昵称
            activeIndex: "", //轮播index
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
                bg: "",
                src: "",
                wd: ""
            },
            yogurt: {
                bg: "#fffade",
                src: require("../images/danone/challenge_yogurt.png"),
                wd: "9.306667rem"
            },
            tableware: {
                bg: "#eae1d3",
                src: require("../images/danone/challenge_tableware.png"),
                wd: "8.253333rem"
            },
            bag: {
                bg: "#d5eff5",
                src: require("../images/danone/challenge_bag.png"),
                wd: "9.146667rem"
            },
            smile: {
                bg: "#ffffff",
                src: require("../images/danone/challenge_smile.png"),
                wd: "8.333333rem"
            },
            fruit: {
                bg: "#d5e4f5",
                src: require("../images/danone/challenge_fruit.png"),
                wd: "7.573333rem"
            },
            use: {
                bg: "#fff1ed",
                src: require("../images/danone/challenge_use.png"),
                wd: "7.48rem"
            },
            save_bg_img: "", //图片背景
            saveImgSrc: "", //保存图片路径
            isBegin:false,
            isOver:false
        };
    },
    components: {
        Loading
    },
    watch: {
        save_bg_img(nowVal, oldVal) {
            if (nowVal != oldVal) {
                setTimeout(() => {
                    this.upload();
                }, 500);
            }
        }
    },
    mounted() {
        // this.initWeChat();
        this.ajax(res => {
            if(res < 1534867200000){
                this.isBegin = false;
            }else if(res > 1535126399000){
                this.isOver = true;
            }else{
                this.isBegin = true;
                this.initSwiper();
                window.addEventListener("scroll", () => {
                    if (window.scrollY > 0 && this.name != "") {
                        window.scrollTo(0, 0);
                    }
                });
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
                        _this.activeIndex = this.activeIndex;
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
                            case 4:
                                document.title = "生成少塑派";
                                break;
                            case 5:
                                document.title = "你的少塑派";
                                _this.showLoading = true;
                                _this.calculation();
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
                    this.$toast.center("昵称不能超过六个字哦~");
                } else if (this.choose_sex == "") {
                    this.$toast.center("请选择性别");
                } else {
                    this.mySwiper.slideNext();
                }
            } else if (num == "three") {
                this.explore_type = type;
                this.choose_challenge();
            } else if (num == "four") {
                this.mySwiper.slideNext();
            } else if (num == "five") {
                if (!this.lrzImage) {
                    this.$toast.center("请上传照片");
                    return;
                } else {
                    this.mySwiper.slideNext();
                }
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
            lrz(e.target.files[0])
                .then(function(rst) {
                    if (rst.base64Len > 1024 * 1024 * 4) {
                        _this.lrzImage = "";
                        _this.$toast.center("图片不能超过4MB");
                        return;
                    } else {
                        _this.showLoading = false;
                        _this.lrzImage = rst.base64;
                    }
                })
                .catch(function(err) {
                    _this.lrzImage = "";
                    _this.$toast.center("压缩图片失败");
                });
        },
        //关闭预览
        close() {
            this.lrzImage = "";
            document.getElementById("iamge").value = "";
        },
        //计算生成的图片
        calculation() {
            let manArr = [
                require("../images/danone/photo/01man.png"),
                require("../images/danone/photo/02man.png"),
                require("../images/danone/photo/03man.png"),
                require("../images/danone/photo/04man.png"),
                require("../images/danone/photo/05man.png"),
                require("../images/danone/photo/06man.png"),
                require("../images/danone/photo/07man.png")
            ];
            let womanArr = [
                require("../images/danone/photo/01woman.png"),
                require("../images/danone/photo/02woman.png"),
                require("../images/danone/photo/03woman.png"),
                require("../images/danone/photo/04woman.png"),
                require("../images/danone/photo/05woman.png"),
                require("../images/danone/photo/06woman.png"),
                require("../images/danone/photo/07woman.png")
            ];
            if (this.choose_sex == "man") {
                let num = this.fRandomBy(0, 6);
                this.save_bg_img = manArr[num];
            } else {
                let num = this.fRandomBy(0, 6);
                this.save_bg_img = womanArr[num];
            }
        },
        //1-7随机数,(0,6)
        fRandomBy(under, over) {
            switch (arguments.length) {
                case 1:
                    return parseInt(Math.random() * under + 1);
                case 2:
                    return parseInt(Math.random() * (over - under + 1) + under);
                default:
                    return 0;
            }
        },
        //使用html2canvas生成图片
        upload() {
            let opts = {
                scale: 2
            };
            html2canvas(document.querySelector("#save"), opts).then(canvas => {
                this.saveImgSrc = canvas.toDataURL("image/jpg");
                this.showLoading = false;
            });
        },
        ajax(callback) {
            var xhr = null;
            if (window.XMLHttpRequest) {
                xhr = new window.XMLHttpRequest();
            } else {
                // ie
                xhr = new ActiveObject("Microsoft");
            }
            // 通过get的方式请求当前文件
            xhr.open("get", "/");
            xhr.send(null);
            // 监听请求状态变化
            xhr.onreadystatechange = function() {
                var time = null;
                if (xhr.readyState === 2) {
                    // 获取响应头里的时间戳
                    time = xhr.getResponseHeader("Date");
                    callback(new Date(time).getTime());
                }
            };
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
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    background: #cceaff;
    position: relative;
    .slide1_bg {
        // width: 750px;
        width: 684px;
    }
    .arrow {
        position: absolute;
        bottom: 4%;
        left: 0;
        right: 0;
        margin: 0 auto;
        width: 36px;
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
    // @media only screen and (max-width: 320px) {
    .slide2_bg {
        width: 616px;
    }
    // }
    // @media only screen and (min-width: 321px) and (max-width: 414px) {
    //     .slide2_bg {
    //         width: 85%;
    //     }
    // }
    // @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
    //     .slide2_bg {
    //         width: 90%;
    //         margin-bottom: 10%;
    //     }
    // }
    .nickname {
        outline: none;
        -webkit-appearance: none;
        border-radius: 0;
        width: 250px;
        height: 56px;
        line-height: 56px;
        padding-left: 5px;
        position: absolute;
        top: 52.4%;
        left: 38%;
        border: 2px solid #000000;
        font-size: 24px;
    }
    @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
        .nickname {
            top: 49.6%;
        }
    }
    .choose-sex {
        position: absolute;
        width: 525px;
        top: 60%;
        display: flex;
        flex-direction: row;
        align-content: center;
        align-items: center;
        justify-content: space-around;
        .sex {
            width: 193px;
        }
        .sex2 {
            width: 196px;
        }
    }
    @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
        .choose-sex {
            top: 56%;
        }
    }
    .btn_explore {
        position: absolute;
        top: 84%;
        img {
            width: 287px;
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
        margin-top: 10px;
        .li {
            width: 50%;
            margin-bottom: 20px;
            img {
                width: 197px;
                padding: 5px;
            }
            img:active {
                background: #7691ae;
            }
        }
        .li:nth-child(2n) {
            text-align: left;
            img {
                margin-left: 30px;
            }
        }
        .li:nth-child(2n-1) {
            text-align: right;
            img {
                margin-right: 30px;
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
    .challenge-btn {
        margin-top: 30px;
        img {
            width: 288px;
        }
    }
}
.upload {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-content: center;
    background: #daf0fe;
    .upload_content {
        position: relative;
        .upload_img {
            width: 590px;
        }
        .photo_content {
            width: 494px;
            height: 8.966rem;
            top: 91px;
            position: absolute;
            left: 0;
            right: 0;
            margin: 0 auto;
            overflow: hidden;
            .add {
                position: absolute;
                margin: auto;
                width: 198px;
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
            .lrz_content {
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                align-content: center;
                background: #fff;
                .lrz_image {
                    width: 100%;
                }
            }
            .close {
                position: absolute;
                top: 5%;
                right: 5%;
                width: 51px;
            }
        }
    }
    .upload_btn {
        margin-top: 70px;
        .btn {
            width: 228px;
        }
    }
}
.save {
    width: 100%;
    height: 100vh;
    background: #d9f1ff;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-content: center;
    .save_bg {
        width: 750px;
    }
    .name {
        position: absolute;
        font-size: 39px;
        font-family: Lantinghei SC;
        font-weight: bold;
        display: inline-block;
        top: 106px;
        left: 60px;
        .g {
            width: 100%;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: space-between;
        }
    }
    .save_img {
        position: absolute;
        width: 170px;
        height: 200px;
        background: #fff;
        bottom: 30px;
        left: 60px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        align-content: center;
        img {
            width: 90%;
        }
    }
    .save_img_content {
        position: absolute;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        opacity: 0;
        img {
            width: 100%;
        }
    }
}
@keyframes buttonPulse {
    from {
        background-color: #1e6a0f;
        -webkit-box-shadow: 0 0 25px #333;
    }
    50% {
        background-color: #39ba1f;
        -webkit-box-shadow: 0 0 75px #39ba1f;
    }
    to {
        background-color: #1e6a0f;
        -webkit-box-shadow: 0 0 25px #333;
    }
}
.isBegin{
    overflow: hidden;
    height: 100vh;
}
@import "../../node_modules/swiper/dist/css/swiper.min.css";
</style>
