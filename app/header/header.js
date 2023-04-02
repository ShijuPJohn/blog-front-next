'use client';
import React, {useEffect, useState} from 'react';
import styles from './header.module.css'
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import {enqueueSnackbar} from "notistack";
import AddIcon from '@mui/icons-material/Add';


const Header = () => {
    const userLogin = useSelector(state => state.user)
    const [showSidebar, setShowSidebar] = useState(false);
    const {userInfo} = userLogin
    const dispatch = useDispatch();
    useEffect(() => {
        if (userInfo && Object.keys(userInfo).length === 0) {
            enqueueSnackbar("Logged Out")
        }
    }, [userInfo])
    return (
        <header className={showSidebar ? `${styles.header} ${styles.show}` : `${styles.header}`}>
            {!showSidebar && <Link href={"/"}>
                <div className={styles.logo_box}>
                    <img src="/logo.png" alt="logo"/>
                    <h1 className={styles.logo_text}>TheFullStack.site</h1>
                </div>
            </Link>}
            <div className={styles.main_nav_ham_btn} onClick={(event) => {
                setShowSidebar(existingVal => !existingVal);
            }}>
                <div className={`${styles.line}`}></div>
                <div className={`${styles.line}`}></div>
                <div className={`${styles.line}`}></div>
            </div>
            <nav className={`${styles.main_nav}`}>
                <ul className={`${styles.main_nav_links}`}>
                    {/*{userInfo && Object.keys(userInfo).length !== 0 ?*/}
                    {/*    <li className={styles.main_nav_links_item}><Link href="/add-post"><AddIcon/></Link></li> : null}*/}
                    <li className={styles.main_nav_links_item}><Link href="/">Home</Link></li>
                    <li className={styles.main_nav_links_item}><Link href="/">Categories</Link></li>
                    <li className={styles.main_nav_links_item}><Link href="/about">About</Link></li>
                    <li className={styles.main_nav_links_item}><Link href="/">Contact</Link></li>
                    {/*{userInfo && Object.keys(userInfo).length !== 0 ?*/}
                    {/*    <li className={styles.main_nav_links_item} onClick={() => {*/}
                    {/*        dispatch(logout())*/}
                    {/*    }}>Logout</li> :*/}
                    {/*    <li className={styles.main_nav_links_item}><Link href="/login">Login</Link></li>}*/}
                </ul>
            </nav>
        </header>
    );
};

export default Header;