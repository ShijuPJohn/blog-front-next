import React from 'react';
import styles from './page.module.css'
import sanitizeHtml from "sanitize-html-react";
import parse from 'html-react-parser';
import {fetchURL} from "@/app/constants";
import Link from "next/link";

async function fetchPost(slug) {
    const resp = await fetch(`${fetchURL}/post/byslug/${slug}`, {cache: 'no-store'});
    if (!resp.ok) {
        throw new Error("fetch error");
    }
    const post = await resp.json();
    return post;
}

const Page = async ({params}) => {
    const post = await fetchPost(params.slug);
    return (
        <main className={styles.main}>
            <h1 className={styles.post_title_text}><Link href={`/posts/${params.slug}`}>{post.title}</Link></h1>
            <div className={styles.post_meta_container}>
                <p className={styles.post_meta_info}>{post.author.username} | {(new Date(post.time_created)).toLocaleDateString()}</p>
            </div>
            <div className={styles.image_container}>
                <img src={post.cover_image} alt=""/>
            </div>
            <div className={styles.post_descr}>{parse(post.description)}</div>
        </main>
    );
};

export default Page;