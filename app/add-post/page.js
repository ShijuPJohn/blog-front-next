'use client';
import React, {useEffect} from 'react';
import styles from './page.module.css'
import {useDispatch, useSelector} from "react-redux";
import {enqueueSnackbar} from "notistack";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {login} from "@/app/actions/userActions";

const Page = () => {
    const userLogin = useSelector(state => state.user)
    const {error, loading, userInfo} = userLogin
    const dispatch = useDispatch();
    const router = useRouter();
    const {register, formState: {errors}, handleSubmit} = useForm();
    useEffect(() => {
        if (userInfo && Object.keys(userInfo).length === 0) {
            enqueueSnackbar('Logged Out')
            router.push('/')
        }
    }, [userLogin])


    const onSubmit = async (data) => {
        dispatch(login(data.email, data.password))
    }



    return (
        <div>
            <h1>Add Post</h1>
        </div>
    );
};

export default Page;