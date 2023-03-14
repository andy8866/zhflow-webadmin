import getIndexJson from "../pages";
import {getBaseUrl, getUrl, getUrlParam, httpAwait, isFrame, isProcFrame} from "./httpUtil";
import app from "../App";

export function getToken(){
    const token=getUrlParam("token")

    if(token) return token;

    return localStorage.getItem("token");
}
export function saveToken(token:string){
    return localStorage.setItem("token",token);
}

export function removeToken(){
    localStorage.removeItem("token");
}

async function validateToken(){
    const token=getToken();
    if(!token){
        return false;
    }

    // @ts-ignore
    let response = await httpAwait(getUrl()+'/api/security/token/validateToken','get',null,null,true);
    if(response.status!=0){
        removeToken();
        return false;
    }
    return true;
}


export async function getPage(){
    console.log("location:"+window.location.toString())
    if(isFrame()) {
        return await httpAwait(getUrl()+'/api/admin/uiPage/getUiByCode?code='+getUrlParam("code"));
    }else if(isProcFrame()){
        return await httpAwait(getUrl()+'/api/proc/ui/getContent?id='+getUrlParam("id")+'&taskId='+getUrlParam("taskId"));
    }
    else{
        const validateTokenR=await validateToken()
        if(validateTokenR){
            return getIndexJson()
        }else if (window.location.pathname==getBaseUrl()+'/login'){
            return await httpAwait(getUrl()+'/api/admin/uiPage/getUiByCode?code=login');
        }else{
            window.location.href=getBaseUrl()+"/login";
        }
    }
}