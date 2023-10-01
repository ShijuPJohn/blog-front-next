'use client';
import React, {useEffect, useState} from 'react';
import styles from './page.module.css'
import {fetchURL} from "@/app/constants";
import {Waypoint} from "react-waypoint";
import {CircularProgress} from "@mui/material";
import CommentCard from "@/app/comment_card/comment_card";
import AddCommentFormBox from "@/app/add_comment_form_box/add_comment_form_box";

function CommentBox({postId}) {
    const [commentsFetched, setCommentsFetched] = useState(false);
    const [isCommentsFetching, setIsCommentsFetching] = useState(false)
    const [comments, setComments] = useState([])
    useEffect(() => {
        fetchComments();
    }, [])

    async function fetchComments() {
        setIsCommentsFetching(true);
        const response = await fetch(`${fetchURL}/comment_by_pid/${postId}`);
        if (response.ok) {
            const data = await response.json();
            setComments(data);
            setCommentsFetched(true)
        }
        setIsCommentsFetching(false);
    }

    return (
        <div className={styles.comment_box_root}>
            {isCommentsFetching ? <CircularProgress/> :
                <>
                    <AddCommentFormBox postId={postId} addCommentFunction={setComments}/>
                    {comments.map((comment => (
                        <CommentCard key={comment.id} comment={comment}/>
                    )))}
                </>
            }

        </div>
    );
}

export default CommentBox;