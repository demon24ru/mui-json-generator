import React from 'react';
import { observable, action, autorun } from 'mobx';
import { observer, inject, Provider } from 'mobx-react';
import Container from '@material-ui/core/Container';
import * as Mui from '@material-ui/core';
import shema from './shema';

const inpts = ["Checkbox", "TextField", "RadioGroup", "Radio", "Select", "NativeSelect", "Slider"];

function generator(sh) {
    if (typeof sh == 'string') return sh;
    const el = [];
    for (const key in sh) {
        const {component} = sh[key];
        const prps = sh[key].state;
        if (inpts.indexOf( component ) !== -1) {
            prps.value === undefined && (prps.value = "");
            component == "Checkbox" && (prps.checked === undefined && (prps.checked = false));
            prps.onChange === undefined && (prps.onChange = (e) => {
                if (component == "Checkbox") {
                    prps.checked = e.target.checked;
                } else prps.value = e.target.value;
            });
        }
        const {child, ...other} = prps;
        el.push(React.createElement(
            inject(() => {
                const {child, ...other} = prps;
                return({...other});
            })(observer(Mui[component])),
            {key, ...other},
            child && generator(child)
        ));
    }
    return(el.length === 0 ? null : el);
}

export default function App() {
    window.$z = observable(shema);
  return (
    <Provider >
        <Container maxWidth="sm">
            { generator(window.$z) }
        </Container>
    </Provider>
  );
}
