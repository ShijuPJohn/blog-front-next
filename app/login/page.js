'use client';
import React, {useEffect} from 'react';
import styles from './page.module.css';
import {Provider, useDispatch, useSelector} from "react-redux";
import {login} from "../actions/userActions";
import store from "@/app/store";
// import {useRouter} from "next/router";

const Page = () => {
    const userLogin = useSelector(state => state.user)
    const {error, loading, userInfo} = userLogin
    // const router = useRouter();
    const dispatch = useDispatch()
    const handleSubmit = async (event) => {
        event.preventDefault()
        dispatch(login(event.target.email.value, event.target.password.value))
    }
    useEffect(() => {
        if ('userInfo', userInfo) {
            console.log('userInfo', userInfo)
            // router.push('/')
        }
        console.log('login :', login(email, password))
    }, [userLogin])
    return (
        <Provider store={store}>
            <main>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="first">First Name</label>
                    <input type="text" id="email" name="email" required/>
                    <label htmlFor="last">Last Name</label>
                    <input type="text" id="password" name="password" required/>
                    <button type="submit">Submit</button>
                </form>
            </main>
        </Provider>
    );
};

export default Page;