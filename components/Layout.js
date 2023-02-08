import Nav from './Nav'
import Meta from './Meta'
import Footer from './Footer'

import { useEffect, useState } from 'react'


const Layout = ({ children }) => {
    const [theme, setTheme] = useState()
    useEffect(() => {
        if (!localStorage.getItem('theme')) { localStorage.setItem('theme', 'light'); }
        setTheme(localStorage.getItem('theme'))
    }, [])

    useEffect(() => {
        if (!theme) return;
        if (theme === 'dark') {
            document.body.classList.add('bg-zinc-900')
        } else {
            document.body.classList.remove('bg-zinc-900')
        }
        localStorage.setItem('theme', theme)
    }, [theme])

    return (
        <>

            <Meta />
            <div className={` ${theme === 'dark' || undefined ? 'dark' : ''} transition-all ease-in duration-500  `}>
                <style>
                    {`
                    .layout {
                        min-height: 100vh;
                        min-height: 100dvh;
                        display: grid;
                        grid-template-rows: auto 1fr auto;
                        grid-template-columns: 100%;
                         
                    }
                `}
                </style>
                <div className='xl:mx-80  lg:mx-50 md:mx-32 sm:mx-4 mx-4 layout'>
                    <Nav theme={theme} setTheme={setTheme} />
                    <main >{children}</main>
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default Layout
