import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import Hero from '../components/Hero'
import { sanityClient, urlFor } from '../sanity'
import { Post } from '../typings'
interface Props {
  posts: Post[]
}

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <div className="mx-auto max-w-7xl">
      <Head>
        <title>Highest</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Hero />
      <div className="grid grid-cols-1 gap-3 p-2 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:p-6">
        {/* Posts */}
        {posts.map((post) => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div className="overflow-hidden border rounded-lg cursor-pointer group">
              {/* Image */}
              <img
                src={urlFor(post.mainImage).url()}
                alt={post.title}
                className="transition-transform duration-200 ease-in-out bg-white group-hover:scale-105"
              />
              <div className="flex justify-between p-5 transition-transform duration-200 ease-in-out group-hover:scale-105">
                <div>
                  <p className="text-lg font-bold">{post.title}</p>
                  <p className="text-xs">
                    {post.description} by {post.author.name}
                  </p>
                </div>
                <img
                  className="w-12 h-12 rounded-full"
                  src={urlFor(post.author.image).url()!}
                  alt={post.author.name}
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
          _id,
        title,
        author-> {
          name,
          image},
        description,
        mainImage,
        slug
        }
`

  const posts = await sanityClient.fetch(query)

  return {
    props: { posts },
  }
}
