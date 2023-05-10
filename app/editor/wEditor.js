'use client';
import '@wangeditor/editor/dist/css/style.css';
import {i18nChangeLanguage} from '@wangeditor/editor';
import React, {useEffect, useState} from 'react';
import {Editor, Toolbar} from '@wangeditor/editor-for-react';
import {useSelector} from "react-redux";
import axios from "axios";
import {enqueueSnackbar} from "notistack";
import {fetchURL} from "@/app/constants";

function WEditor({initialHTML, updateHTMLFn}) {
    const userLogin = useSelector(state => state.user.user);
    const {loading, userInfo} = userLogin
    const [editor, setEditor] = useState(null);
    const [html, setHtml] = useState(initialHTML ? initialHTML : '');
    // useEffect(() => {
    //     setTimeout(() => {
    //         setHtml('<p>hello&nbsp;world</p>')
    //     }, 1500);
    // }, []);
    const toolbarConfig = {};
    const editorConfig = {
        placeholder: 'Type here...',
        MENU_CONF: {
            uploadImage: {
                async customUpload(file, insertFn) {
                    const url = `${fetchURL}/post/image-upload`;
                    const formData = new FormData();
                    formData.append('file', file);
                    formData.append('fileName', file.name);
                    const config = {
                        headers: {
                            'content-type': 'multipart/form-data',
                            'Authorization': 'Bearer ' + userInfo.token
                        },
                    };
                    const response = await axios.post(url, formData, config)

                    if (response.status === 201) {
                        console.log(response)
                        insertFn(response.data.url)
                        enqueueSnackbar("Image uploaded", {variant: "success"})
                    } else {
                        enqueueSnackbar("Image upload failed. Try again", {variant: "error"})
                    }
                    // `file` is your selected file

                    // upload images yourself, and get image's url, alt, href

                    // insert image

                },
                // max size of one file
                maxFileSize: 5 * 1024 * 1024, // 1M

                // max length of uploaded files
                maxNumberOfFiles: 10,

                // file types, default `['image/*']`. If unwanted, you can set []
                allowedFileTypes: ['image/*'],


                // Embed meta in url, not in formData. Default is false
                metaWithUrl: false,

            }
        }
    };
    useEffect(() => {
        updateHTMLFn(html)
    }, [html])
    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy();
            setEditor(null);
        }
    }, [editor]);
    i18nChangeLanguage('en');
    const editorStyle = {
        height: '650px',
        overflowY: 'hidden',
        scrollY: true,
        fontSize: '1rem'
    }

    return (
        <>
            <div style={{border: '1px solid #ccc', zIndex: 100}}>
                <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    mode="default"
                    style={{borderBottom: '1px solid #ccc'}}
                />
                <Editor
                    defaultConfig={editorConfig}
                    value={html}
                    onCreated={setEditor}
                    onChange={editor => setHtml(editor.getHtml())}
                    mode="default"
                    style={editorStyle}
                />
            </div>
        </>
    );
}

export default WEditor;