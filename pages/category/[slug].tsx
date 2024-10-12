import React from 'react';
import { Layout } from '@/components';
import axios from 'axios';
import { BASE_URL } from '@/utils';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

const CategoryItem = ({ data }: { data: LevelDataProps[] }) => {
	const { t } = useTranslation('common');
	const { locale } = useRouter();
	const currentLocale = locale as 'ru' | 'en';
	
	console.log(locale)

	console.log(data)
	return (
		<Layout>
			<div className='category'>
				<div className="container">
					<div className="category-level-filter flex gap-4 py-4 ">
						<div className="level">{t("all_levels")}</div>
						{
							data.map(cat => <div className='level'>{cat.title[currentLocale]}</div>)
						}
					</div>
				</div>
			</div>
		</Layout>
	)
}

export const getServerSideProps = async ({ params: { slug } }: { params: { slug: string } }) => {
	try {
		const res = await axios.get(`${BASE_URL}/api/${slug}`);
		const data = res.data
		return {
			props: { data },
		};
	} catch (error) {
		console.log(error)
		return {
			props: {
				error: 'Failed to fetch data',
			},
		};
	}
}

export default CategoryItem