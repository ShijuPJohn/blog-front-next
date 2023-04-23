'use client';
import React, {useEffect} from 'react';

function Page({params}) {
    useEffect(() => {
        console.log(params.pid)
    }, [])
    return (
        <div></div>
    );
}

export default Page;