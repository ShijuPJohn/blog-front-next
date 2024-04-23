'use client';
import React from 'react';
import styles from './page.module.css'
import Link from "next/link";

function Footer() {
    return (
        <footer className={styles.footer_root}>
            <div className={styles.copyright_box}>
                &copy; 2023 <a href="/">programmation.dev.</a> All rights reserved.
            </div>
            <div className={styles.about_privacy_links_box}>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/privacy">Privacy</Link></li>
            </div>
        </footer>
    )
        ;
}

export default Footer;