import appJson from "./app.json";
import welcomeJson from "./welcome.json";
import suggestJson from "./suggest.json";
import appManageJson from "./appManage.json";

export default function getAppJson(){
    // @ts-ignore
    let json= JSON.stringify(appJson)
    json=json.replace(/"\$welcomePage"/g,JSON.stringify(welcomeJson));
    json=json.replace(/"\$suggestPage"/g,JSON.stringify(suggestJson));
    json=json.replace(/"\$appManage"/g,JSON.stringify(appManageJson));
    // console.log(json)
    return JSON.parse(json);
}