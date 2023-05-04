'use client';
import React, {useEffect} from 'react';
import styles from './posts/[slug]/page.module.css'
import parse from "html-react-parser";
import Prism from "prismjs";
import './prism.css'
import ReactMarkdown from "react-markdown";

function ContentBody({content}) {
    useEffect(() => {
        Prism.highlightAll();
    }, []);
    return (
        <>
            <div className={styles.post_descr}>{parse(content)}</div>

        </>);
}

export default ContentBody;