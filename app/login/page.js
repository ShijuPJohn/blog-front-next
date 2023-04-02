'use client';
import React, {useEffect} from 'react';
import styles from './page.module.css';
import {useDispatch, useSelector} from "react-redux";
import {loginThunk} from "../reducers/user_slice";
import {useRouter} from "next/navigation";
import {enqueueSnackbar} from 'notistack';
import {useForm} from "react-hook-form";
import {Button, TextField} from "@mui/material";

const Page = () => {
    const userLogin = useSelector(state => state.user)
    console.log("state.user",userLogin)
    const {loading, userInfo} = userLogin
    const router = useRouter();
    const dispatch = useDispatch()
    const {register, formState: {errors}, handleSubmit} = useForm();

    const onSubmit = async (data) => {
        dispatch(loginThunk(data.email, data.password))
    }
    useEffect(() => {
        if (userInfo && Object.keys(userInfo).length !== 0) {
            enqueueSnackbar('Logged In', {variant: "success"})
            router.push('/')
        }
    }, [userLogin])

    return (
        <main className={styles.main}>
            <div className={styles.main_container}>
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
                        {...register("password", {required: "Required"})}/>
                    <div className={styles.form_btn_container}>
                        <Button className={styles.form_btn} variant={"contained"} type="submit">Submit</Button>
                        <Button className={styles.form_btn} variant={"contained"} type="reset">Clear</Button>
                    </div>
                </form>
                <div className={styles.grey_line}></div>
                <a href="/signup"><p className={styles.create_acc_login}>Create an account</p></a>
            </div>
        </main>
    );
};

export default Page;