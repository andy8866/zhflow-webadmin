import index from "./index.json";
import {getBaseUrl, getUrl, httpAwait} from "../utils/httpUtil";

export default async function getIndexJson() {
    // @ts-ignore
    let json = JSON.stringify(index)

    let ui=await httpAwait(getUrl() + "/api/admin/uiPage/getUiByCode?code=header")
    json = json.replace(/"\$header"/g, JSON.stringify(ui));

    json = json.replaceAll(/\$url/g, getUrl());

    json = json.replaceAll(/\$baseUrl/g, getBaseUrl());

    console.log(json)
    return JSON.parse(json)
}