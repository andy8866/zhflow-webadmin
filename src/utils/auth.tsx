import getIndexJson from "../pages";
import {getBaseUrl, getUrl, getUrlParam, httpAwait, isFrame, isProcFrame} from "./httpUtil";
import app from "../App";


export function getToken(){
    if(isFrame() || isProcFrame()){
        return getAppToken();
    }

    return getUserToken();
}

export function getUserToken(){
    return localStorage.getItem("userToken");
}
export function saveUserToken(token:string){
    return localStorage.setItem("userToken",token);
}

export function getAppToken(){
    const appToken=getUrlParam("token")
    console.log("appToken"+appToken)
    if(appToken) return appToken;

    return localStorage.getItem("appToken");
}
export function saveAppToken(appToken:string){
    return localStorage.setItem("appToken",appToken);
}

export function removeToken(){
    localStorage.removeItem("userToken");
    localStorage.removeItem("appToken");
}

async function validateToken(){
    const token=getUserToken();
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