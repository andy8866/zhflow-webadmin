import index from "./index.json";
import welcome from "./welcome.json";
import asideBefore from "./asideBefore.json";
import suggest from "./suggest.json";
import appManage from "./appManage.json";
import userList from "./userList.json";
import flowModel from "./flowModel.json";

export default function getIndexJson(){
    // @ts-ignore
    let json= JSON.stringify(index)
    json=json.replace(/"\$asideBefore"/g,JSON.stringify(asideBefore));

    json=json.replace(/"\$welcome"/g,JSON.stringify(welcome));
    json=json.replace(/"\$suggest"/g,JSON.stringify(suggest));
    json=json.replace(/"\$appManage"/g,JSON.stringify(appManage));
    json=json.replace(/"\$userList"/g,JSON.stringify(userList));
    json=json.replace(/"\$flowModel"/g,JSON.stringify(flowModel));

    // console.log(json)
    return JSON.parse(json);
}