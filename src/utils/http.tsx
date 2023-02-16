import axios from "axios";
import {getToken} from "./auth";
import {toast} from 'amis-ui';

export async function doHttp(url:string,method:string,params:any,headers:any,check:any=false){
    if(headers==null) {
        headers={}
    }

    additionHeaders(headers)

    const config:any={
        headers
    }

    console.log(config)

    if(method=='GET'){
        config['params']=params
    }
    if(method=='POST'){
        config['data']=params
    }

    try{
        const response = await axios.get(url, config)
        console.log(response)

        if(check && response.data.status!=0 && response.data.status!=2){
            toast.error(response.data.msg);
        }

        return response.data
    }catch (err){
        console.log(err)
        // @ts-ignore
        toast.error(err)
    }
}

function additionHeaders(headers:any){
    const token=getToken();
    if(token) {
        headers['token']=token;
    }
}