'use client';
import React from 'react';
import Header from "@/app/header/header";
import {Provider} from "react-redux";
import store from "@/app/store";

const ComponentsWrapper = ({children}) => {
    return (
        <Provider store={store}>
            <Header/>
            {children}
        </Provider>
    );
};

export default ComponentsWrapper;