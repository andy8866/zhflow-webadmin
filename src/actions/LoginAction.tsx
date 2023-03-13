import {ListenerAction, ListenerContext, RendererAction, RendererEvent} from 'amis-core';
import {removeToken, saveAppToken, saveUserToken} from "../utils/auth";
import {getBaseUrl, getUrl, httpAwait} from "../utils/httpUtil";
import {toast} from "amis-ui";

// 动作定义
interface ILoginAction extends ListenerAction {
    actionType: 'loginAction';
    args: {
        data: string
    };
}

/**
 * 我的动作实现
 */
export class LoginAction implements RendererAction {
    // @ts-ignore
    async run(action: ILoginAction, renderer: ListenerContext, event: RendererEvent<any>) {
        const props = renderer.props;
        const {data} = action.args;

        console.log('LoginAction')
        console.log(data)

        const token = data
        saveUserToken(token)

        const responseData = await httpAwait(getUrl() + "/api/security/token/getAppToken");
        if(responseData.status!=0 && responseData.status!=2){
            removeToken();
            toast.error(responseData.msg)
            return ;
        }
        saveAppToken(responseData.data);


        window.location.href = getBaseUrl()+"/proc/agendaTask?code=frameProcAgendaTask";
    }
}
