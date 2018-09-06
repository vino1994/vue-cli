
export default {
    detect(data, ajaxOptions) {
        let o = Object.assign({
            method: "POST",
            data: data,
            url: app.config.webapiDomain + "api/aip/detect",
        }, ajaxOptions);
        return app.ajax(o);
    }
}
