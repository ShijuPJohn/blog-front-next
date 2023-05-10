'use client';
import React from 'react';
import styles from './page.module.css'
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

function AuthorBox({author}) {
    console.log(author)
    return (
        <div className={styles.author_box}>
            <div className={styles.author_image_box}>
                <img src={author.profile_image} alt=""/>
            </div>
            <div className={styles.author_text_box}>
                <h4 className={styles.author_box_author_name}>{author.username}</h4>
                <p className={styles.author_box_author_about}>{author.about}</p>
                <div className={styles.author_text_box_social_icons_container}>
                    <a href={author.linkedin_url} target="_blank" rel={"nofollow"}><LinkedInIcon style={{color:"#0077b5"}}/></a>
                    <a href={author.github_url} target="_blank" rel={"nofollow"}> <GitHubIcon/></a>
                    <a href={author.portfolio_url} target="_blank"> <AccountBoxIcon  style={{color:"#b72254"}}/></a>
                </div>
            </div>

        </div>
    )
        ;
}

export default AuthorBox;