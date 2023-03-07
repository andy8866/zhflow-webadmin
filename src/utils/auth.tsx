import getIndexJson from "../pages";
import {getUrl, getUrlParam, httpAwait, isFrame, isProcFrame} from "./httpUtil";


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
    return localStorage.getItem("appToken");
}
export function saveAppToken(appToken:string){
    return localStorage.setItem("appToken",appToken);
}


async function validateToken(){
    const token=getUserToken();
    if(!token){
        return false;
    }

    // @ts-ignore
    let response = await httpAwait(getUrl()+'/api/security/validateToken','get',null,null,true);
    if(response.status!=0){
        localStorage.removeItem("userToken");
        localStorage.removeItem("appToken");
        return false;
    }
    return true;
}


export async function getPage(){
    console.log("origin:"+window.location.origin)
    if(isFrame()) {
        return await httpAwait(getUrl()+'/api/admin/uiPage/getUiByCode?code='+getUrlParam("code"));
    }else if(isProcFrame()){
        return await httpAwait(getUrl()+'/api/proc/ui/getContent?id='+getUrlParam("id")+'&taskId='+getUrlParam("taskId"));
    }
    else{
        const validateTokenR=await validateToken()
        if(validateTokenR){
            return getIndexJson()
        }else if (window.location.pathname=='/login'){
            return await httpAwait(getUrl()+'/api/admin/uiPage/getUiByCode?code=login');
        }else{
            window.location.href="/admin/login";
        }
    }
}