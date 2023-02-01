import appJson from "./app.json";
import welcomeJson from "./welcome.json";

export default function getAppJson(){
    // @ts-ignore
    const json= JSON.stringify(appJson).replace("\"$welcomePage\"",JSON.stringify(welcomeJson));
    console.log(json)
    return JSON.parse(json);
}