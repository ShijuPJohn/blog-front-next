'use client';
import React, {useEffect, useState} from 'react';
import styles from './page.module.css';
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/navigation";
import axios from "axios";
import PostCard from "@/app/post_card/post_card";
import {CircularProgress} from "@mui/material";
import jwt_decode from "jwt-decode";
import {fetchURL} from "@/app/constants";
import {enqueueSnackbar} from "notistack";


function Page(props) {
    const userLogin = useSelector(state => state.user.user);
    const {loading, userInfo} = userLogin;
    const router = useRouter();
    const dispatch = useDispatch();
    const [posts, setPosts] = useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const userInfoFromToken = jwt_decode(userInfo.token);
    const {username, userid, useremail} = {
        username: userInfoFromToken.username,
        userid: userInfoFromToken.id,
        useremail: userInfoFromToken.email
    };

    const handleDeleteClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleDeleteClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    useEffect(() => {
        if (!(userInfo && Object.keys(userInfo).length !== 0)) {
            router.push('/')
        }
    }, [userInfo]);
    useEffect(() => {
        async function fetchPosts() {
            const url = `${fetchURL}/user/posts`;
            const config = {
                headers: {
                    'content-type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + userInfo.token
                },
            };
            const response = await axios.get(url, config);
            if (response.status !== 200) {
                throw new Error('fetch error');
            }
            setPosts(response.data)
        }

        fetchPosts();

    }, [])

    async function postDeleteFn(pid) {
        const url = `${fetchURL}/posts/${pid}`;
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': 'Bearer '+userInfo.token
            },
        };
        const response = await axios.delete(url, config);
        if (response.status !== 200) {
            enqueueSnackbar("Couldn't delete post", {variant: "error"})
            throw new Error('fetch error');
        } else {
            enqueueSnackbar("Post Deleted", {variant: "success"})
        }
        setPosts(prevState => prevState.filter(post => post.id !== pid));
    }

    return (
        <main className={styles.main}>
            <div className={styles.info_block}>
                <h2>{`Hello ${username}`}</h2>
                <h3>{`email: ${useremail}`}</h3>
            </div>
            {posts.length !== 0 ? posts.map(post => (
                <PostCard post={post} createdDate={(new Date(post.time_created)).toLocaleDateString()} key={post.id}
                          postControls={true} deleteFn={postDeleteFn}/>

            )) : <CircularProgress className={styles.circular_progress}/>}
        </main>
    );
}

export default Page;