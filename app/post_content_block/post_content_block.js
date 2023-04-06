'use client';
import React, {useEffect, useState} from 'react';
import styles from './page.module.css'
import {Button, CircularProgress, TextField} from "@mui/material";
import {useForm} from "react-hook-form";

const PostContentBlock = () => {
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        setIsLoading(false)
    }, [])
    const {register, formState: {errors}, handleSubmit} = useForm();
    return (
        <div className={styles.post_content_block}>{isLoading ? <CircularProgress/> :

            <form className={styles.post_content_block_form}>
                <TextField className={styles.text_input_field}
                           error={!!errors.type}
                           helperText={errors.type ? errors.type.message : null}
                           autoFocus
                           type={"text"}
                           label={"TYPE"}
                           variant={"outlined"}
                           {...register("type", {
                               required: "Required"
                           })}
                />
                <TextField
                    className={styles.text_input_field}
                    error={!!errors.content}
                    type={"text"}
                    label={"CONTENT"}
                    variant={"outlined"}
                    {...register("content", {
                        required: "Required"
                    })}/>
                <Button variant={"contained"} type={"submit"}>Submit</Button>
            </form>}
        </div>
    );
};

export default PostContentBlock;