import {ListenerAction, ListenerContext, RendererAction, RendererEvent} from 'amis-core';
import {removeToken, saveAppToken, saveUserToken} from "../utils/auth";
import {getBaseUrl, getUrl, httpAwait, httpCallBack} from "../utils/httpUtil";
import {toast} from "amis-ui";

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

            httpCallBack(getUrl() + "/api/security/token/getAppToken",{},"get",{},(responseData:any)=>{
                if(responseData.status!=0 && responseData.status!=2){
                    removeToken();
                    toast.error(responseData.msg)
                    return ;
                }
                saveAppToken(responseData.data);

                window.location.href= getBaseUrl()+"/proc/agendaTask?code=frameProcAgendaTask"
            });

        });
    }
}
