import './globals.css'
import {Inter, Roboto} from 'next/font/google';
import Link from "next/link";
import Header from './header'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
})
const roboto = Roboto({
    weight: ['100', '300','400','500', '700','900'],
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
        <Header/>
        {children}
        </body>
        </html>
    )
}
