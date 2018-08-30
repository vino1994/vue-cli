<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "app"
};
</script>

<style lang='less'>
@import "./css/app.less"; // 加载公共样式
</style>
