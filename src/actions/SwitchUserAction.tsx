import {ListenerAction, ListenerContext, RendererAction, RendererEvent} from 'amis-core';
import {saveToken} from "../utils/auth";
import {doHttp, getUrl} from "../utils/httpUtil";

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
        doHttp(getUrl() + "/api/admin/user/switchCurrentUser?id="+data.id, {},"get",(v:any)=>{
            console.log(data)
            const token=v.data
            saveToken(token)
            window.location.reload();
        },null);
    }
}
