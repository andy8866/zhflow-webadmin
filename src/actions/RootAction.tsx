import {registerAction} from "amis-core";
import {LoginAction} from "./LoginAction";
import {SwitchUserAction} from "./SwitchUserAction";

export function loadAction(){
    // 注册自定义动作

    console.log('loadAction')

    // @ts-ignore
    registerAction('loginAction', new LoginAction());

    // @ts-ignore
    registerAction('switchUserAction', new SwitchUserAction());
}