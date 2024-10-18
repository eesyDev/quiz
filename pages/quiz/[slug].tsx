import React from 'react';
import axios from 'axios';
import { Layout, QuestionCard } from '@/components';
import { BASE_URL } from '@/utils';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { title } from 'process';

const QuizDetail = ({ data }: { data: QuizData }) => {
    const { locale } = useRouter();
    const currentLocale = locale as 'ru' | 'en';
    const { quizData } = data
    console.log(quizData[0]?.questions)
  return (
    <Layout>
        <div className="container">
            <h2 className="typo-h2">{quizData[0].title[currentLocale]}</h2>
            <div className="quiz-questions-wrapper grid-cols-1 grid xl:grid-cols-3 gap-6 md:grid-cols-2 mt-8">
            {quizData && quizData[0].questions.length && quizData[0].questions.map((q, i) => (
                <QuestionCard
                    title={q.title[currentLocale]}
                    level={1}
                    locale={currentLocale}
                    text={q?.questionText?.[currentLocale][0].children[0].text ? q?.questionText?.[currentLocale][0].children[0].text : ''}
                    answers={q.answers && q?.answers}
                />
            ))}
            </div>
        </div>
    </Layout>
  )
}

export default QuizDetail;

export const getServerSideProps = async ({ params: { slug } }: { params: { slug: string } }) => {
    try {
        const res = await axios.get(`${BASE_URL}/api/quiz/${slug}`);
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