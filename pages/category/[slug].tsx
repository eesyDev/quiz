"use client";
import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import QuizCard from '../../components/QuizCard'
import axios from 'axios';
import { BASE_URL } from '../../utils';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectCategories, fetchCategories } from '../../redux/slices/categoriesSlice';

const CategoryItem = ({ data }: { data: CategoryPropsData }) => {
    const { t } = useTranslation('common');
    const [selectedLevel, setSelectedLevel] = useState<string | null>(null); 
    const [quizData, setQuizData] = useState<any[]>(data?.quizData || []);
    const [loading, setLoading] = useState(false); 
    const { locale, query, replace } = useRouter();
    const currentLocale = locale as 'ru' | 'en';
    const { slug } = query;
    const categories: Category[] = useSelector(selectCategories);
    const currentCategory = categories.find(category => category.slug.current === slug);

    console.log(data.quizData)

    useEffect(() => {
        const fetchQuestionsAndQuiz = async () => {
            setLoading(true);  
            try {
                const res = selectedLevel
                    ? await axios.get(`${BASE_URL}/api/${slug}`, { params: { level: selectedLevel } })
                    : await axios.get(`${BASE_URL}/api/${slug}`); 

                setQuizData(res.data.quizData || []); 
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false); 
            }
        };

        fetchQuestionsAndQuiz();
    }, [selectedLevel, slug]);

    return (
        <Layout>
            <div className='category'>
                <div className="container">
                    <h4 className="typo-h2 my-4">{currentCategory && currentCategory?.title}</h4>
                    <div className="category-level-filter flex gap-4 py-4">
                        
                        <div
                            className="level"
                            onClick={() => {
                                setSelectedLevel(null); 
                                replace(`/category/${slug}`, undefined, { shallow: true }); 
                            }}
                        >
                            {t("all_levels")}
                        </div>
                        {data?.levels?.map((level, index) => (
                            <div
                                key={index}
                                className={`level ${selectedLevel === level["_id"] ? 'selected' : ''}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setSelectedLevel(level["_id"]); 
                                    replace(`/category/${slug}?level=${level.slug.current}`, undefined, { shallow: true });
                                }}
                            >
                                {level.title[currentLocale]}
                            </div>
                        ))}
                    </div>

                    {loading ? (
                        <p>{t("loading")}</p>  
                    ) : quizData.length === 0 ? (
                        <p>{t("no_quizzes_found")}</p> 
                    ) : (
                        <div className="quiz-wrapper grid-cols-1 grid xl:grid-cols-4 gap-6 md:grid-cols-3 mt-8">
                            {quizData.map((quiz, index) => (
                                <QuizCard
                                    title={quiz.title}
                                    icon={quiz.icon}
                                    questions={quiz.questions}
                                    slug={quiz.slug.current}
                                    key={index}
                                />
                            ))}
                        </div>
                    )}
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
                data: res.data,
            },
        };
    } catch (error) {
        console.error(error);
        return {
            props: {
                data: [],
                error: 'Failed to fetch data',
            },
        };
    }
};

export default CategoryItem;
