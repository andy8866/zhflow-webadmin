import axios from 'axios';
import {getToken} from "./auth";
import {toast} from "amis-ui";

export function getUrl(){
  let url=window.location.origin

  if(url.indexOf("localhost")!=-1){
    return "http://localhost:8081";
  }

  return url;
}

export function getUrlParam(paraName:any) {
  let url = window.location.toString();
  let arrObj = url.split("?");

  if (arrObj.length > 1) {
    let arrPara = arrObj[1].split("&");
    let arr;

    for (let i = 0; i < arrPara.length; i++) {
      arr = arrPara[i].split("=");

      if (arr != null && arr[0] == paraName) {
        return arr[1];
      }
    }
    return "";
  }
  else {
    return "";
  }
}

export function httpCallBack(url:any,data:any={},method:any="get",headers:any={},successCallBack:any,failCallBack:any=null){

  headers=additionHeaders(headers);

  axios({
    url,
    method,
    headers,
    data
  }).then(res=> {
    console.log(res);
    let result=res.data
    if(result.status!=0){
      alert(result.msg)

      if(failCallBack){
        failCallBack(result);
      }
      return ;
    }

    if(successCallBack){
      successCallBack(result);
    }
  }).catch(err=> {
    console.log(err);
    alert(err)

    if(failCallBack){
      failCallBack(err);
    }
  });
}

function additionHeaders(headers:any){
  let token=getUrlParam("token")
  if(!token) {
    // @ts-ignore
    token=getToken()
  }

  return {
    ...headers,
    "token": token,
    "content-type": "application/json"
  }
}

export async function httpAwait(url:string,method:string="get",params:any={},headers:any={},check:any=false){
  if(headers==null) {
    headers={}
  }

  headers=additionHeaders(headers)

  const config:any={
    headers
  }

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