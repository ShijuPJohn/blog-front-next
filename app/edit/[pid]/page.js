'use client';

import React, {useEffect, useState} from 'react';
import styles from "@/app/add-post/page.module.css";
import {Button, Checkbox, CircularProgress, FormControlLabel, TextField} from "@mui/material";
import WEditor from "@/app/editor/wEditor";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import Router from "next/router";
import axios from "axios";
import {enqueueSnackbar} from "notistack";
import {categoriesData, fetchURL} from "@/app/constants";
import DeleteIcon from '@mui/icons-material/Delete';
import UndoIcon from '@mui/icons-material/Undo';
import PhotoIcon from '@mui/icons-material/Photo';
let pid = -1;
function Page({params}) {
    const userLogin = useSelector(state => state.user.user);
    const {loading, userInfo} = userLogin
    const router = useRouter();
    const dispatch = useDispatch();
    // const {register, formState: {errors}, handleSubmit} = useForm();
    const [draft, setDraft] = useState(false);
    const [archived, setArchived] = useState(false);
    const [id, setId] = useState(0);
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [seoSlug, setSeoSlug] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [coverImageFile, setCoverImageFile] = useState();
    const [coverImageUrl, setCoverImageUrl] = useState('');
    const [coverImageOriginalUrl, setCoverImageOriginalUrl] = useState('');
    const [isFetching, setIsFetching] = useState(false);
    const [contentHTML, setContentHTML] = useState('');
    const [notSaved, setNotSaved] = useState(true)
    const [post, setPost] = useState({});
    const [dataLoading, setDataLoading] = useState(false);


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
        setDataLoading(true);
        console.log(params.pid)
        pid = params.pid
        const url = `${fetchURL}/post/${pid}`

        async function fetchPost() {
            const response = await fetch(url)
            if (!response.ok) {
                enqueueSnackbar("Couldn't fetch post", {variant: "error"})
                router.push('/dashboard')
            }
            const data = await response.json()
            setTitle(data.title);
            setDescription(data.description)
            setSeoSlug(data.seo_slug)
            setSelectedCategories(data.categories.map(cat => cat.id))
            setDraft(data.draft)
            console.log(data)
            setDataLoading(false)
            setCoverImageUrl(data.cover_image)
            setCoverImageOriginalUrl(data.cover_image)
        }

        fetchPost()

    }, [])
    useEffect(() => {
        if (!(userInfo && Object.keys(userInfo).length !== 0)) {
            router.push('/')
        }
    }, [userInfo])

    function handleDraftChange(event, value) {
        setDraft(pval => !pval)
    }

    const onSubmit = async () => {
        try {
            const data = {
                title,
                draft,
                archived,
                categories: selectedCategories,
                cover_image: coverImageUrl,
                description: contentHTML
            };
            console.log(data)
            const headers = {
                'Content-Type': 'application/json',
                'x-token': userInfo.token
            }
            console.log("url", `${fetchURL}/posts/${pid}`)
            const response = await axios.put(`${fetchURL}/posts/${pid}`, data,
                {headers})
            console.log("Response", response)
            setIsFetching(false)
            if (response.status !== 201) {
                router.push('/')
                enqueueSnackbar('Failed to update', {variant: "error"});
            }
            enqueueSnackbar('Post Updated Successfully', {variant: "success"});
        } catch (e) {
            setIsFetching(false)
            enqueueSnackbar('Failed to update. Try again', {variant: "error"});
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

                {dataLoading ? <h1>Loading...</h1> :
                    <>
                        <h2 className={styles.signup_login_title}>Update Post</h2>
                        <div className={styles.main_container}>
                            {/*<form onSubmit={handleSubmit(onSubmit)} className={styles.add_post_form}>*/}
                            <TextField className={styles.text_input_field}
                                       value={title}
                                       onChange={e => {
                                           setTitle(e.target.value)
                                       }}
                                       autoFocus
                                       type={"text"}
                                       label={"TITLE"}
                                       variant={"outlined"}/>

                            <TextField
                                className={styles.text_input_field}
                                type={"text"}
                                label={"SEO SLUG"}
                                variant={"outlined"}
                                value={seoSlug}
                                onChange={e => {
                                    setSeoSlug(e.target.value)
                                }}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={draft}
                                        onChange={handleDraftChange}
                                        name="checkedB"
                                        color="primary"/>
                                }
                                label="Mark as draft"/>

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
                                <div className={styles.file_upload_btns_container}>
                                    <label className={styles.custom_file_upload}>
                                        <input onChange={handleChange} type={"file"}
                                               className={styles.file_upload_inp}/>
                                        <PhotoIcon/>
                                    </label>
                                    <button className={styles.file_upload_delete_btn}
                                            onClick={() => {
                                                setCoverImageUrl('');
                                            }
                                            }
                                    >
                                        <DeleteIcon/>
                                    </button>
                                    <button className={styles.file_upload_delete_btn}
                                            onClick={() => {
                                                setCoverImageUrl(coverImageOriginalUrl);
                                            }
                                            }
                                    >
                                        <UndoIcon/>
                                    </button>
                                </div>
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
                                <WEditor updateHTMLFn={setContentHTML} initialHTML={description}/>
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
                                <Button className={styles.form_btn} variant={"contained"}
                                        disabled={isFetching} onClick={onSubmit}>
                                    {isFetching ?
                                        <CircularProgress size={"1.4rem"}/> : 'UPDATE'}
                                </Button>
                            </div>
                            {/*</form>*/}
                        </div>
                    </>
                }
            </main>
        </>
    );
}

export default Page;