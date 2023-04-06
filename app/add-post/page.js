'use client';
import React, {useEffect, useState} from 'react';
import styles from './page.module.css'
import {useDispatch, useSelector} from "react-redux";
import {enqueueSnackbar} from "notistack";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {Button, Checkbox, CircularProgress, FormControlLabel, TextField} from "@mui/material";
import axios from "axios";
import PostContentBlock from "@/app/post_content_block/post_content_block";

const Page = () => {
    const userLogin = useSelector(state => state.user.user)
    const {loading, userInfo} = userLogin
    const router = useRouter();
    const dispatch = useDispatch()
    const {register, formState: {errors}, handleSubmit} = useForm();
    const [draft, setDraft] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [coverImageFile, setCoverImageFile] = useState();
    const [coverImageUrl, setCoverImageUrl] = useState('')
    const [isFetching, setIsFetching] = useState(false)
    const [postContentBlockIds, setPostContentBlockIds] = useState([])
    useEffect(() => {
        async function fetchCategories() {
            const headers = {
                'Content-Type': 'application/json',
                'x-token': userInfo.token
            }
            const response = await axios.get("http://localhost:8080/api/categories",
                {headers})
            if (response.status !== 200) {
                router.push('/')
                enqueueSnackbar('Failed to fetch categories', {variant: "error"});
            }
            setCategories(response.data)
            enqueueSnackbar('Categories Fetched', {variant: "success"});
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
        setIsFetching(true)
        data.draft = draft
        data.archived = false
        data.categories = selectedCategories
        data.cover_image = coverImageUrl
        console.log(data)
        const headers = {
            'Content-Type': 'application/json',
            'x-token': userInfo.token
        }
        const response = await axios.post("http://localhost:8080/api/post", data,
            {headers})
        console.log(response)
        if (response.status !== 201) {
            router.push('/')
            enqueueSnackbar('Failed to post', {variant: "error"});
        }
        setIsFetching(false)
        router.push('/')
        enqueueSnackbar('Post Added Successfully', {variant: "success"});
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
                    <TextField
                        className={styles.text_input_field}
                        error={!!errors.description}
                        type={"text"}
                        label={"CONTENT"}
                        variant={"outlined"}
                        {...register("description")}/>
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
                    <PostContentBlock addToPost={setPostContentBlockIds}/>

                    <div className={styles.form_btn_container}>
                        <Button className={styles.form_btn} variant={"contained"} type="submit"
                                disabled={isFetching}>{isFetching ?
                            <CircularProgress size={"1.4rem"}/> : 'Submit'}</Button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default Page;