import {doHttp} from "./http";

import appJson from '../pages/app.json';
import loginJson from '../pages/login.json';

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
    let response = await doHttp(import.meta.env.VITE_URL+'/api/admin/index/validateToken','GET',null,null);
    if(response.status!=0){
        localStorage.removeItem("token");
        return false;
    }
    return true;
}

export async function getPage(){
    const validateTokenR=await validateToken()
    if(validateTokenR){
        return appJson
    }else{
        return loginJson
    }
}