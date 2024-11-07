import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout'
import { client } from '@/utils/client';
import { allQuestions } from '@/utils/queries';
import { GetServerSidePropsContext } from "next";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import QuestionCard from '../../components/QuestionCard';
import { useDispatch } from 'react-redux';
import { selectAnswer } from '@/redux/slices/quizAnswersSlice';

const QuestionsLibrary = ({ data }: { data: QuestionProps[] }) => {
	console.log(data)
	const { locale } = useRouter();
	const dispatch = useDispatch();
	const currentLocale = locale as 'ru' | 'en';
	const { t } = useTranslation('common');
	const handleAnswerSelect = (key: string, answer: string) => {
        dispatch(selectAnswer({ key, answer }));
    };
	return (
		<Layout>
			<div className="container">
				<h2 className="typo-h2 mt-8">{t("all_questions")}</h2>
				<div className="questions-wrapper grid-cols-1 grid xl:grid-cols-3 gap-6 mt-8">
					{
						data.map((q, i) => (
							<QuestionCard
								key={i}
								_id={q._id}
								title={q.title}
								level={q.level}
								locale={currentLocale}
								answers={q.answers}
								questionText={q.questionText}
								onAnswerSelect={handleAnswerSelect}
								isAuthor={false}
								isQuizStarted={false}
							/>
						))
					}
				</div>
			</div>
		</Layout>
	)
}

export default QuestionsLibrary;

export const getStaticProps = async (context: GetServerSidePropsContext) => {
	const locale = context.locale || 'ru';
	try {
		const data = await client.fetch(allQuestions());

		return {
			props: {
				data,
				...(await serverSideTranslations(locale, ['common'])),
			}
		}
	} catch (err) {
		console.error(err)
		return {
			props: {
				data: [],
				error: 'Failed to fetch data',
			}
		}
	}
}