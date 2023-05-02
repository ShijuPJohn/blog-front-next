'use client';
import React, {useEffect, useState} from 'react';
import styles from './page.module.css'
import {useDispatch, useSelector} from "react-redux";
import {enqueueSnackbar} from "notistack";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {Button, Checkbox, CircularProgress, FormControlLabel, TextField} from "@mui/material";
import axios from "axios";
import Head from "next/head";
import WEditor from "@/app/editor/wEditor";
import Router from "next/router";
import {categoriesData} from "@/app/constants";


const Page = () => {
    const userLogin = useSelector(state => state.user.user);
    const {loading, userInfo} = userLogin
    const router = useRouter();
    const dispatch = useDispatch();
    const {register, formState: {errors}, handleSubmit} = useForm();
    const [draft, setDraft] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [coverImageFile, setCoverImageFile] = useState();
    const [coverImageUrl, setCoverImageUrl] = useState('');
    const [isFetching, setIsFetching] = useState(false);
    const [contentHTML, setContentHTML] = useState('');
    const [notSaved, setNotSaved] = useState(true)
    useEffect(() => {
        const confirmationMessage = 'Changes you made may not be saved.';
        const beforeUnloadHandler = (e) => {
            (e || window.event).returnValue = confirmationMessage;
            return confirmationMessage; // Gecko + Webkit, Safari, Chrome etc.
        };
        const beforeRouteHandler = (url) => {
            if (Router.pathname !== url && !confirm(confirmationMessage)) {
                Router.events.emit('routeChangeError');
                throw `Route change to "${url}" was aborted (this error can be safely ignored). See https://github.com/zeit/next.js/issues/2476.`;
            }
        };
        if (notSaved) {
            window.addEventListener('beforeunload', beforeUnloadHandler);
            Router.events.on('routeChangeStart', beforeRouteHandler);
        } else {
            window.removeEventListener('beforeunload', beforeUnloadHandler);
            Router.events.off('routeChangeStart', beforeRouteHandler);
        }
        return () => {
            window.removeEventListener('beforeunload', beforeUnloadHandler);
            Router.events.off('routeChangeStart', beforeRouteHandler);
        };
    }, [notSaved]);
    useEffect(() => {
        if (!(userInfo && Object.keys(userInfo).length !== 0)) {
            router.push('/')
        }
    }, [userInfo])

    function handleDraftChange(event, value) {
        setDraft(pval => !pval)
    }


    const onSubmit = async (data) => {
        try {
            setIsFetching(true)
            data.draft = draft
            data.archived = false
            data.categories = selectedCategories
            data.cover_image = coverImageUrl
            data.description = contentHTML;
            console.log(data)
            const headers = {
                'Content-Type': 'application/json',
                'x-token': userInfo.token
            }
            const response = await axios.post("http://localhost:8080/api/post", data,
                {headers})
            console.log("Response", response)
            setIsFetching(false)
            if (response.status !== 201) {
                router.push('/')
                enqueueSnackbar('Failed to post', {variant: "error"});
            }
            router.push(`/posts/${response.data.post.seo_slug}`)
            enqueueSnackbar('Post Added Successfully', {variant: "success"});
        } catch (e) {
            setIsFetching(false)
            enqueueSnackbar('Failed to post. Try again', {variant: "error"});
        }
    }


    function handleChange(e) {
        setCoverImageFile(e.target.files[0])
    }


    async function handleCoverImageSubmit(event) {
        event.preventDefault()
        setIsFetching(true)
        const url = 'http://localhost:8080/api/post/image-upload';
        const formData = new FormData();
        formData.append('file', coverImageFile);
        formData.append('fileName', coverImageFile.name);
        console.log(coverImageFile)
        console.log(coverImageFile.name)
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'x-token': userInfo.token
            },
        };
        const response = await axios.post(url, formData, config)

        if (response.status === 201) {
            setCoverImageUrl(response.data.url)
            enqueueSnackbar("Image uploaded", {variant: "success"})
        } else {
            enqueueSnackbar("Image upload failed. Try again", {variant: "error"})
        }
        setIsFetching(false)
    }


    return (
        <>
            <main className={styles.main}>
                <h2 className={styles.signup_login_title}>Add Post</h2>
                <div className={styles.main_container}>
                    <form onSubmit={handleSubmit(onSubmit)} className={styles.add_post_form}>
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
                        {/*<TextField*/}
                        {/*    className={styles.text_input_field}*/}
                        {/*    error={!!errors.description}*/}
                        {/*    type={"text"}*/}
                        {/*    label={"CONTENT"}*/}
                        {/*    variant={"outlined"}*/}
                        {/*    {...register("description")}/>*/}
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
                            {categoriesData.map(category => (
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
                        <div className={styles.file_upload_box}>
                            <label className={styles.custom_file_upload}>
                                <input onChange={handleChange} type={"file"} className={styles.file_upload_inp}/>
                                Select Cover Image
                            </label>
                            <span
                                className={styles.cover_image_filename_label}>{coverImageFile ? coverImageFile.name : 'No file selected'}</span>
                        </div>
                        <Button variant={"contained"} className={styles.image_upload_btn}
                                onClick={handleCoverImageSubmit} disabled={!coverImageFile}>
                            {isFetching ?
                                <CircularProgress style={{color: "#FFF"}}/> : "Upload Image"}
                        </Button>
                        <div className={styles.img_preview_box}>
                            {coverImageUrl && <img src={coverImageUrl}/>}
                        </div>

                        <div className={styles.editor_container}>
                            <WEditor updateHTMLFn={setContentHTML}/>
                        </div>
                        <div className={styles.content_text_container}>
                            <TextField
                                className={styles.content_text_container}
                                multiline
                                rows={10}
                                value={contentHTML}
                                onChange={(event) => {
                                    setContentHTML(event.target.value)
                                }
                                }
                            />
                        </div>


                        <div className={styles.form_btn_container}>
                            <Button className={styles.form_btn} variant={"contained"} type="submit"
                                    disabled={isFetching}>{isFetching ?
                                <CircularProgress size={"1.4rem"}/> : 'Submit'}</Button>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
};

export default Page;