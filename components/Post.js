import React from 'react'
import Link from 'next/link'

const Post = ({ posts }) => {
    return (
        <>
            {posts.map((post, index) => (

                <div key={index} className="max-w-sm 2xl:w-1/4 xl:w-1/3 lg:w-1/3 md:w-1/3 sm:w-1/2 w-full h-80  m-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <Link href={`/blog/${post.slug}`}>
                        <div className='m-2 flex items-center justify-center '><img className="rounded-lg h-32 max-h-32" src={post.frontmatter.cover_image} alt="" /></div>
                    </Link>
                    <div className="p-5">
                        <Link href={`/blog/${post.slug}`}>
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white max-h-8 truncate">{post.frontmatter.title}</h5>
                        </Link>
                        <p className="mb-2 font-normal text-gray-500 dark:text-gray-400 max-h-12 overflow-clip">{post.frontmatter.excerpt}</p>
                        <Link href={`/blog/${post.slug}`} className=" inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Read more
                            <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </Link>
                    </div>
                </div>

            ))}
        </>
    )
}

export default Post
