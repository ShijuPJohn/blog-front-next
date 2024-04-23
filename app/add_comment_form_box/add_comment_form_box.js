'use client';
import React, {useState} from 'react';
import styles from './page.module.css'
import {Button, TextField} from "@mui/material";
import {useForm} from "react-hook-form";
import axios from "axios";
import {fetchURL} from "@/app/constants";
import {enqueueSnackbar} from "notistack";

function AddCommentFormBox({postId, addCommentFunction}) {
    const {register, formState: {errors}, handleSubmit} = useForm();
    const [dataFetching, setDataFetching] = useState(false);
    const onSubmit = async (data) => {
        setDataFetching(true);
        data.post_id = postId
        const response = await axios.post(`${fetchURL}/comment`, data);
        if (response.status === 201) {
            addCommentFunction(prevVal => ([response.data.comment, ...prevVal]))
            enqueueSnackbar('Comment Posted', {variant: "success"});
        } else {
            enqueueSnackbar("Couldn't post comment", {variant: "error"});
        }
        setDataFetching(false);
    }

    return (
        <div className={styles.comment_add_box}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.comment_add_form}>
                <h3 className={styles.comment_add_box_title}>Add a comment</h3>
                <div className={styles.comment_name_email_box}>
                    <TextField
                        className={styles.name_field}
                        error={!!errors.author_name}
                        helperText={errors.author_name ? errors.author_name.message : null}
                        type={"text"}
                        label={"NAME"}
                        variant={"outlined"}
                        style={{margin: ".4rem .2rem"}}
                        {...register("author_name", {required: "Required"})}/>

                    <TextField
                        className={styles.email_field}
                        error={!!errors.author_email}
                        helperText={errors.author_email ? errors.author_email.message : null}
                        autoComplete={"email"}
                        label={"EMAIL"}
                        variant={"outlined"}
                        style={{margin: ".4rem .2rem"}}
                        {...register("author_email", {
                            required: "Required",
                            pattern: {
                                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
                                message: "Invalid email"
                            }
                        })}
                    />
                </div>

                <TextField
                    className={styles.text_input_field}
                    error={!!errors.comment}
                    helperText={errors.comment ? errors.comment.message : null}
                    type={"text"}
                    label={"COMMENT"}
                    multiline
                    rows={2}
                    style={{margin: ".4rem .2rem"}}
                    variant={"outlined"}
                    {...register("comment", {required: "Required"})}/>
                <Button className={styles.form_btn} variant={"contained"} type="submit"
                >Post Comment</Button>
            </form>
        </div>
    );
}

export default AddCommentFormBox;