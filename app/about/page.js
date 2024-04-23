import React from 'react';
import './page.module.css';
import styles from "@/app/posts/[slug]/page.module.css";
import Link from "next/link";

const Page = () => {
    return (
        <>
            <main className={styles.main}>
                <h1 className={styles.post_title_text}>About</h1>
                <p>
                    Welcome to programmation.dev! My name is Shiju P John, and I'm thrilled to have you here. I'm passionate about simplifying complex concepts, making technology accessible, and fostering an environment where learning is enjoyable.
                </p>
                <h3>Journey into Technology:</h3>
                <p>

                    My journey into the world of technology began as a curious explorer. With a background in full stack development, I've honed my skills in creating robust, user-friendly applications that resonate with modern needs. Crafting elegant code and solving intricate problems is both my profession and my passion.
                </p>
                <p>

                </p>
                <p>

                </p>
                <p>

                </p>
                <p>

                </p>
                <p>

                </p>
                <p>

                </p>
                <p>

                </p>
            </main>
        </>
    );
};

export default Page;