import React, { useState, useEffect } from 'react';
import { selectCategories, fetchCategories } from '@/redux/slices/categoriesSlice';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/utils/client';
import { AppDispatch } from '@/redux/store';
import { RootState } from '@/redux/rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import { Layout } from '@/components';
import { useTranslation } from 'next-i18next';

const all = () => {
  const categories = useSelector(selectCategories);
	const dispatch = useDispatch<AppDispatch>();
	const { t } = useTranslation('common')

  useEffect(() => {
    dispatch(fetchCategories());
}, [dispatch]);
  return (
    <Layout>
      <div className="container">
	  <h4 className="typo-h2 my-4">{t("all_categories")}</h4>
        <div className="categories-wrapper">
        {categories && (
			<ul className='categories web-grid-row-4 items-center flex-wrap'>
				{categories?.map((category : Category) => (
					<li key={category._id} className='category'>
						<Link href={`/category/${category?.slug?.current}`} className='gradient-border category-expanded flex gap-4'>
							<Image 
								src={urlFor(category?.logo).url()} 
								alt={category.title} 
								width={35} 
								height={35} 
								className="category-logo" 
							/>
							<h4 className='font-medium text-lg'>{category.title}</h4>
						</Link>
					</li>
				))}
			</ul>
		)}
        </div>
      </div>
    </Layout>
  )
}

export default all