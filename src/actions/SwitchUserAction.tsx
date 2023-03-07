import {ListenerAction, ListenerContext, RendererAction, RendererEvent} from 'amis-core';
import {saveUserToken} from "../utils/auth";
import {getBaseUrl, getUrl, httpCallBack} from "../utils/httpUtil";

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
        const id=data.id;

        httpCallBack(getUrl() + "/api/user/switchCurrentUser?id="+id, {},"get",{},(v:any)=>{
            const token=v.data
            saveUserToken(token)
            window.location.href= getBaseUrl()+"/proc/agendaTask"
        });
    }
}
