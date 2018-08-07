<template>
    <div>
        <Loading v-show="showLoading"></Loading>
        <div class="content">
            <img src="../images/danone/03.png" alt="">
            <div class="ul">
                <div class="li">
                    <img src="../images/danone/03yogurt.png" alt="">
                </div>
                <div class="li">
                    <img src="../images/danone/03tableware.png" alt="">
                </div>
                <div class="li">
                    <img src="../images/danone/03bag.png" alt="">
                </div>
                <div class="li">
                    <img src="../images/danone/03smile.png" alt="">
                </div>
                <div class="li">
                    <img src="../images/danone/03fruit.png" alt="">
                </div>
                <div class="li">
                    <img src="../images/danone/03twouse.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Loading from "../components/loading";
import lrz from "lrz";
import wxSdk from "../js/wx-sdk";
export default {
    data() {
        return {
            showLoading: false, //是否显示loading动画
        };
    },
    components: {
        Loading
    },
    mounted() {

    },
    methods: {

    }
};
</script>

<style lang="less" scoped>
.content{
    width: 100%;
    height: 100vh;
    background-color: #daf0fe;
    .ul{
        display: flex;
        flex-direction: row;
        align-content: center;
        align-items: center;
        justify-content: center;
        flex-wrap:wrap;
        .li{
            width: 50%;
            margin-bottom: 10px;
            img{
                width: 58%;
                padding: 5px;
            }
        }
        .li:nth-child(2n){
            text-align: left;
            img{
                margin-left: 20px;
            }
        }
        .li:nth-child(2n-1){
            text-align: right;
            img{
                margin-right: 20px;
            }
        }
        .li:nth-child(5),.li:nth-child(6){
            margin-bottom: 0;
        }
    }
}
</style>
