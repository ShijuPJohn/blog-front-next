'use client';
import React from 'react';
import Header from "@/app/header/header";
import {Provider} from "react-redux";
import store from "@/app/store";
import {closeSnackbar, SnackbarProvider} from "notistack";

const ComponentsWrapper = ({children}) => {
    return (
        <Provider store={store}>
            <Header/>
            <SnackbarProvider autoHideDuration={4000}
                action={(snackbarId) => (
                    <div onClick={() => closeSnackbar(snackbarId)}>
                    </div>
                )}>
                {children}
            </SnackbarProvider>
        </Provider>
    );
};

export default ComponentsWrapper;