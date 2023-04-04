'use client';
import React, {useEffect, useState} from 'react';
import styles from './page.module.css'
import {useDispatch, useSelector} from "react-redux";
import {enqueueSnackbar} from "notistack";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {Button, Checkbox, CircularProgress, FormControlLabel, TextField} from "@mui/material";
import axios from "axios";

const Page = () => {
    const userLogin = useSelector(state => state.user.user)
    const {loading, userInfo} = userLogin
    const router = useRouter();
    const dispatch = useDispatch()
    const {register, formState: {errors}, handleSubmit} = useForm();
    const [draft, setDraft] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    useEffect(() => {
        async function fetchCategories() {
            const headers = {
                'Content-Type': 'application/json',
                'x-token': userInfo.token
            }
            const response = await axios.get("http://localhost:8080/api/categories",
                {headers})
            if (response.statusText !== 'OK') {
                router.push('/')
                enqueueSnackbar('Failed to fetch categories', {variant: "error"});
            }
            setCategories(response.data)
        }

        fetchCategories()

    }, [])
    useEffect(() => {
        if (!(userInfo && Object.keys(userInfo).length !== 0)) {
            router.push('/')
        }
    }, [userInfo])

    function handleDraftChange(event, value) {
        setDraft(pval => !pval)
    }


    const onSubmit = async (data) => {
        data.draft = draft
        data.archived = false
        data.categories = selectedCategories
        console.log(data)
        const headers = {
            'Content-Type': 'application/json',
            'x-token': userInfo.token
        }
        const response = await axios.post("http://localhost:8080/api/post", data,
            {headers})
        console.log(response)
        if (response.statusText !== 'OK') {
            router.push('/')
            enqueueSnackbar('Failed to fetch categories', {variant: "error"});
        }
    }


    return (
        <main className={styles.main}>
            <h2 className={styles.signup_login_title}>Add Post</h2>
            <div className={styles.main_container}>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.login_signup_form}>
                    <TextField className={styles.text_input_field}
                               error={!!errors.title}
                               helperText={errors.title ? errors.title.message : null}
                               autoFocus
                               type={"text"}
                               label={"TITLE"}
                               variant={"outlined"}
                               {...register("title", {
                                   required: "Required"
                               })}
                    />
                    <TextField
                        className={styles.text_input_field}
                        error={!!errors.description}
                        type={"text"}
                        label={"CONTENT"}
                        variant={"outlined"}
                        {...register("description")}/>
                    <TextField
                        className={styles.text_input_field}
                        error={!!errors.cover_image}
                        type={"text"}
                        label={"COVER IMAGE"}
                        variant={"outlined"}
                        {...register("cover_image")}/>
                    <TextField
                        className={styles.text_input_field}
                        error={!!errors.seo_slug}
                        type={"text"}
                        label={"SEO SLUG"}
                        variant={"outlined"}
                        {...register("seo_slug")}/>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={draft}
                                onChange={handleDraftChange}
                                name="checkedB"
                                color="primary"
                            />
                        }
                        label="Mark as draft"
                    />
                    <div className={styles.tags_container}>
                        {categories.map(category => (
                            <div key={category.id}
                                 className={selectedCategories.includes(category.id) ? styles.tag_bubble_active : styles.tag_bubble}
                                 onClick={() => {
                                     if (selectedCategories.includes(category.id)) {
                                         setSelectedCategories(prevState => prevState.filter(st => st !== category.id))
                                     } else {
                                         setSelectedCategories(prevState => [...prevState, category.id])
                                     }
                                 }
                                 }>{category.name}</div>)
                        )}
                    </div>
                    <input
                        accept="image/*"
                        // className={classes.input}
                        style={{ display: 'none' }}
                        id="raised-button-file"
                        multiple
                        type="file"
                    />
                    <label htmlFor="raised-button-file">
                        <Button variant="raised" component="span"
                                // className={classes.button}
                        >
                            Upload
                        </Button>
                    </label>
                    <div className={styles.form_btn_container}>
                        <Button className={styles.form_btn} variant={"contained"} type="submit"
                                disabled={loading}>{loading ? <CircularProgress size={"1.4rem"}/> : 'Submit'}</Button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default Page;