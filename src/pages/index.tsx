import index from "./index.json";
import welcome from "./welcome.json";
import asideBefore from "./asideBefore.json";
import suggest from "./suggest.json";
import appManage from "./appManage.json";
import userList from "./userList.json";
import processModel from "./processModel.json";
import processDeployment from "./processDeployment.json";
import processDefinition from "./processDefinition.json";
import processInstance from "./processInstance.json";
import processAgendaTask from "./processAgendaTask.json";
import processClaimTask from "./processClaimTask.json";
import processTaskExecute from "./processTaskExecute.json";
import processComplete from "./processComplete.json";
import processTemplate from "./processTemplate.json";
import dict from "./dict.json";

export default function getIndexJson(){
    // @ts-ignore
    let json= JSON.stringify(index)
    json=json.replace(/"\$asideBefore"/g,JSON.stringify(asideBefore));

    json=json.replace(/"\$welcome"/g,JSON.stringify(welcome));
    json=json.replace(/"\$suggest"/g,JSON.stringify(suggest));
    json=json.replace(/"\$appManage"/g,JSON.stringify(appManage));
    json=json.replace(/"\$userList"/g,JSON.stringify(userList));
    json=json.replace(/"\$processModel"/g,JSON.stringify(processModel));
    json=json.replace(/"\$processDeployment"/g,JSON.stringify(processDeployment));
    json=json.replace(/"\$processDefinition"/g,JSON.stringify(processDefinition));
    json=json.replace(/"\$processInstance"/g,JSON.stringify(processInstance));
    json=json.replace(/"\$processAgendaTask"/g,JSON.stringify(processAgendaTask));
    json=json.replace(/"\$processClaimTask"/g,JSON.stringify(processClaimTask));
    json=json.replace(/"\$processTaskExecute"/g,JSON.stringify(processTaskExecute));
    json=json.replace(/"\$processComplete"/g,JSON.stringify(processComplete));
    json=json.replace(/"\$processTemplate"/g,JSON.stringify(processTemplate));
    json=json.replace(/"\$dict"/g,JSON.stringify(dict));

    // console.log(json)
    return JSON.parse(json);
}