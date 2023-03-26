'use client'
import React, {useEffect, useRef, useState} from 'react';
import styles from './header.module.css'
import Link from "next/link";


const Header = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    useEffect(() => {
        console.log(showSidebar)
    }, [showSidebar])
    return (
        <>
            <header className={showSidebar ? `${styles.header} ${styles.show}` : `${styles.header} ${styles.hide}`}>
                <div className={styles.main_nav_ham_btn} onClick={(event) => {
                    setShowSidebar(existingVal => !existingVal);
                }}>
                    <div className={`${styles.line}`}></div>
                    <div className={`${styles.line}`}></div>
                    <div className={`${styles.line}`}></div>
                </div>
                <nav className={`${styles.main_nav}`}>
                    <ul className={`${styles.main_nav_links}`}>
                        <li className={styles.main_nav_links_item}><Link href="/">Home</Link></li>
                        <li className={styles.main_nav_links_item}><Link href="/">Categories</Link></li>
                        <li className={styles.main_nav_links_item}><Link href="/about">About</Link></li>
                        <li className={styles.main_nav_links_item}><Link href="/">Contact</Link></li>
                    </ul>
                </nav>
            </header>
        </>
    );
};

export default Header;