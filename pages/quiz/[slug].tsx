import React, { useState } from 'react';
import axios from 'axios';
import { Layout, QuestionCard } from '@/components';
import { BASE_URL } from '@/utils';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { title } from 'process';

const QuizDetail = ({ data }: { data: QuizData }) => {
    const { locale } = useRouter();
    const currentLocale = locale as 'ru' | 'en';
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const { quizData } = data
    const [answers, setAnswers] = useState({});

    // Функция для обновления ответа на вопрос
    const handleAnswerSelect = (_key: string, answer: string) => {
        setAnswers(prev => ({
            ...prev,
            [_key]: answer
        }));
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < quizData[0].questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
          alert('Quiz completed!');
        }
      };

      const currentQuestion = quizData[0].questions[currentQuestionIndex];
      console.log(currentQuestion)
  return (
    <Layout>
        <div className="container container-sm">
            <h2 className="typo-h2">{quizData[0].title[currentLocale]}</h2>
            <div className="quiz-questions-wrapper grid-cols-1 grid gap-6 mt-8">
            {/* {quizData && quizData[0].questions.length && quizData[0].questions.map((q, i) => (
                <QuestionCard
                    _id={q['_id']}
                    title={q?.title && q?.title}
                    level={1}
                    locale={currentLocale}
                    questionText={q?.questionText}
                    answers={q?.answers || []}
                    onAnswerSelect={handleAnswerSelect}
                />
            ))} */}

        <QuestionCard
        _id={currentQuestion['_id']}
        title={currentQuestion.title}
        questionText={currentQuestion.questionText}
        answers={currentQuestion.answers}
        level={1}
        locale={currentLocale}
        onAnswerSelect={handleAnswerSelect}
      />
      
      <button onClick={handleNextQuestion} className='btn btn--filled'>
        {currentQuestionIndex < quizData[0].questions.length - 1 ? 'Следующий вопрос' : 'Завершить'}
      </button>
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