import axios from "axios";

export default function () {
    const instance = axios.create({
        // 将被添加到`url`前面，除非`url`是绝对的。
        baseURL: '',
        //是发出请求时使用的请求方法
        method: 'post',
        //请求超时时间
   		timeout: 30000,
        //服务器返回的数据类型
        responseType: "json",
        // 表示跨域请求时是否需要使用凭证
        withCredentials: false,
        //作为请求主体发送的数据,仅适用于请求方法“PUT”，“POST”和“PATCH”
        data: {},
        //作为get请求数据参数对象
        params: {},
        //请求成功
        success: null,
        //请求失败
        error: null,
        //定义允许的http响应内容的最大大小
        maxContentLength: 200000,
        //要发送的自定义 headers,{'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/x-www-form-urlencoded'},
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    });

    //添加请求拦截器
    instance.interceptors.request.use(function (config) {
        //在发送请求之前做某事
        return config;
    }, function (error) {
        if (error.config) {
            // 直接JSON error对象在app环境中会报错，现在只能做config、xhr实例
            app.log.error("接口出错:" + JSON.stringify({ config: error.config, data: xhr }));
        }
        //请求错误时做些事
        return Promise.reject(error);
    });

    //添加响应拦截器
    instance.interceptors.response.use(function (response) {
        //对响应数据做些事
        let _response = response;
        return _response;
    }, function (error) {
        //请求错误时做些事
        return Promise.reject(error);
    });
    instance.axios = axios;
    return instance;
}

