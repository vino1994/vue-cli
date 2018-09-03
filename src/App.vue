<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
import "./css/weui.min.css"; //加载公共样式
import "./css/app.less"; // 加载公共样式

export default {
    name: "app"
};
</script>
