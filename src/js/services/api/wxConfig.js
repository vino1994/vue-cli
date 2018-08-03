
export default {
    config(params,ajaxOptions) {
        let o = Object.assign({
            method: "GET",
            params:params,
            url: app.config.webapiDomain + "config",
        }, ajaxOptions);
        return app.ajax(o);
    }
}