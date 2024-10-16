import React, { useEffect, useState } from 'react';
import { Layout } from '@/components';
import axios from 'axios';
import { BASE_URL } from '@/utils';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

const CategoryItem = ({ data }: { data: CategoryPropsData }) => {
    const { t } = useTranslation('common');
    const [selectedLevel, setSelectedLevel] = useState<string | null>(null);  // Фильтр по уровню
    const [quizData, setQuizData] = useState<any[]>(data.quizData || []);
    const [loading, setLoading] = useState(false);  // Для индикации загрузки
    const { locale, query, replace } = useRouter();
    const currentLocale = locale as 'ru' | 'en';
    const { slug } = query;

    useEffect(() => {
        const fetchQuestionsAndQuiz = async () => {
            setLoading(true);  // Начало загрузки
            try {
                const res = selectedLevel
                    ? await axios.get(`${BASE_URL}/api/${slug}`, { params: { level: selectedLevel } })  // С фильтром по уровню
                    : await axios.get(`${BASE_URL}/api/${slug}`);  // Без фильтрации по уровню

                setQuizData(res.data.quizData || []);  // Устанавливаем полученные данные
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);  // Завершение загрузки
            }
        };

        fetchQuestionsAndQuiz();
    }, [selectedLevel, slug]);

    return (
        <Layout>
            <div className='category'>
                <div className="container">
                    <div className="category-level-filter flex gap-4 py-4">
                        {/* Кнопка для загрузки всех уровней */}
                        <div
                            className="level"
                            onClick={() => {
                                setSelectedLevel(null);  // Сброс выбранного уровня
                                replace(`/category/${slug}`, undefined, { shallow: true });  // Обновляем URL без уровня
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
                                    setSelectedLevel(level["_id"]);  // Устанавливаем выбранный уровень
                                    replace(`/category/${slug}?level=${level.slug.current}`, undefined, { shallow: true });
                                }}
                            >
                                {level.title[currentLocale]}
                            </div>
                        ))}
                    </div>

                    {/* Отображение квизов */}
                    {loading ? (
                        <p>{t("loading")}</p>  // Индикация загрузки
                    ) : quizData.length === 0 ? (
                        <p>{t("no_quizzes_found")}</p>  // Если квизы не найдены
                    ) : (
                        <div className="quiz-wrapper flex flex-wrap gap-6">
                            {quizData.map((quiz, index) => (
                                <div className="quiz-card" key={index}>
                                    {quiz.title[currentLocale]}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default CategoryItem;
