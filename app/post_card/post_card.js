'use client';
import React from 'react';
import styles from "@/app/post_card/post_card.module.css";
import sanitizeHtml from "sanitize-html-react";
import Link from "next/link";
// (new Date(post.time_created)).toLocaleDateString()
const PostCard = ({post, createdDate}) => {
    return (

            <div className={styles.post_card_root}>

                <div className={styles.image_container}><Link href={`/posts/${post.seo_slug}`}><img src={post.cover_image} alt=""/>       </Link></div>

                <div className={styles.text_container}>
                    <Link href={`/posts/${post.seo_slug}`}>
                    <h3 className={styles.text_container_title}>{post.title}</h3>
                    <div className={styles.post_meta_container}>
                        <p className={styles.post_meta_info}>{post.author.username} | {createdDate}</p>
                    </div>
                    <div className={styles.post_excerpt}
                         dangerouslySetInnerHTML={{__html: sanitizeHtml(post.description.slice(0, 200))}}/>
                    </Link>
                </div>

            </div>

    )
        ;
};

export default PostCard;