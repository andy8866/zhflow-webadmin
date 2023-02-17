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
        // @ts-ignore
        $editorUrl:import.meta.env.VITE_EDITOR_URL,
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
            config.headers['token'] = token;
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

            responseObj.style=null;
            return responseObj;
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
};