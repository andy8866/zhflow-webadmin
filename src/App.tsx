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
    }

    componentDidUpdate() {
        // if(getUrlParam("isDialog")){

        let lastHeight=0;
        setInterval(()=>{
            // @ts-ignore
            const height=document.getElementById('root').clientHeight;
            if(Math.abs(height-lastHeight)>10){
                lastHeight=height;
                window.parent.postMessage(
                    {
                        type: 'heightResize',
                        data: {
                            height: height
                        }
                    },
                    '*'
                );
            }

        },500);

        // }
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
