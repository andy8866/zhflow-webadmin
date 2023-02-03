import app from "./app.json";
import welcome from "./welcome.json";
import suggest from "./suggest.json";
import appManage from "./appManage.json";
import userList from "./userList.json";

export default function getAppJson(){
    // @ts-ignore
    let json= JSON.stringify(app)
    json=json.replace(/"\$welcomePage"/g,JSON.stringify(welcome));
    json=json.replace(/"\$suggestPage"/g,JSON.stringify(suggest));
    json=json.replace(/"\$appManage"/g,JSON.stringify(appManage));
    json=json.replace(/"\$userList"/g,JSON.stringify(userList));
    // console.log(json)
    return JSON.parse(json);
}