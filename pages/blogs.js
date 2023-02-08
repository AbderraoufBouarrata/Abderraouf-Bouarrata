import { useEffect, useRef, useState } from 'react'
import Post from '../components/Post'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Head from 'next/head'
const blogs = ({ posts }) => {
  const [shownPosts, setShownPosts] = useState(posts)
  const searchRef = useRef(null)
  const sortRef = useRef(null)

  function search(arg) {
    setShownPosts(arg.filter(post => post.frontmatter.title.toLowerCase().includes(searchRef.current.value.toLowerCase())))
    console.log(posts)
  }

  function sort(arg) {
    //the problem here is that the sorted object === non sorted object hence the useState not working 
    switch (sortRef.current.value) {
      case 'name':
        setShownPosts(arg.sort((a, b) => a.frontmatter.title.localeCompare(b.frontmatter.title)))
        break;
      case 'date':
        setShownPosts(arg.sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)))
        break;
    }
  }
  return (
    <>
      <Head>
        <title>Blogs</title>
      </Head>
      <div>
        <h1 className="my-4 flex items-center text-5xl font-extrabold dark:text-white">Blogs</h1>
        <form>
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input ref={searchRef} type="search" id="default-search" className="block lg:w-3/4 w-full  p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
            <button onClick={(e) => { e.preventDefault(); search(posts) }} type="submit" className="text-white absolute md:right-2.5 right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
          </div>
        </form>
      </div>
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      {/*Now the blogs*/}
      <div className=' flex justify-end '>
        <select onChange={() => sort(posts)} ref={sortRef} id="countries" className="w-1/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option >Sort by...</option>
          {/* <option value="date">Date</option> */}
          <option value="name">Name</option>
        </select>
      </div>
        <div className='flex flex-wrap items-center justify-center '>
          <Post posts={shownPosts} />
      </div>
    </>
  )
}
export default blogs

export async function getStaticProps() {
  // Get file names from the posts dir
  const files = fs.readdirSync(path.join('posts'))

  // Get slug and frontmatter from posts
  const posts = files.map((filename) => {
    // Create slug
    const slug = filename.replace('.md', '')
    // Get frontmatter from markdown
    const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8')
    //const frontmatter = matter(markdownWithMeta).data
    const { data: frontmatter } = matter(markdownWithMeta)
    return {
      slug,
      frontmatter,
    }
  })

  return {
    props: {
      posts: posts,
    },
  }
}
