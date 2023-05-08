'use client';
import React, {useEffect, useState} from 'react';
import styles from './page.module.css';
import {useDispatch, useSelector} from "react-redux";
import {loginThunk, logout} from "../reducers/user_slice";
import {useRouter} from "next/navigation";
import {enqueueSnackbar} from 'notistack';
import {useForm} from "react-hook-form";
import {Button, CircularProgress, TextField} from "@mui/material";
import Head from "next/head";
import Link from "next/link";

const Page = () => {
    const userLogin = useSelector(state => state.user.user)
    const {loading, userInfo} = userLogin
    const router = useRouter();
    const dispatch = useDispatch()
    const {register, formState: {errors}, handleSubmit} = useForm();
    const [pageLoaded, setPageLoaded] = useState(false)

    const onSubmit = async (data) => {
        dispatch(loginThunk(data.email, data.password))
    }

    useEffect(() => {
        if (userInfo && Object.keys(userInfo).length !== 0) {
            router.push('/')
        }
        dispatch(logout)
    }, [userInfo])
    useEffect(() => {
        setPageLoaded(true)
    }, [])

    return (
        <>
            <title>Login | ThinkPython.dev</title>
            <meta
                name="description"
                content="Log in to user account | ThinkPython.dev"
            />
            <link rel="shortcut icon" href="/favicon.png" type="image/x-icon"/>
            <main className={styles.main}>
                {pageLoaded ? <div className={styles.main_container}>
                        <h3 className={styles.signup_login_title}>Login</h3>
                        <form onSubmit={handleSubmit(onSubmit)} className={styles.login_signup_form}>
                            <TextField
                                className={styles.text_input_field}
                                error={!!errors.email}
                                helperText={errors.email ? errors.email.message : null}
                                autoFocus
                                autoComplete={"email"}
                                name={"email"}
                                label={"EMAIL"}
                                style={{margin: "1rem"}}
                                variant={"outlined"}
                                {...register("email", {
                                    required: "Required",
                                    pattern: {
                                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
                                        message: "Invalid email"
                                    }
                                })}
                            />
                            <TextField
                                className={styles.text_input_field}
                                error={!!errors.password}
                                helperText={errors.password ? 'Password Required' : ''}
                                name={"password"}
                                type={"password"}
                                label={"PASSWORD"}
                                variant={"outlined"}
                                style={{margin: "1rem"}}
                                {...register("password", {required: "Required"})}/>
                            <div className={styles.form_btn_container}>
                                <Button className={styles.form_btn} variant={"contained"} type="submit"
                                        disabled={loading}>{loading ?
                                    <CircularProgress size={"1.4rem"}/> : 'Submit'}</Button>
                                <Button className={styles.form_btn} variant={"contained"} type="reset"
                                        disabled={loading}>Clear</Button>
                            </div>
                        </form>
                        <div className={styles.grey_line}></div>
                        <Link href="/signup"><p className={styles.create_acc_login}>Create an account</p></Link>
                    </div> :
                    <h2>Loading.....</h2>}
            </main>
        </>
    );
};

export default Page;