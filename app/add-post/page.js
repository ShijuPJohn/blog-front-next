'use client';

import React, {useEffect, useState} from 'react';
import styles from './page.module.css'
import {useSelector} from "react-redux";
import {enqueueSnackbar} from "notistack";
import {useRouter} from "next/navigation";
import {Button, Checkbox, CircularProgress, FormControlLabel, TextField} from "@mui/material";
import axios from "axios";
import {categoriesData, fetchURL} from "@/app/constants";
import PhotoIcon from "@mui/icons-material/Photo";
import DeleteIcon from "@mui/icons-material/Delete";
import UndoIcon from "@mui/icons-material/Undo";

// import WEditor from "@/app/wEditor";


function Page() {
    const userLogin = useSelector(state => state.user.user);
    const {loading, userInfo} = userLogin;
    const router = useRouter();
    const [draft, setDraft] = useState(false);
    const [archived, setArchived] = useState(false);
    const [id, setId] = useState(0);
    const [title, setTitle] = useState('');
    const [seoSlug, setSeoSlug] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [coverImageFile, setCoverImageFile] = useState();
    const [coverImageUrl, setCoverImageUrl] = useState('');
    const [coverImageUrlLast, setCoverImageUrlLast] = useState('');
    const [isFetching, setIsFetching] = useState(false);
    const [contentHTML, setContentHTML] = useState('');




    useEffect(() => {
        if (!(userInfo && Object.keys(userInfo).length !== 0)) {
            router.push('/')
        }
    }, [userInfo])

    function handleDraftChange(event, value) {
        setDraft(pval => !pval)
    }


    async function onSubmit() {
        try {
            let response = null;
            const data = {
                title,
                draft,
                archived,
                seo_slug: seoSlug,
                categories: selectedCategories,
                cover_image: coverImageUrl,
                description: contentHTML
            };
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userInfo.token
            };
            response = await axios.post(`${fetchURL}/post`, data,
                {headers});
            if (response && response.status === 201) {
                router.push(`/edit/${response.data.post.id}`)
                if (!draft) {
                    enqueueSnackbar('Post Published Successfully', {variant: "success"});
                    // router.push(`/posts/${response.data.post.seo_slug}`)
                } else {
                    enqueueSnackbar('Post Saved Successfully', {variant: "success"});
                }
            } else {
                enqueueSnackbar('Failed to save', {variant: "error"});
            }
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
        const url = `${fetchURL}/post/image-upload`;
        const formData = new FormData();
        formData.append('file', coverImageFile);
        formData.append('fileName', coverImageFile.name);
        console.log(coverImageFile)
        console.log(coverImageFile.name)
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': 'Bearer ' + userInfo.token
            },
        };
        const response = await axios.post(url, formData, config)

        if (response.status === 201) {
            setCoverImageUrlLast(coverImageUrl)
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
                    <TextField className={styles.text_input_field}
                               autoFocus
                               type={"text"}
                               label={"TITLE"}
                               variant={"outlined"}
                               onChange={e => {
                                   setTitle(e.target.value);
                               }}
                               style={{margin: "1rem"}}
                    />
                    <TextField
                        className={styles.text_input_field}
                        type={"text"}
                        label={"SEO SLUG"}
                        variant={"outlined"}
                        onChange={e => {
                            setSeoSlug(e.target.value)
                        }}
                        style={{margin: "1rem"}}
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
                        <div className={styles.file_upload_btns_container}>
                            <label className={styles.custom_file_upload}>
                                <input onChange={handleChange} type={"file"}
                                       className={styles.file_upload_inp}/>
                                <PhotoIcon/>
                            </label>
                            <button className={styles.file_upload_delete_btn}
                                    onClick={() => {
                                        setCoverImageUrl('');
                                        setCoverImageFile(null)
                                    }}>
                                <DeleteIcon/>
                            </button>
                            <button className={styles.file_upload_delete_btn}
                                    onClick={() => {
                                        setCoverImageUrl(coverImageUrlLast);
                                    }}>
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
                        {coverImageUrl && <img src={coverImageUrl} alt={"post cover image"}/>}
                    </div>

                    {/*<div className={styles.editor_container}>*/}
                    {/*    <WEditor updateHTMLFn={setContentHTML} initialHTML={description}/>*/}
                    {/*</div>*/}
                    <div className={styles.content_text_container}>
                        <TextField
                            className={styles.content_text_container}
                            multiline
                            rows={10}
                            value={contentHTML}
                            onChange={(event) => {
                                setContentHTML(event.target.value)
                            }}/>
                    </div>
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

                    <div className={styles.form_btn_container}>
                        <Button className={styles.form_btn} variant={"contained"} onClick={onSubmit}
                                disabled={isFetching}>{isFetching ?
                            <CircularProgress size={"1.4rem"}/> : (draft ? 'Save' : 'Publish')}</Button>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Page;