import {doHttp} from "./http";
import getIndexJson from "../pages";
import {getUrl} from "./httpUtil";

export function getToken(){
    return localStorage.getItem("token");
}
export function saveToken(token:string){
    return localStorage.setItem("token",token);
}

async function validateToken(){
    const token=getToken();
    if(!token){
        return false;
    }

    // @ts-ignore
    let response = await doHttp(import.meta.env.VITE_URL+'/api/admin/index/validateToken','GET',null,null,true);
    if(response.status!=0){
        localStorage.removeItem("token");
        return false;
    }
    return true;
}

export async function getPage(){
    const validateTokenR=await validateToken()
    if(validateTokenR){
        return getIndexJson()
    }else{
        const loingPage=await doHttp(getUrl()+'/api/admin/uiPage/getUiByCode?code=login','GET',null,null);
        return loingPage
    }
}