import index from "./index.json";
import {getUrl} from "../utils/httpUtil";
import {doHttp} from "../utils/http";

export default async function getIndexJson() {
    // @ts-ignore
    let json = JSON.stringify(index)

    json = json.replace(/"\$url"/g, getUrl());

    return JSON.parse(json)
}