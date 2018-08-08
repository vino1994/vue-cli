<template>
    <div class="content">
        <Loading v-show="showLoading"></Loading>
        <div class="explore-content">
            <img src="../images/danone/03.png" alt="">
            <div class="ul">
                <div class="li" v-for="item in items" :key="item.id" @click="challenge(item.type)">
                    <img :src="item.src" alt="">
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
            ]
        };
    },
    components: {
        Loading
    },
    mounted() {},
    methods: {
        challenge(type = "") {
            this.$router.push({ path: "challenge", query: { type: type } });
        }
    }
};
</script>

<style lang="less" scoped>
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
</style>
