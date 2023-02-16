import index from "./index.json";
import {getUrl} from "../utils/httpUtil";
import {doHttp} from "../utils/http";

export default async function getIndexJson() {
    // @ts-ignore
    let json = JSON.stringify(index)
    const page = await doHttp(getUrl() + '/api/admin/uiPage/getUiByCode?code=asideBefore', 'GET', null, null);
    json = json.replace(/"\$asideBefore"/g,JSON.stringify(page));

    json = json.replace(/"\$url"/g, getUrl());

    // console.log(json)
    return JSON.parse(json);
}