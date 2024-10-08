import React from 'react';
import axios from 'axios';
import { BASE_URL } from '@/utils';

const CategoryItem = ({ data }: { data: LevelDataProps }) => {

  console.log(data)
  return (
    <div>CategoryItem</div>
  )
}

export const getServerSideProps = async ({ params : {slug} } : {params: {slug: string}}) => {
  try {
    console.log('Slug:', slug);
    const res = await axios.get(`${BASE_URL}/api/${slug}`);
    const data = res.data
    return {
      props: {data},
    };
  } catch (error) {
    console.log(error)
    return {
      props: {
        error: 'Failed to fetch data', // Передаем ошибку в компонент
      },
    };
  }
}

export default CategoryItem