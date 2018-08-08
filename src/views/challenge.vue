<template>
    <div class="content">
        <Loading v-show="showLoading"></Loading>

    </div>
</template>

<script>
import Loading from "../components/loading";
import wxSdk from "../js/wx-sdk";
export default {
    data() {
        return {
            showLoading: false, //是否显示loading动画
            type:''
        };
    },
    components: {
        Loading
    },
    mounted() {
        this.type = this.$route.query.type || '';
        console.info(this.type)
    },
    methods: {

    }
};
</script>

<style lang="less" scoped>

</style>
