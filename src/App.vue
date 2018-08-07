<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
export default {
    name: "app",
    mounted() {
        const script = document.createElement("script");
        script.src = "https://s22.cnzz.com/z_stat.php?id=1274371856&web_id=1274371856"
        script.language = "JavaScript";
        document.body.appendChild(script);
    },
    watch: {
        $route() {
            if (window._czc) {
                let location = window.location;
                let contentUrl = location.pathname + location.hash;
                let refererUrl = "/";
                window._czc.push(["_trackPageview", contentUrl, refererUrl]);
            }
        }
    }
};
</script>

<style lang='less'>
@import "./css/app.less"; // 加载公共样式
</style>
