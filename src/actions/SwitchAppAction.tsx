import {ListenerAction, ListenerContext, RendererAction, RendererEvent} from 'amis-core';
import {saveToken} from "../utils/auth";
import {getBaseUrl, getUrl, httpCallBack} from "../utils/httpUtil";

// 动作定义
interface ISwitchAppAction extends ListenerAction {
    actionType: 'switchAppAction';
    args: {
        data: string
    };
}

/**
 * 我的动作实现
 */
export class SwitchAppAction implements RendererAction {
    // @ts-ignore
    run(action: ISwitchAppAction, renderer: ListenerContext, event: RendererEvent<any>) {
        const props = renderer.props;
        const {data} = action.args;

        console.log('SwitchAppAction')
        console.log(data)

        // @ts-ignore
        const id=data.id;

        httpCallBack(getUrl() + "/api/app/switchApp?id="+id, {},"get",{},(v:any)=>{
            const token=v.data
            saveToken(token)

            window.location.href= getBaseUrl()+"/proc/agendaTask?code=frameProcAgendaTask"
        });
    }
}
