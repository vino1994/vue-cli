
export default {
    config(params,ajaxOptions) {
        let o = Object.assign({
            method: "POST",
            params:params,
            url: app.config.webapiDomain + "api/wx/test",
        }, ajaxOptions);
        return app.ajax(o);
    }
}
