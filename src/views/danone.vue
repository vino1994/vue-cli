<template>
    <div style="display:750px;overflow: hidden;height:100vh;position:relative;">
        <Loading v-show="showLoading"></Loading>
        <div class="angin" v-show="activeIndex == 5" @click="angin">
            <img :src="anginBtn" alt="">
        </div>
        <div class="music" @click="change">
            <img v-show="!stop" class="r" src="../images/danone/01mp3.png" alt="">
            <img v-show="stop" src="../images/danone/02mp3.png" alt="">
            <audio class="video" autoplay="autoplay" id="video" controls="controls" loop="loop">
                <source src="http://pdjjnwdwb.bkt.clouddn.com/video.mp3" />
            </audio>
        </div>
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <!-- 第一屏 -->
                <div class="swiper-slide swiper-no-swiping">
                    <div class="slide1">
                        <img class="slide1_bg" src="../images/test/103.png" alt="">
                        <img class="seagull fudong" src="../images/test/102.png" alt="">
                        <div class="earth-content" @click="start">
                            <img class="earth" src="../images/test/diqiu.png" alt="">
                            <img id="ren" class="ren" src="../images/test/ren.png" alt="">
                            <img class="yinying" src="../images/test/shadow.png" alt="">
                            <img id="title" class="title show" src="../images/test/title.png" alt="">
                        </div>
                        <img class="logo" src="../images/test/logo.png" alt="">
                        <p class="text">*本活动奖励机制仅针对达能员工使用<br/>活动最终解释权归达能所有</p>
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
                            <img :src="tansuo" alt="">
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
                        <img class="fanhui" @click="fanhui" src="../images/danone/fanhui.png" alt="">
                        <img class="challenge" :style="{width:challengeItem.wd}" :src="challengeItem.src" alt="">
                        <div class="challenge-btn" @click="next('four')">
                            <img :src="tiaozhan" alt="">
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
                                    <div style="position:relative;max-height: 8.9rem;">
                                        <img class="close" v-show="lrzImage" @click="close" src="../images/danone/close.png" alt="">
                                        <img class="lrz_image" :src="lrzImage" alt="">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="upload_btn" @click="next('five')">
                            <img class="btn" :src="shangchuan" alt="">
                        </div>
                    </div>
                </div>
                <!-- 第六屏 -->
                <div class="swiper-slide swiper-no-swiping">
                    <div class="save" id="save" v-cloak>
                        <img class="save_bg" :src="save_bg_img" alt="">
                        <img id="badge" class="badge" src="../images/danone/photo/badge.png" alt="">
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
                        <div class="save_img_content" v-show="saveImgSrc" @touchstart="gtouchstart()" @touchmove="gtouchmove()" @touchend="gtouchend()">
                            <img :src="saveImgSrc" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as Swiper from "swiper/dist/js/swiper.js";
