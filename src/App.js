import React from 'react';
import { observable, action, autorun } from 'mobx';
import { observer, inject, Provider } from 'mobx-react';
import Container from '@material-ui/core/Container';
import * as Mui from '@material-ui/core';
import shema from './shema';

class A extends React.Component {
    render() {
        return React.createElement('div',
            null,
            `Привет, ${this.props.toWhat}`);
    }
}

// class MobxA {
//     @observable store;
//
//     constructor(dat) {
//         this.store = {...dat};
//         this.store.disabled = false;
//     }
//     @action('toggle in store')
//     toggleThis() {
//         this.store.disabled = !this.store.disabled;
//     }
// }


function generator(sh) {
    if (typeof sh == 'string') return sh;
    const el = [];
    const store = {};
    for (const key in sh) {
        const {component, state: {child, ...other}} = sh[key];
        const fn = child && generator(child);
        store[key] = { ...other };
        child && (store[key].store = fn[1]);
        el.push(React.createElement(
            // inject(store => {
            //     return null;
            // }
            // )(
                observer(Mui[component])
            //)
            ,
            {key, ...other},
            child && fn[0]
        ));
    }

    return[(el.length === 0 ? null : el), store];
}

export default function App() {
    const rend = generator(shema);
    window.$z = observable(rend[1]);
  return (
    <Provider store={window.$z} >
        <Container maxWidth="sm">
            { rend[0] }
        </Container>
    </Provider>
  );
}
