'use client';
import React, {useEffect, useState} from 'react';
import styles from "@/app/post_card/page.module.css";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Link from "next/link";

const PostCard = ({post, createdDate, postControls, deleteFn}) => {
    const [open, setOpen] = useState(false);
    const [operationProgress, setOperationProgress] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function deleteHandler() {
        handleClose();
        deleteFn(post.id);
    }
    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Confirm Delete
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this post?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={deleteHandler} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
            <div className={styles.post_card_root}>
                <div className={styles.image_container}>
                        <Link href={`/posts/${post.seo_slug}`}  scroll={false}><img src={post.cover_image} alt=""/> </Link>
                </div>
                <div className={styles.text_container}>
                    <Link href={`/posts/${post.seo_slug}`} scroll={false}>
                        <h3 className={styles.text_container_title}>{post.title}</h3>

                        <div className={styles.post_meta_container}>
                            <p className={styles.post_meta_info}>{post.author.username} | {createdDate}</p>
                        </div>
                    </Link>
                    <Link href={`/posts/${post.seo_slug}`}  scroll={false}><div className={styles.post_excerpt}>{post.meta_description.slice(0,200)+'...'}</div></Link>
                </div>
                {postControls && <div className={styles.controls_box}>
                    <div onClick={handleClickOpen} className={styles.post_controls_btn}>
                        <DeleteIcon/>
                    </div>
                    <Link href={`/edit/${post.id}`}>
                        <div className={styles.post_controls_btn}>
                            <EditIcon style={{color: "black"}}/>
                        </div>
                    </Link>
                </div>}
            </div>
        </>
    );
};

export default PostCard;