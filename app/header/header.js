'use client';
import React, {useEffect, useState} from 'react';
import styles from './header.module.css'
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import AddIcon from '@mui/icons-material/Add';
import {logout} from "@/app/reducers/user_slice";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import {Button} from "@mui/material";
import {useRouter} from "next/navigation";


const Header = () => {
    const router = useRouter();
    const userLogin = useSelector(state => state.user.user);
    const [showSidebar, setShowSidebar] = useState(false);
    const [hydrated, setHydrated] = React.useState(false);
    const {userInfo} = userLogin
    const dispatch = useDispatch();
    useEffect(() => {
        setHydrated(true);
    }, []);

    useEffect(() => {
        setShowSidebar(false)
    }, [router.asPath])
    useEffect(()=>{
        if (showSidebar){
            setTimeout(()=>{
                setShowSidebar(false)
            },5000)
        }
    },[showSidebar])

    if (!hydrated) {
        return null;
    }
    return (
        <header className={styles.header}>
            <Link href={"/"}>
                <div className={styles.logo_box}>
                    <img src="/logo.png" alt="logo"/>
                </div>
            </Link>
            <nav className={styles.main_nav}>
                <Button className={styles.menu_btn} onClick={(event) => {
                    setShowSidebar(existingVal => !existingVal);
                }}>{showSidebar ? <CloseIcon/> : <MenuIcon/>}</Button>
                <ul className={`${styles.main_nav_links}`}>
                    {userInfo && Object.keys(userInfo).length !== 0 ?
                        <>
                            <li className={styles.main_nav_links_item}><Link href="/add-post"><AddIcon/></Link></li>
                            <li className={styles.main_nav_links_item}><Link href="/dashboard">Dashboard</Link></li>
                        </> : null}
                    <li className={styles.main_nav_links_item}><Link href="/">Home</Link></li>
                    {/*<li className={styles.main_nav_links_item}><Link href="/">Categories</Link></li>*/}
                    {/*<li className={styles.main_nav_links_item}><Link href="/about">About</Link></li>*/}
                    {/*<li className={styles.main_nav_links_item}><Link href="/">Contact</Link></li>*/}
                    {userInfo && Object.keys(userInfo).length !== 0 ?
                        <li className={styles.main_nav_links_item} onClick={() => {
                            dispatch(logout())
                        }}>Logout</li> :
                        <li className={styles.main_nav_links_item}><Link href="/login">Login</Link></li>}
                </ul>

                <div className={showSidebar ? `${styles.side_menu} ${styles.show}` : `${styles.side_menu_hidden}`}
                     onfocusout={() => {
                         setShowSidebar(false)
                     }
                     }>
                    <ul className={styles.side_nav_ul}>
                        {userInfo && Object.keys(userInfo).length !== 0 ?
                            <>
                                <li className={styles.main_nav_links_item}><Link href="/add-post"><AddIcon/></Link></li>
                                <li className={styles.main_nav_links_item}><Link href="/dashboard">Dashboard</Link></li>
                            </> : null}
                        <li className={styles.main_nav_links_item}><Link href="/">Home</Link></li>
                        {userInfo && Object.keys(userInfo).length !== 0 ?
                            <li className={styles.main_nav_links_item} onClick={() => {
                                dispatch(logout())
                            }}>Logout</li> :
                            <li className={styles.main_nav_links_item}><Link href="/login">Login</Link></li>}
                    </ul>
                </div>
            </nav>

        </header>
    );
};

export default Header;