'use client';
import React, {useEffect} from 'react';
import styles from './posts/[slug]/page.module.css'
import parse from "html-react-parser";
import Prism from "prismjs";
import 'prismjs/themes/prism-okaidia.css'
import 'prismjs/components/prism-jsx.js'
import 'prismjs/plugins/line-numbers/prism-line-numbers.js'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
import 'prismjs/components/prism-python.min.js'

function ContentBody({content}) {
    useEffect(() => {
        Prism.highlightAll();
    }, []);
    return (
        <>
            <div className={styles.post_descr}>{parse(content)}</div>
            {/*<div className={styles.post_descr} dangerouslySetInnerHTML={{ __html:content }} />*/}

        </>);
}

export default ContentBody;