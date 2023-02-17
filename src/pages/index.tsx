import index from "./index.json";
import {getUrl} from "../utils/httpUtil";

export default async function getIndexJson() {
    // @ts-ignore
    let json = JSON.stringify(index)

    json = json.replace(/"\$url"/g, getUrl());

    // console.log(json)
    return JSON.parse(json);
}