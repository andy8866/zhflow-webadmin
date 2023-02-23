import getIndexJson from "../pages";
import {getUrl, httpAwait} from "./httpUtil";

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
    let response = await httpAwait(getUrl()+'/api/security/validateToken','get',null,null,true);
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
        const loingPage=await httpAwait(getUrl()+'/api/admin/uiPage/getUiByCode?code=login');
        return loingPage
    }
}