import React from 'react';

import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/css/v4-shims.css';

import 'amis/lib/themes/cxd.css';
import 'amis/lib/helper.css';
import 'amis/sdk/iconfont.css';

import "./app.css";

import {AlertComponent, render as renderAmis, ToastComponent} from 'amis';
import {amisEnv} from "./env";
import {getPage} from "./utils/auth";
import {loadAction} from "./actions/RootAction";
import {getUrlParam} from "./utils/httpUtil";

loadAction();

class AMISComponent extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {page: ''};
    }


    componentDidMount() {
        const page=getPage();
        page.then((data)=>{
            this.setState({
                page:data
            });
        })

        window.addEventListener("resize", this.resize); //增加
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resize); //取消
    }
    componentDidUpdate() {
        if(getUrlParam("isDialog")){
            // @ts-ignore
            const height=document.getElementById('root').clientHeight;
            console.log("clientHeight:"+height)
            window.parent.postMessage(
                {
                    type: 'amis:resize',
                    data: {
                        height: height
                    }
                },
                '*'
            );
        }
    }

    render() {
        return renderAmis(
            this.state.page,
          {
            // props...
          },
            amisEnv
        );
    }
}

class APP extends React.Component<any, any> {
  render() {
    return (
      <>
        <ToastComponent key="toast" position={'top-right'} />
        <AlertComponent key="alert" />
        <AMISComponent />
      </>
    );
  }
}

export default APP;