import Loading from "../components/loading";
import lrz from "lrz";
// import wxSdk from "../js/wx-sdk";
import html2canvas from "html2canvas";
export default {
    data() {
        return {
            stop: false,
            showLoading: true, //是否显示loading动画
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
                src: 'http://pdjjnwdwb.bkt.clouddn.com/challenge_yogurt.png',
                wd: "10rem"
            },
            tableware: {
                bg: "#eae1d3",
                src: 'http://pdjjnwdwb.bkt.clouddn.com/challenge_tableware.png',
                wd: "10rem"
            },
            bag: {
                bg: "#d5eff5",
                src: 'http://pdjjnwdwb.bkt.clouddn.com/challenge_bag.png',
                wd: "10rem"
            },
            smile: {
                bg: "#ffffff",
                src: 'http://pdjjnwdwb.bkt.clouddn.com/challenge_smile.png',
                wd: "10rem"
            },
            fruit: {
                bg: "#d5e4f5",
                src: 'http://pdjjnwdwb.bkt.clouddn.com/challenge_fruit.png',
                wd: "10rem"
            },
            use: {
                bg: "#fff1ed",
                src: 'http://pdjjnwdwb.bkt.clouddn.com/challenge_use.png',
                wd: "10rem"
            },
            save_bg_img: "", //图片背景
            saveImgSrc: "", //保存图片路径
            tansuo: require("../images/danone/tansuo01.png"),
            tiaozhan: require("../images/danone/01tiaozhan.png"),
            shangchuan: require("../images/danone/01shangchuan.png"),
            anginBtn: require("../images/danone/again01.png"),
            timeOutEvent: 0 //长按时间定时器
        };
    },
    components: {
        Loading
    },
    watch: {
        save_bg_img(nowVal, oldVal) {
            if (nowVal != oldVal) {
                this.showLoading = false;
                setTimeout(() => {
                    this.upload();
                }, 2000);
            }
        }
    },
    mounted() {
        // this.initWeChat();
        this.ajax(res => {
            this.initSwiper();
            window.addEventListener("scroll", () => {
                if (window.scrollY > 0 && this.name != "") {
                    window.scrollTo(0, 0);
                }
            });
            window.onorientationchange = function() {
                if (window.orientation == 90 || window.orientation == -90) {
                    alert("为了您的良好的体验，请将手机/平板竖屏操作~");
                }
            };
            // }
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
                updateOnImagesReady: true,
                setWrapperSize: true,
                observer: true,
                observeParents: false,
                noSwiping: true,
                on: {
                    // init:function(){
                    //     swiperAnimateCache(this); //隐藏动画元素
                    //     swiperAnimate(this); //初始化完成开始动画
                    // },
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
                    // slideChangeTransitionEnd: function(){
                    //     swiperAnimate(this); //每个slide切换结束时也运行当前slide动画
                    // },
                    imagesReady: function() {
                        _this.initMp3();
                        setTimeout(() => {
                            _this.showLoading = false;
                        }, 4300);
                    }
                }
            });
            _this.mySwiper = mySwiper;
        },
        //开始动画
        start() {
            let obj = document.getElementById("ren");
            obj.classList.add("disappear");
            setTimeout(() => {
                this.next("one");
            }, 500);
            return;
        },
        //跳转到下一个swiper
        next(num, type = "") {
            if (num == "one") {
                this.mySwiper.slideNext();
            } else if (num == "two") {
                this.tansuo = require("../images/danone/tansuo02.png");
                if (this.name.length == 0 || this.name.length > 6) {
                    setTimeout(() => {
                        this.tansuo = require("../images/danone/tansuo01.png");
                    }, 200);
                    this.$toast.center("昵称不能超过六个字哦~");
                } else if (this.choose_sex == "") {
                    setTimeout(() => {
                        this.tansuo = require("../images/danone/tansuo01.png");
                    }, 200);
                    this.$toast.center("请选择性别");
                } else {
                    this.mySwiper.slideNext();
                }
            } else if (num == "three") {
                this.explore_type = type;
                this.choose_challenge();
            } else if (num == "four") {
                this.tiaozhan = require("../images/danone/02tiaozhan.png");
                setTimeout(() => {
                    this.mySwiper.slideNext();
                }, 200);
            } else if (num == "five") {
                this.shangchuan = require("../images/danone/02shangchuan.png");
                if (!this.lrzImage) {
                    setTimeout(() => {
                        this.shangchuan = require("../images/danone/01shangchuan.png");
                    }, 200);
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
        fanhui() {
            this.mySwiper.slidePrev();
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
                'http://pdjjnwdwb.bkt.clouddn.com/01man.jpg',
                'http://pdjjnwdwb.bkt.clouddn.com/02man.jpg',
                'http://pdjjnwdwb.bkt.clouddn.com/03man.jpg',
                'http://pdjjnwdwb.bkt.clouddn.com/04man.jpg',
                'http://pdjjnwdwb.bkt.clouddn.com/05man.jpg',
                'http://pdjjnwdwb.bkt.clouddn.com/06man.jpg',
                'http://pdjjnwdwb.bkt.clouddn.com/07man.jpg'
            ];
            let womanArr = [
                'http://pdjjnwdwb.bkt.clouddn.com/01woman.jpg',
                'http://pdjjnwdwb.bkt.clouddn.com/02woman.jpg',
                'http://pdjjnwdwb.bkt.clouddn.com/03woman.jpg',
                'http://pdjjnwdwb.bkt.clouddn.com/04woman.jpg',
                'http://pdjjnwdwb.bkt.clouddn.com/05woman.jpg',
                'http://pdjjnwdwb.bkt.clouddn.com/06woman.jpg',
                'http://pdjjnwdwb.bkt.clouddn.com/07woman.jpg'
            ];
            if (this.choose_sex == "man") {
                let num = this.fRandomBy(0, 6);
                this.save_bg_img = manArr[num];
            } else {
                let num = this.fRandomBy(0, 6);
                this.save_bg_img = womanArr[num];
            }
            let obj = document.getElementById("badge");
            obj.classList.add("seal");
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
            let obj = document.getElementById("badge");
            obj.style.opacity = "1";
            html2canvas(document.querySelector("#save"), opts).then(canvas => {
                this.saveImgSrc = canvas.toDataURL("image/jpg");
            });
        },
        ajax(callback) {
            var xhr = null;
            if (window.XMLHttpRequest) {
                xhr = new window.XMLHttpRequest();
            } else {
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
        //音乐按钮
        change() {
            var myVideo = document.getElementById("video");
            if (this.stop) {
                myVideo.play();
            } else {
                myVideo.pause();
            }
            this.stop = this.stop == true ? false : true;
        },
        initMp3() {
            var myVideo = document.getElementById("video");
            myVideo.play();
            document.addEventListener(
                "WeixinJSBridgeReady",
                function() {
                    myVideo.play();
                },
                false
            );
        },
        //开始按
        gtouchstart() {
            this.timeOutEvent = setTimeout(() => {
                this.longPress();
            }, 500);
            return false;
        },
        //手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
        gtouchend() {
            clearTimeout(this.timeOutEvent); //清除定时器
            return false;
        },
        //如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
        gtouchmove() {
            clearTimeout(this.timeOutEvent); //清除定时器
            this.timeOutEvent = 0;
        },
        //真正长按后应该执行的内容
        longPress() {
            this.timeOutEvent = 0;
            // alert("长按")
        },
        //再玩一次
        angin() {
            this.anginBtn = require("../images/danone/again02.png");
            this.showLoading = true;
            this.mySwiper.slideToLoop(0, 1000, false);
            this.initParams();
            setTimeout(()=>{
                this.showLoading = false;
            },2000)
        },
        //重置变量
        initParams(){
            // 第一屏
            let obj = document.getElementById("ren");
            obj.classList.remove("disappear");
            // 第二屏
            this.name = '';
            this.activeIndex = 0;
            this.man = require("../images/danone/02man.png");
            this.woman = require("../images/danone/02woman.png");
            // 第五屏
            this.lrzImage = '';
            document.getElementById("iamge").value = "";
            // 第六屏
            let obj2 = document.getElementById("badge");
            obj2.classList.remove("seal");
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
.angin {
    position: absolute;
    top: 0;
    right: 64px;
    z-index: 2;
    top: 1030px;
    img {
        width: 168px;
        height: 57px;
    }
}
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
    .angin {
        top: 1150px;
    }
}
.music {
    position: absolute;
    width: 50px;
    height: 50px;
    top: 20px;
    right: 20px;
    z-index: 9;
    .r {
        animation: rotate 3s linear infinite;
    }
    img {
        width: 100%;
    }
    .video {
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        visibility: hidden;
        opacity: 0;
    }
}
.slide1 {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    background: #cceaff;
    position: relative;
    .slide1_bg {
        width: 750px;
    }
    .seagull {
        position: absolute;
        width: 158px;
        height: 74px;
        top: 220px;
        left: 530px;
    }
    @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
        .seagull {
            top: 320px;
        }
    }
    .earth-content {
        position: absolute;
        width: 899px;
        height: 727px;
        top: 380px;
        right: 0;
        .earth {
            position: absolute;
            width: 497px;
            height: 497px;
            top: 0;
            right: -140px;
        }
        .ren {
            position: absolute;
            width: 899px;
            height: 475px;
            bottom: 0px;
            left: 200px;
        }
        .yinying {
            position: absolute;
            bottom: -4px;
            left: 216px;
            width: 192px;
            height: 10px;
        }
        .title {
            position: absolute;
            width: 169px;
            height: 93px;
            right: 50px;
            bottom: 50px;
        }
    }
    @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
        .earth-content {
            .earth {
                top: 110px;
            }
            .ren {
                bottom: -120px;
            }
            .yinying {
                bottom: -126px;
            }
            .title {
                bottom: -100px;
            }
        }
    }
    .logo{
        position: absolute;
        width: 113px;
        height: 36px;
        top: 1140px;
        left: 70px;
    }
    .text{
        position: absolute;
        font-size: 16px;
        font-family: Lantinghei SC;
        top: 1126px;
        right: 30px;
        color: #969696;
        text-align: right;
    }
    @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
        .logo{
            top: 1280px;
        }
        .text{
            top: 1270px;
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
    .slide2_bg {
        width: 616px;
    }
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
            top: 756px;
        }
    }
    .choose-sex {
        position: absolute;
        width: 525px;
        top: 60%;
        left: 0;
        right: 0;
        margin: 0 auto;
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
            top: 860px;
        }
    }
    .btn_explore {
        position: absolute;
        top: 84%;
        left: 0;
        right: 0;
        margin: 0 auto;
        text-align: center;
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
    position: relative;
    .fanhui {
        position: absolute;
        width: 50px;
        height: 50px;
        top: 20px;
        left: 20px;
        z-index: 2;
    }
    .challenge-btn {
        position: absolute;
        bottom: 50px;
        img {
            width: 288px;
        }
    }
    @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
        .challenge-btn {
            margin-top: 60px;
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
            width: 480px;
            height: 8.9rem;
            top: 120px;
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
                top: 20px;
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
    .badge {
        position: absolute;
        width: 138px;
        height: 175px;
        top: 220px;
        right: 20px;
        opacity: 0;
    }
    @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
        .badge {
            top: 340px;
        }
    }
    .name {
        position: absolute;
        font-size: 30px;
        font-family: Lantinghei SC;
        font-weight: bold;
        display: inline-block;
        top: 70px;
        left: 60px;
        .g {
            width: 100%;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: space-between;
        }
    }
    @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
        .name {
            top: 200px;
        }
    }
    .save_img {
        position: absolute;
        width: 250px;
        height: 342px;
        background: #fff;
        top: 840px;
        left: 60px;
        box-sizing: border-box;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        align-content: center;
        img {
            position: absolute;
            width: 90%;
            padding: 20px;
        }
    }
    @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
        .save_img {
            top: 950px;
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
@-webkit-keyframes rotate {
    from {
        transform: rotate(0deg);
        -webkit-transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
        -webkit-transform: rotate(360deg);
    }
}
.fudong {
    animation: 1s linear 0s none infinite alternate fudong;
}
@keyframes fudong {
    from {
        transform: translate3d(0, 0, 0);
        opacity: 1;
    }
    to {
        transform: translate3d(0, 20px, 0);
        opacity: 0.8;
    }
}
.doudong {
    animation: 1s linear 0s none infinite alternate doudong;
}
@keyframes doudong {
    0% {
        transform: rotate(0deg);
        opacity: 1;
    }
    50% {
        transform: rotate(1deg);
        opacity: 1;
    }
    100% {
        transform: rotate(0deg);
        opacity: 1;
    }
}
.doudong2 {
    animation: 1s linear 0s none infinite alternate doudong2;
}
@keyframes doudong2 {
    0% {
        transform: rotate(0deg);
        opacity: 1;
    }
    50% {
        transform: rotate(8deg);
        opacity: 1;
    }
    100% {
        transform: rotate(0deg);
        opacity: 1;
    }
}
.disappear {
    animation: 1s linear 0s alternate disappear;
    animation-fill-mode: none;
}
@-webkit-keyframes disappear {
    0% {
        left: 200px;
        opacity: 1;
    }
    100% {
        left: 100px;
        opacity: 0;
    }
}
.show {
    animation: show 8.5s linear alternate;
    animation-fill-mode: none;
}
@-webkit-keyframes show {
    0% {
        opacity: 0;
    }
    50% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
.seal {
    animation: seal 500ms ease-in 1s 1;
    animation-fill-mode: forwards;
}
@-webkit-keyframes seal {
    0% {
        transform: scale(2);
        opacity: 0;
    }
    25% {
        transform: scale(1.4);
        opacity: 0.8;
    }
    50% {
        transform: scale(1.2);
        opacity: 1;
    }
    75% {
        transform: scale(1.1);
        opacity: 1;
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}
@import "../../node_modules/swiper/dist/css/swiper.min.css";
</style>
