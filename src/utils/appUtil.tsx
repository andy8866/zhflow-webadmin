import {getUrl, httpAwait} from "./httpUtil";
import {removeToken, saveToken} from "./auth";
import {toast} from "amis-ui";

export async function switchAppToken(appId:string) {
    const responseData = await httpAwait(getUrl() + "/api/app/switchApp?appId="+appId);
    if (responseData.status != 0 && responseData.status != 2) {
        removeToken();
        toast.error(responseData.msg)
        return;
    }
    saveToken(responseData.data);
}