import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Head from 'next/head'

export default function PostPage({ frontmatter: { title, date, cover_image }, slug, content }) {
    const [showButton, setShowButton] = useState(false);
    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 100) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        });
    }, []);

    const handleClick = () => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    };
    return (
        <>
            <Head>
                <title>{slug}</title>
            </Head>
            <Link href={'/blogs'}>
                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    ⬅ Go back
                </button>
            </Link>
            <style>
                {`
                .content a{
                    color: blue;
                }
                .content a:hover{
                    text-decoration: underline;
                }
                h1{
                    font-size: 2rem;
                }
                h3{
                    font-size: 1.5rem;
                }
                code{
                    background-color: #f3f3f3;
                }
                pre{
                    padding: 1rem;
                    overflow-x: auto;
                    background-color: #f3f3f3;
                }
                .dark pre{
                    background-color: #2f2f2f;
                }
                .dark code{
                    background-color: #2f2f2f;
                }
                `}
            </style>
            <h1 className="mt-4 text-5xl font-extrabold dark:text-white">{title}</h1>
            <p className="mb-4 text-gray-500 dark:text-gray-400">Posted on: {date}</p>
            <img src={cover_image} alt='error: cant load image' className='dark:text-white' />

            <div dangerouslySetInnerHTML={{ __html: marked(content) }} className='content dark:text-white text-ellipsis' ></div>
            <br />
            <div className='flex items-center justify-center '>
                <button onClick={handleClick} className={`${showButton ? '' : 'hidden'} transition-all ease-in duration-500 m-8 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}>
                    Back to top ⬆
                </button>
            </div>
            
        </>
    )
}

export async function getStaticPaths() {
    const files = fs.readdirSync(path.join('posts'))
    const paths = files.map(filename => ({
        params: { slug: filename.replace('.md', '') }
    }))

    return {
        paths,
        fallback: false // if you try to access a page that doesn't exist, it will show a 404 page
    }
}

export async function getStaticProps({ params: { slug } }) {
    const markdownWithMeta = fs.readFileSync(path.join('posts', slug + '.md'), 'utf-8')
    const { data: frontmatter, content } = matter(markdownWithMeta)
    return {
        props: {
            frontmatter,
            slug,
            content,
        },
    }

}