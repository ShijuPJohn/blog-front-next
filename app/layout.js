import './globals.css'
import {Inter, Roboto} from 'next/font/google';
import ComponentsWrapper from "@/app/ComponentsWrapper";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import "nprogress/nprogress.css";
import dynamic from "next/dynamic";

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
})
const roboto = Roboto({
    weight: ['100', '300', '400', '500', '700', '900'],
    variable: '--font-roboto',
    subsets: ['latin'],
    display: 'swap'
})
const TopProgressBar = dynamic(
    () => {
        return import("./topProgressBar");
    },
    { ssr: false },
);

export default function RootLayout({children}) {
    return (
        <html lang="en" className={`${inter.variable} ${roboto.variable}`}>
        {/*<head>*/}
        {/*</head>*/}
        <body>
        <TopProgressBar />
        <ComponentsWrapper>
            {children}
        </ComponentsWrapper>
        </body>
        </html>

    )
}
