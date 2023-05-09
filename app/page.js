import styles from './page.module.css'
import PostCard from "@/app/post_card/post_card";
import {fetchURL} from "@/app/constants";
import React from "react";

async function getPosts() {
    const response = await fetch(`${fetchURL}/posts`, {cache: 'no-store'});
// ,{ cache: 'no-store' }
    if (!response.ok) {
        throw new Error('fetch error');
    }
    return await response.json();
}

export const metadata = {
    icons: {
        icon: '/favicon.png',
    },
    title: 'Programmation.dev'
};

export default async function Home() {
    const posts = await getPosts();
    const metaDescr = "A programming blog featuring high-quality tutorials and articles on popular languages and emerging technologies."
    return (
        <>
            <meta
                name="description"
                content={metaDescr}/>
            <meta
                property="og:description"
                content={metaDescr}/>
            <meta
                property="og:image"
                content="/logo.png"
            />
            <main className={styles.main}>
                {posts && posts.map(post => (
                    <PostCard post={post} createdDate={(new Date(post.time_created)).toLocaleDateString()}
                              key={post.id}/>

                ))}
            </main>
        </>
    )
}
