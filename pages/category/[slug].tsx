import React, { useEffect, useState } from 'react';
import { Layout } from '@/components';
import axios from 'axios';
import { BASE_URL } from '@/utils';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Link from 'next/link';


const CategoryItem = ({ data }: { data: CategoryPropsData }) => {
    const { t } = useTranslation('common');
	const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
	const [questions, setQuestions] = useState<any[]>(data.allQuestions || []);
    const { locale, query, replace, push } = useRouter();
    const currentLocale = locale as 'ru' | 'en';
	const { slug, level } = query;

	useEffect(() => {
		if (level && typeof level === 'string') {
		  setSelectedLevel(level);
		}
	  }, [level]);

	  const handleLevelClick = (levelSlug: string, e: React.MouseEvent) => {
		e.preventDefault();
		setSelectedLevel(levelSlug); 
		replace(`/category/${slug}?level=${levelSlug}`, undefined, { shallow: true });
	  };


	    // Обновление данных при изменении выбранного уровня
		useEffect(() => {
			if (selectedLevel) {
			  // Выполняем запрос к API при изменении уровня
			  const fetchQuestions = async () => {
				try {
				  const res = await axios.get(`${BASE_URL}/api/${slug}`, { params: { level: selectedLevel } });
				  setQuestions(res.data.questions || []); // Обновляем вопросы в состоянии
				} catch (error) {
				  console.error('Error fetching questions:', error);
				}
			  };
			  fetchQuestions();
			}
		  }, [selectedLevel, slug]);
    
    if (!data) {
        return (
            <Layout>
                <div className='category'>
                    <div className="container">
                        <p>{t('no_data')}</p>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className='category'>
                <div className="container">
                    <div className="category-level-filter flex gap-4 py-4">
                        <div className="level">{t("all_levels")}</div>
                        {data?.levels?.map((level, index) => (
                            <div
							key={index}
							className={`level ${selectedLevel === level.slug.current ? 'selected' : ''}`}
							onClick={(e) => handleLevelClick(level.slug.current, e)}
						  >
                                {level.title[currentLocale]}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export const getServerSideProps = async ({ params: { slug, level } }: { params: { slug: string, level: string } }) => {
    try {
        const res = await axios.get(`${BASE_URL}/api/${slug}`, {params: { level: level || null }});
        return {
            props: {
                data: res.data, // Передача данных через props
            },
        };
    } catch (error) {
        console.error(error);
        return {
            props: {
                data: [], // Передача пустого массива в случае ошибки
                error: 'Failed to fetch data',
            },
        };
    }
};

export default CategoryItem;
