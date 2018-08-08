<template>
    <div class="content">
        <Loading v-show="showLoading"></Loading>
        <div class="challenge-content" :style="{background:item.bg}">
            <img class="challenge" :style="{width:item.wd}" :src="item.src" alt="">
            <div class="challenge-btn">
                <img src="../images/danone/challenge_btn.png" alt="">
            </div>
        </div>
    </div>
</template>

<script>
import Loading from "../components/loading";
import wxSdk from "../js/wx-sdk";
export default {
    data() {
        return {
            showLoading: false, //是否显示loading动画
            type: "",
            item: {},
            yogurt: {
                bg: "#fffade",
                src: require("../images/danone/challenge_yogurt.png")
            },
            tableware: {
                bg: "#eae1d3",
                src: require("../images/danone/challenge_tableware.png"),
                wd:'80%'
            },
            bag: {
                bg: "#d5eff5",
                src: require("../images/danone/challenge_bag.png")
            },
            smile: {
                bg: "#ffffff",
                src: require("../images/danone/challenge_smile.png"),
                wd:'80%'
            },
            fruit: {
                bg: "#d5e4f5",
                src: require("../images/danone/challenge_fruit.png"),
                wd:'76%'
            },
            use: {
                bg: "#fff1ed",
                src: require("../images/danone/challenge_use.png"),
                wd:'72%'
            }
        };
    },
    components: {
        Loading
    },
    mounted() {
        this.type = this.$route.query.type || "";
        this.init();
    },
    methods: {
        init() {
            switch (this.type) {
                case "yogurt":
                    this.item = this.yogurt;
                    break;
                case "tableware":
                    this.item = this.tableware;
                    break;
                case "bag":
                    this.item = this.bag;
                    break;
                case "smile":
                    this.item = this.smile;
                    break;
                case "fruit":
                    this.item = this.fruit;
                    break;
                case "use":
                    this.item = this.use;
                    break;
            }
            console.info(this.item);
        }
    }
};
</script>

<style lang="less" scoped>
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
</style>
