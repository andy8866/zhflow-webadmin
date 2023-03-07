import {ListenerAction, ListenerContext, RendererAction, RendererEvent} from 'amis-core';
import {saveAppToken, saveUserToken} from "../utils/auth";
import {getUrl, httpAwait} from "../utils/httpUtil";

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

        const appTokenResult = await httpAwait(getUrl() + "/api/admin/third/getAppToken");
        saveAppToken(appTokenResult.data);

        window.location.href = "/admin/proc/agendaTask";
    }
}
