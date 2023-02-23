import index from "./index.json";
import {getUrl, httpAwait} from "../utils/httpUtil";

export default async function getIndexJson() {
    // @ts-ignore
    let json = JSON.stringify(index)

    let ui=await httpAwait(getUrl() + "/api/admin/uiPage/getUiByCode?code=header")
    json = json.replace(/"\$header"/g, JSON.stringify(ui));

    json = json.replace(/"\$url"/g, getUrl());

    return JSON.parse(json)
}