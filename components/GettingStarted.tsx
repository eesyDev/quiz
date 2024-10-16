'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { client, urlFor } from '@/utils/client';
import { allCategoriesQuery } from '@/utils/queries';
import Link from 'next/link';
import { RootState } from '@/redux/rootReducer';
import { useTranslation } from 'next-i18next';
import { selectCategories, fetchCategories } from '@/redux/slices/categoriesSlice';
import { AppDispatch } from '@/redux/store';

const GettingStarted = () => {
	// const [categories, setCategories] = useState([]);
	const { t } = useTranslation('common');
	const categories = useSelector(selectCategories);
	const dispatch = useDispatch<AppDispatch>()

	// useEffect(() => {
	// 	client.fetch(allCategoriesQuery()).then(data => setCategories(data))
	// }, []);

	useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);
	const themeMode = useSelector((state: RootState) => state.theme.value);
	const srcImg = themeMode === 'dark' ? './icons/techs.svg' : './icons/tech-white.svg'

    return (
        <section className='relative mt-8'>
            <div className="container">
				<div className="hero-sec flex flex-col gap-4 border-t border-gray-10 py-20 dark:border-white-border">
					<h2 className="h2 max-w-[600px] text-4xl">Начни изучать актуальные технологии и стеки</h2>
					<p className='text-xl text-gray-100 max-w-[600px]'>Разрабатывай приложения на самых современных библиотеках или на чистом JS без использования библиотек и фреймворков</p>
				</div>
				<div className="techs-icons absolute max-w-[400px] top-8 right-[5rem]">
					{/* <Image src='' alt='' width={}/> */}

					<img src={srcImg} alt="techs" />
				</div>
				{categories && (
					<ul className='categories flex gap-4 items-center flex-wrap max-w-[600px] mb-8'>
						{categories?.map((category : Category) => (
							<li key={category._id} className='category'>
								<Link href={`/category/${category?.slug?.current}`} className='gradient-border category-link'>
									<Image 
										src={urlFor(category?.logo).url()} 
										alt={category.title} 
										width={35} 
										height={35} 
										className="category-logo" 
									/>
								</Link>
							</li>
						))}
					</ul>
				)}
				<Link href={'/category/all'} className="btn btn--secondary">{t("category_btn")}</Link>
            </div>
        </section>
    )
}

export default GettingStarted