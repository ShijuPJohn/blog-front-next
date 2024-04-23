import React from 'react';
import './page.module.css';
import styles from "@/app/posts/[slug]/page.module.css";
import Link from "next/link";

const Page = ({params}) => {
    return (
            <>
                <title>Privacy Policy | PROGRAMMATION.dev</title>
                <main className={styles.main}>
                    <h1 className={styles.post_title_text}>Privacy Policy</h1>
                </main>
            </>
    );
};

export default Page;