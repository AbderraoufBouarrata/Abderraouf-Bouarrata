import Head from 'next/head'
import Link from 'next/link'
export default function Home({ posts }) {

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div claassName=''>
        <h1 className="my-4 flex items-center text-5xl font-extrabold dark:text-white">Welcome</h1>
        <p className=" text-gray-500 dark:text-gray-400">Blogging about the life of a software engineer and code stuff</p>
      </div>
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      {/* {} */}
      <div className="max-w-sm w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <Link href="/blogs">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Read my blogs</h5>
        </Link >
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here you can read blogs made by me about my findings in the programming world!</p>
        <Link href="/blogs" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Read more
          <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </Link >
      </div>


    </>
  )
}

