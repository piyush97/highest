import { GetStaticProps } from 'next'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import PortableText from 'react-portable-text'
import Header from '../../components/Header'
import { sanityClient, urlFor } from '../../sanity'
import { Post } from '../../typings'

interface Props {
  post: Post
}

interface IFormInput {
  _id: string
  name: string
  email: string
  comment: string
}

const Post = ({ post }: Props) => {
  const [submitted, setSubmitted] = React.useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>()
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await fetch('/api/createComment', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((data) => {
        console.log(data)
        setSubmitted(true)
      })
      .catch((err) => {
        console.error(err)
        setSubmitted(false)
      })
  }
  return (
    <main className="mx-auto max-w-7xl">
      <Header />
      <img
        className="object-cover w-full h-40"
        src={urlFor(post.mainImage).url()}
        alt={post.title}
      />
      <article>
        <h1 className="mt-10 mb-3 text-3xl">{post.title}</h1>
        <h2 className="mb-2 text-xl font-light text-gray-500">
          {post.description}
        </h2>
        <div className="flex items-center space-x-2">
          <img
            className="w-10 h-10 rounded-full"
            src={urlFor(post.author.image).url()!}
            alt={post.author.name}
          />
          <p className="text-sm text-gray-500 font-extralight">
            Blog post by{' '}
            <span className="text-green-600">{post.author.name}</span> -
            Published at {new Date(post._createdAt).toLocaleString()}
          </p>
        </div>
        <div className="max-w-sm mx-auto mt-10 text-justify sm:max-w-sm md:max-w-sm lg:max-w-6xl ">
          <PortableText
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT!}
            content={post.body}
            serializers={{
              h1: (props: any) => (
                <h1 {...props} className="my-5 text-2xl font-bold" />
              ),
              h2: (props: any) => (
                <h2 {...props} className="my-5 text-xl font-bold" />
              ),
              li: (children: any) => (
                <li className="my-5 text-lg font-bold">{children}</li>
              ),
              link: ({ href, children }: any) => (
                <a href={href} className="text-blue-500 hover:underline">
                  {children}
                </a>
              ),
            }}
          />
        </div>
      </article>
      <hr className="max-w-lg mx-auto my-5 border border-yellow-500" />
      {submitted ? (
        <div className="flex flex-col max-w-2xl py-10 mx-auto my-10 text-white bg-yellow-500">
          <h3>Thank you for submitting your comment! </h3>
          <p>Once it has been approved, it will appear below!</p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col max-w-2xl p-5 mx-auto mb-10"
        >
          <h3 className="text-sm text-yellow-500">Enjoyed this article?</h3>
          <h3 className="text-3xl font-bold">Leave a comment below</h3>
          <hr className="py-3 mt-2" />
          <input {...register('_id')} type="hidden" value={post._id} />

          <label className="block mb-5 ">
            <span className="text-gray-700 ">Name</span>
            <input
              {...register('name', { required: true })}
              className="block w-full px-3 py-2 mt-1 border rounded shadow outline-none form-input ring-yellow-500 focus:ring"
              type="text"
              placeholder="Piyush Mehta"
            />
          </label>
          <label className="block mb-5 ">
            <span className="text-gray-700 ">Email</span>
            <input
              {...register('email', { required: true })}
              className="block w-full px-3 py-2 mt-1 border rounded shadow outline-none form-input ring-yellow-500 focus:ring"
              type="email"
              placeholder="me@piyushmehta.com"
            />
          </label>
          <label className="block mb-5 ">
            <span className="text-gray-700 ">Comment</span>
            <textarea
              {...register('comment', { required: true })}
              className="block w-full px-3 py-2 mt-1 border rounded shadow outline-none form-input ring-yellow-500 focus:ring"
              rows={8}
              placeholder="This is awesome! 🔥"
            />
          </label>
          <div>
            <div className="flex flex-col p-5">
              {errors.name && (
                <span className="text-red-500">
                  {' '}
                  The name Field is required
                </span>
              )}
              {errors.comment && (
                <span className="text-red-500">
                  {' '}
                  The comment Field is required
                </span>
              )}
              {errors.email && (
                <span className="text-red-500">
                  {' '}
                  The email Field is required
                </span>
              )}
            </div>
            <input
              type="submit"
              className="px-4 py-2 font-bold text-white bg-yellow-500 rounded shadow cursor-pointer focus:shadow-outline hover:bg-yellow-400 focus:outline-none"
            />
          </div>
        </form>
      )}
      {/* Comments */}

      <div className="flex flex-col max-w-2xl p-10 mx-auto my-10 space-y-2 shadow shadow-yellow-500">
        <h3 className="text-4xl">Comments</h3>
        <hr className="pb-2" />

        {post.comments.map((comment) => (
          <div key={comment._id}>
            <p>
              <span className="text-yellow-500">{comment.name}: </span>{' '}
              {comment.comment}
            </p>
          </div>
        ))}
      </div>
    </main>
  )
}

export default Post

export const getStaticPaths = async () => {
  const query = `*[_type == "post"]{
            _id,
            slug {
                current
            }
    }`

  const posts = await sanityClient.fetch(query)
  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }))
  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0]{
            _id,
            title,
            createdAt,
            author-> {
                name,
                image
            },
            'comments': *[
              _type == "comment" &&
              post._ref == ^._id &&
              approved == true],
            description,
            mainImage,
            slug,
            body

        }`

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  })
  if (!post) {
    return { notFound: true }
  }
  return {
    props: { post },
    revalidate: 60,
  }
}
