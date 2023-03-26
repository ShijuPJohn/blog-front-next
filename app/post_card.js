'use client';
import React from 'react';
import styles from "@/app/page.module.css";

const PostCard = ({post}) => {
    return (
        <div className={styles.post_card_root}>
            <div className={styles.image_container}><img src={post.cover_image} alt=""/></div>
            <h3 key={post.id}>{post.title}</h3>
        </div>
    );
};

export default PostCard;