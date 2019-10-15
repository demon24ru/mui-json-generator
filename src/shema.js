
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
