import index from "./index.json";
import {getUrl} from "../utils/httpUtil";
import {doHttp} from "../utils/http";

export default async function getIndexJson() {
    // @ts-ignore
    let json = JSON.stringify(index)

    let ui=await doHttp(getUrl() + "/api/admin/uiPage/getUiByCode?code=header", "get", null, null)
    json = json.replace(/"\$header"/g, JSON.stringify(ui));

    json = json.replace(/"\$url"/g, getUrl());

    return JSON.parse(json)
}