import './globals.css'
import {Inter, Roboto} from 'next/font/google';
import Header from './header/header'
import ComponentsWrapper from "@/app/ComponentsWrapper";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

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

export default function RootLayout({children}) {
    return (
        <html lang="en" className={`${inter.variable} ${roboto.variable}`}>
        <head>
            <title>My Blog</title>

        </head>
        <body>
        <ComponentsWrapper>
            {children}
        </ComponentsWrapper>
        </body>
        </html>

    )
}
