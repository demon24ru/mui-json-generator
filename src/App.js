import React from 'react';
import { observable, action, autorun } from 'mobx';
import { observer, inject, Provider } from 'mobx-react';
import Container from '@material-ui/core/Container';
import * as Mui from '@material-ui/core';
import shema from './shema';


function generator(sh) {
    if (typeof sh == 'string') return sh;
    const el = [];
    for (const key in sh) {
        const {component, state: {child, ...other}} = sh[key];
        el.push(React.createElement(
            inject(_ => {
                const {child, ...oth} = _.store.box1.state.child.box2.state.child.div1.state.child.TextField1.state;
                //const {child, ...ot} = window.$z.box1.state.child.box2.state.child.div1.state.child.TextField1.state;
                console.log({...oth});
                return({...oth});
            })(observer(Mui[component])),
            {key, ...other},
            child && generator(child)
        ));
    }
    return(el.length === 0 ? null : el);
}

export default function App() {
    window.$z = observable(shema);
    //observable(window.$z);
  return (
    <Provider store={window.$z} >
        <Container maxWidth="sm">
            { generator(window.$z) }
        </Container>
    </Provider>
  );
}
