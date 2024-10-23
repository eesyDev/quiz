import {createClient} from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'a6b56tmf',
  dataset: 'production',
  apiVersion: '2024-09-16',
  useCdn: false,
  token: 'sk4Sb4LlCvLBZE0GTX8wChdEQ5JjqmqlBgYvtdyroRIIJchn6T8SHKAAUTzNGJ4sHPWhHwHve5BzLfj8eRVUThQvIFQdhoP63D62NDnybZ48uKhknMzeezHxhAXG9qQyEvIzlJ7qoq9RvtC3mhLpo0Wx5rDj4nKKkkLXyv2IDtQmQVszzwEn',
});

const builder = imageUrlBuilder(client);

export const urlFor = (source : object) => builder.image(source)