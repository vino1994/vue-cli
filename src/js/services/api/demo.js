export default {
    users(params={},ajaxOptions) {
        let o = Object.assign({
            method: "GET",
            params:params,
            url: app.config.webapiDomain + "users",
        }, ajaxOptions);
        return app.ajax(o);
    }
}
