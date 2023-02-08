import React from 'react'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
import Head from 'next/head'
export default function about({ about }) {

  return (
    <>
      <Head>
        <title>About</title>
      </Head>
      <style>
        {`
                .content a{
                    color: #2563EB;
                }
                .content .dark a{
                  color: #0EA5E9;
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

          `}
      </style>
      <div claassName=''>
        <h1 className="my-4 flex items-center text-5xl font-extrabold dark:text-white">About</h1>
        {/* <p className=" text-gray-500 dark:text-gray-400">Blogging about the life of a software engineer and code stuff</p> */}
      </div>
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      <div className='content xl:flex justify-center dark:text-white'>
        <div className='flex items-center flex-col xl:w-80 w-full p-4 '>
          <img src={about[0].frontmatter.cover_image} className='rounded-full h-48 w-48 ' />
          <p className='my-4 text-2xl font-extrabold dark:text-white font-sans'>Abderraouf Bouarrata</p>
        </div>
        <div className='flex flex-col justify-center  p-4 xl:w-2/4 w-full font-sans font-medium text-lg text-gray-800 dark:text-gray-400' dangerouslySetInnerHTML={{ __html: marked(about[0].content) }}></div>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const files = fs.readdirSync(path.join('about'))

  const about = files.map((about) => {
    const slug = about.replace('.md', '')
    // Get frontmatter from markdown
    const markdownWithMeta = fs.readFileSync(path.join('about', about), 'utf-8')
    //const frontmatter = matter(markdownWithMeta).data
    const { data: frontmatter, content } = matter(markdownWithMeta)
    return {
      frontmatter,
      content,
    }
  })
  // Create slug

  return {
    props: {
      about: about,
    },
  }

}