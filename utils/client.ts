import {createClient} from '@sanity/client';

export const client = createClient({
  projectId: 'a6b56tmf',
  dataset: 'production',
  apiVersion: '2024-09-16',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});