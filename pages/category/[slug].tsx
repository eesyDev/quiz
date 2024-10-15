import React, { useEffect, useState } from 'react';
import { Layout, QuestionCard } from '@/components';
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
	// const currentLocale = (locale === 'ru' || locale === 'en') ? locale : 'ru';
	const { slug, level } = query;
	console.log(data)
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
		// useEffect(() => {
		// 	if (selectedLevel) {
		// 	  const fetchQuestions = async () => {
		// 		try {
		// 		  const res = await axios.get(`${BASE_URL}/api/${slug}`, { params: { level: selectedLevel }});
		// 		  setQuestions(res.data.questions || []); // Обновляем вопросы в состоянии
		// 		} catch (error) {
		// 		  console.error('Error fetching questions:', error);
		// 		}
		// 	  };
		// 	  fetchQuestions();
		// 	}
		//   }, [selectedLevel, slug]);
    
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
                        <div className="level" onClick={() => replace(`/category/${slug}`, undefined, { shallow: true })}>{t("all_levels")}</div>
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
					<h2 className="h2">{t("questions")}</h2>
					<div className="questions-wrapper flex gap-6 flex-wrap">
						{
							data?.allQuestions?.map((question, index) => {
								const questiontxt = question?.questionText?.[currentLocale][0].children[0].text || ''
							return <QuestionCard key={index} title={question.title[currentLocale]} level={question.level._type} text={questiontxt} answers={question.answers} />})
						}
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
