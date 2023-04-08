'use client';
import React, {useEffect, useState} from 'react';
import styles from './page.module.css'
import {Autocomplete, Button, CircularProgress, TextField} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import QueueIcon from '@mui/icons-material/Queue';
import {useForm} from "react-hook-form";
import {enqueueSnackbar} from "notistack";

const PostContentBlock = ({id, blockAddFn, removeFn}) => {
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        setIsLoading(false)
    }, [])
    const [typeFieldValue, setTypeFieldValue] = useState('')
    const [contentFieldValue, setContentFieldValue] = useState('')
    const [styleFieldValue, setStyleFieldValue] = useState('')
    const [disabled, setDisabled] = useState(false)
    const blockTypes = [
        {id:0, label:"H1"},
        {id:1, label:"H2"},
        {id:2, label:"H3"},
        {id:3, label:"H4"},
        {id:4, label:"H5"},
        {id:5, label:"IMG"},
        {id:6, label:"P"},
        {id:7, label:"CODE"}
    ]

    return (
        <div className={styles.post_content_block}>{isLoading ? <CircularProgress/> :
            <>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={blockTypes}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Movie" />}
                />
                <TextField className={styles.text_input_field}
                           autoFocus
                           type={"text"}
                           label={"TYPE"}
                           variant={"outlined"}
                           disabled={disabled}
                           onChange={(event) => {
                               setTypeFieldValue(event.target.value)
                           }
                           }
                />
                <TextField className={styles.text_input_field}
                           autoFocus
                           type={"text"}
                           label={"STYLE"}
                           variant={"outlined"}
                           multiline
                           rows={2}
                           disabled={disabled}
                           onChange={(event) => {
                               setStyleFieldValue(event.target.value)
                           }
                           }
                />
                <TextField
                    className={styles.text_input_field}
                    type={"text"}
                    label={"CONTENT"}
                    variant={"outlined"}
                    disabled={disabled}
                    multiline
                    rows={6}
                    onChange={(event) => {
                        setStyleFieldValue(event.target.value)
                    }}
                />
                <div className={styles.post_content_block_btns_container}>
                    <Button variant={"contained"} disabled={!typeFieldValue.trim() ||!styleFieldValue.trim()} className={styles.post_content_block_add_btn}
                            onClick={() => {
                                blockAddFn(typeFieldValue, styleFieldValue)
                                setDisabled(true)
                                enqueueSnackbar("Element added to blog post", {variant:"success"})
                            }
                            }><QueueIcon/></Button>

                    <Button variant={"contained"} className={styles.post_content_block_remove_btn}
                            onClick={() => {
                                removeFn(id)
                            }
                            }><DeleteIcon/></Button>
                    <Button className={styles.post_content_block_edit_btn} variant={"contained"} onClick={() => {
                        setDisabled(false)
                    }
                    }><EditIcon/></Button>
                </div>

            </>
        }
        </div>
    );
};

export default PostContentBlock;