import createImageUrlBuilder from '@sanity/image-url'
import { createClient, createCurrentUserHook } from 'next-sanity'
export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT,
  apiVersion: '2021-03-25',
  useCdn: process.env.NODE_ENV === 'production',
}
export const sanityClient = createClient(config)
export const urlFor = (source) =>
  createImageUrlBuilder(sanityClient).image(source)
export const useCurrentUser = createCurrentUserHook(config)
