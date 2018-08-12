<template>
    <!-- <div class="loader" @touchmove.prevent>
        <div class="loader-inner">
            <div class="loader-line-wrap">
                <div class="loader-line"></div>
            </div>
            <div class="loader-line-wrap">
                <div class="loader-line"></div>
            </div>
            <div class="loader-line-wrap">
                <div class="loader-line"></div>
            </div>
            <div class="loader-line-wrap">
                <div class="loader-line"></div>
            </div>
            <div class="loader-line-wrap">
                <div class="loader-line"></div>
            </div>
        </div>
    </div> -->
    <div class="loader2" @touchmove.prevent>
        <div class="box">
            <span class="lod2"></span>
            <img class="loading" src="../images/danone/loading.png" alt="">
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            wd:2
        }
    },
    mounted() {
        this.schedule();
    },
    methods: {
        schedule(){
            let num = 1;
            let timer = setInterval(()=>{
                if(this.wd == 100){
                    clearInterval(timer)
                }else{
                    this.wd = this.wd * num;
                }
            },200)
        }
    }
};
</script>

<style lang="less" rel="stylesheet/less" type="text/css" scoped>
.loader2{
    position: absolute;
    z-index: 50;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    background: #d1e9fc;
    .box{
        position: absolute;
        width: 100%;
        height: 40px;
        left: 0;
        top: 50%;
        margin-top: -25px;
        .lod2{
            position: absolute;
            width: 589px;
            height: 44px;
            border-radius: 10px;
            box-sizing: border-box;
            padding: 4px;
            overflow: hidden;
            left: 0;
            right: 0;
            margin: 0 auto;
            bottom: 0;
            background: url("../images/danone/xiguan.gif");
            background-size: 100% 100%;
            background-color: #d1e9fc;
        }
    }
    .loading{
        position: absolute;
        // width: 506px;
        // height: 83px;
        width: 160px;
        height: 26px;
        right: 80px;
        top: 60px;
    }
}
.loader {
    background: rgba(0,0,0,0.6);
    bottom: 0;
    left: 0;
    overflow: hidden;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 99999;
    .loader-inner {
        bottom: 0;
        height: 60px;
        left: 0;
        margin: auto;
        position: absolute;
        right: 0;
        top: 0;
        width: 100px;
        .loader-line-wrap {
            -webkit-animation: spin 2000ms cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite;
            animation: spin 2000ms cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite;
            box-sizing: border-box;
            height: 50px;
            left: 0;
            overflow: hidden;
            position: absolute;
            top: 0;
            -webkit-transform-origin: 50% 100%;
            transform-origin: 50% 100%;
            width: 100px;
            .loader-line {
                border: 4px solid transparent;
                border-radius: 100%;
                box-sizing: border-box;
                height: 100px;
                left: 0;
                margin: 0 auto;
                position: absolute;
                right: 0;
                top: 0;
                width: 100px;
            }
        }
        .loader-line-wrap:nth-child(1) {
            -webkit-animation-delay: -50ms;
            animation-delay: -50ms;
            .loader-line {
                border-color: hsl(0, 80%, 60%);
                height: 90px;
                width: 90px;
                top: 7px;
            }
        }
        .loader-line-wrap:nth-child(2) {
            -webkit-animation-delay: -100ms;
            animation-delay: -100ms;
            .loader-line {
                border-color: hsl(60, 80%, 60%);
                height: 76px;
                width: 76px;
                top: 14px;
            }
        }
        .loader-line-wrap:nth-child(3) {
            -webkit-animation-delay: -150ms;
            animation-delay: -150ms;
            .loader-line {
                border-color: hsl(120, 80%, 60%);
                height: 62px;
                width: 62px;
                top: 21px;
            }
        }
        .loader-line-wrap:nth-child(4) {
            -webkit-animation-delay: -200ms;
            animation-delay: -200ms;
            .loader-line {
                border-color: hsl(180, 80%, 60%);
                height: 48px;
                width: 48px;
                top: 28px;
            }
        }
        .loader-line-wrap:nth-child(5) {
            -webkit-animation-delay: -250ms;
            animation-delay: -250ms;
            .loader-line {
                border-color: hsl(240, 80%, 60%);
                height: 34px;
                width: 34px;
                top: 35px;
            }
        }
    }
}

@-webkit-keyframes spin {
    0%,
    15% {
        -webkit-transform: rotate(0);
        transform: rotate(0);
    }
    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}

@keyframes spin {
    0%,
    15% {
        -webkit-transform: rotate(0);
        transform: rotate(0);
    }
    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
</style>
