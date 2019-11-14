import axios from 'axios'
import qs from 'qs'

function option(options) {
    const {
        method = 'get',
        data = {},
        url,
        access_token
    } = options;
    const req = {};
    req.baseURL = 'http://localhost:1337/api/';
    req.timeout = 10000;
    req.headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    req.method = method;
    //req.data = qs.stringify(data);
    req.url = url + '?' + qs.stringify(data);
    req.headers['Authorization'] =  'Bearer ' + access_token;
    return req;
}

function request(options) {
    return axios(option(options))
        .then((response) => console.log(response));
}

export default {

    box1: {
        component: "Box",
        state: {
            my: 4,
            child: {
                typography1: {
                    component: "Typography",
                    state: {
                        variant: "h4",
                        component: "h1",
                        gutterBottom: true,
                        child: "Create React App v4-beta example"
                    }
                },
                box2:{
                    component: "Box",
                    state: {
                        my: 4,
                        child: {
                            div1: {
                              component: "Box",
                              state: {
                                  my: 4,
                                  child: {
                                      TextField1: {
                                          component: "TextField",
                                          state: {
                                              label: "Отсель",
                                              margin: "dense"
                                          }
                                      }
                                  }
                              }
                            },
                            div2: {
                                component: "Box",
                                state: {
                                    my: 4,
                                    child: {
                                        TextField2: {
                                            component: "TextField",
                                            state: {
                                                label: "Сюда",
                                                margin: "dense"
                                            }
                                        }
                                    }
                                }
                            },
                            Button1: {
                                component: "Button",
                                state: {
                                    variant: "contained",
                                    onClick: () => {
                                        window.$z.box1.state.child.box2.state.child.div1.state.child.TextField1.state.value = "454545";
                                        console.log(window.$z.box1.state.child.box2.state.child.div1.state.child.TextField1.state.value);
                                        request({
                                            data: {
                                                include: [{
                                                    model: 'company',
                                                    include: [
                                                        {
                                                            model: 'companyEntity',
                                                            include: [{
                                                                model: 'clientCode',
                                                                include: [{
                                                                    model: 'client',
                                                                }]
                                                            }]
                                                        },
                                                        {
                                                            model: 'companyCards',
                                                            // where: {
                                                            //     cardId: '2000326'
                                                            // }
                                                            offset: 2,
                                                            limit: 2
                                                        },
                                                        {
                                                            model: 'companyProgramms'
                                                        }
                                                    ]
                                                }]

                                            },
                                            url: 'user',
                                            access_token: '15fedb82be8065238bb9662f48024c70dbfa326d93e90d4b79918fe6a4a71740'
                                        });
                                    },
                                    style: {
                                      backgroundColor : "#ff2222"
                                    },
                                    child: "Push"
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
