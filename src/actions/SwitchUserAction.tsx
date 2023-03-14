import {ListenerAction, ListenerContext, RendererAction, RendererEvent} from 'amis-core';
import {saveToken} from "../utils/auth";
import {getUrl, httpCallBack} from "../utils/httpUtil";

// 动作定义
interface ISwitchUserAction extends ListenerAction {
    actionType: 'switchUserAction';
    args: {
        data: string
    };
}

/**
 * 我的动作实现
 */
export class SwitchUserAction implements RendererAction {
    // @ts-ignore
    run(action: ISwitchUserAction, renderer: ListenerContext, event: RendererEvent<any>) {
        const props = renderer.props;
        const {data} = action.args;

        console.log('switchUserAction')
        console.log(data)

        // @ts-ignore
        const id=data.value;

        httpCallBack(getUrl() + "/api/user/switchUser?id="+id, {},"get",{},(v:any)=>{
            const token=v.data
            saveToken(token)

            window.location.href= "/proc/agendaTask?code=frameProcAgendaTask"
        });
    }
}
