'use client';
import React, {useEffect} from 'react';
import styles from './page.module.css';
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/navigation";



function Page(props) {
    const userLogin = useSelector(state => state.user.user);
    const {loading, userInfo} = userLogin;
    const router = useRouter();
    const dispatch = useDispatch();
    useEffect(() => {
        if (!(userInfo && Object.keys(userInfo).length !== 0)) {
            router.push('/')
        }
    }, [userInfo]);
    return (
        <>
            <h1>Dashboard</h1>
        </>
    );
}

export default Page;