import React from 'react';
import styles from './page.module.css'
import {fetchURL} from "@/app/constants";
import Link from "next/link";
import ContentBody from "@/app/content_body";
import Head from "next/head";
import {NextSeo} from "next-seo";


async function fetchPost(slug) {
    const resp = await fetch(`${fetchURL}/post/byslug/${slug}`, {cache: 'no-store'});
    if (!resp.ok) {
        throw new Error("fetch error");
    }
    const post = await resp.json();
    return post;
}

export const metadata = {
    icons: {
        icon: '/favicon.png',
    },
};
const Page = async ({params}) => {
    const post = await fetchPost(params.slug);
    return (
        <>
            <title>{`${post.title} | ThinkPython.dev`}</title>
            <meta
                name="description"
                content={post.meta_description}
            />
            <meta
                property="og:description"
                content={post.meta_description}
            />
            <meta
                property="og:image"
                content={post.cover_image}
            />
            <main className={styles.main}>
                <h1 className={styles.post_title_text}><Link href={`/posts/${params.slug}`}>{post.title}</Link></h1>
                <div className={styles.post_meta_container}>
                    <p className={styles.post_meta_info}>{post.author.username} | {(new Date(post.time_created)).toLocaleDateString()}</p>
                </div>
                <div className={styles.image_container}>
                    <img src={post.cover_image} alt=""/>
                </div>
                <ContentBody content={post.description}/>
            </main>
        </>
    );
};

export default Page;