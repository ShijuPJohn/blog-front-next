'use client';
import '@wangeditor/editor/dist/css/style.css';

import styles from './page.module.css';
import {i18nChangeLanguage} from '@wangeditor/editor';
import React, {useState, useEffect} from 'react';
import {Editor, Toolbar} from '@wangeditor/editor-for-react';
import {IDomEditor, IEditorConfig, IToolbarConfig} from '@wangeditor/editor';

function WEditor({initialHTML, updateHTMLFn}) {
    const [editor, setEditor] = useState(null);
    const [html, setHtml] = useState(initialHTML ? initialHTML : '');
    useEffect(() => {
        setTimeout(() => {
            setHtml('<p>hello&nbsp;world</p>')
        }, 1500);
    }, []);
    const toolbarConfig = {};
    const editorConfig = {
        placeholder: 'Type here...',
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
        height: '500px',
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