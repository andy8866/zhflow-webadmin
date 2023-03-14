import {ListenerAction, ListenerContext, RendererAction, RendererEvent} from 'amis-core';
import {saveToken} from "../utils/auth";
import {switchAppToken} from "../utils/appUtil";

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
        saveToken(token)

        await switchAppToken("");

        window.location.href = "/proc/agendaTask?code=frameProcAgendaTask";
    }
}
