// amis 环境配置
import axios from "axios";
import {getToken} from "./utils/auth";

// @ts-ignore
console.log(import.meta.env)

export const amisEnv = {
    replaceText:{
        // @ts-ignore
        $url:import.meta.env.VITE_URL,
        // @ts-ignore
        $proccessDesignerUrl:import.meta.env.VITE_PROCESS_DESIGNER_URL,
        $token:getToken()
    },
    replaceTextKeys: ['url'],
    // 下面三个接口必须实现
    fetcher: ({
                  url, // 接口地址
                  method, // 请求方法 get、post、put、delete
                  data, // 请求数据
                  responseType,
                  config, // 其他配置
                  headers, // 请求头
              }: any) => {

        console.log("load ajax config")

        config = config || {};

        console.log(config)

        // @ts-ignore
        config.baseURL=import.meta.env.VITE_URL;

        config.withCredentials = true;
        responseType && (config.responseType = responseType);

        if (config.cancelExecutor) {
            config.cancelToken = new (axios as any).CancelToken(
                config.cancelExecutor
            );
        }

        config.headers = headers || {};

        const token=getToken()
        if(token){
            config.headers['Authorization'] = 'Bearer '+token;
        }

        config.transformResponse=[function (responseJson:any) {
            console.log('transformResponse')
            console.log(responseJson)
            const responseObj=JSON.parse(responseJson)
            if(responseObj.status==2){
                setTimeout(()=>{
                    location.reload()
                },2500)
            }

            return responseObj
        }];

        if (method !== 'post' && method !== 'put' && method !== 'patch') {
            if (data) {
                config.params = data;
            }
            return (axios as any)[method](url, config);
        } else if (data && data instanceof FormData) {
            config.headers = config.headers || {};
            config.headers['Content-Type'] = 'multipart/form-data';
        } else if (
            data &&
            typeof data !== 'string' &&
            !(data instanceof Blob) &&
            !(data instanceof ArrayBuffer)
        ) {
            data = JSON.stringify(data);
            config.headers = config.headers || {};
            config.headers['Content-Type'] = 'application/json';
        }

        return (axios as any)[method](url, data, config);
    }

    // 后面这些接口可以不用实现

    // 默认是地址跳转
    // jumpTo: (
    //   location: string /*目标地址*/,
    //   action: any /* action对象*/
    // ) => {
    //   // 用来实现页面跳转, actionType:link、url 都会进来。
    // },

    // updateLocation: (
    //   location: string /*目标地址*/,
    //   replace: boolean /*是replace，还是push？*/
    // ) => {
    //   // 地址替换，跟 jumpTo 类似
    // },

    // isCurrentUrl: (
    //   url: string /*url地址*/,
    // ) => {
    //   // 用来判断是否目标地址当前地址
    // },

    // notify: (
    //   type: 'error' | 'success' /**/,
    //   msg: string /*提示内容*/
    // ) => {
    //   toast[type]
    //     ? toast[type](msg, type === 'error' ? '系统错误' : '系统消息')
    //     : console.warn('[Notify]', type, msg);
    // },
    // alert,
    // confirm,
};