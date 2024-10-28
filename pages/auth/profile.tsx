import React from 'react';
import Layout from '../../components/Layout';
import QuizCard from '../../components/QuizCard';
import QuestionCard from '../../components/QuestionCard';
import { useSession, getSession } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import { selectAnswer, nextQuestion } from '@/redux/slices/quizAnswersSlice';
import { client } from '@/utils/client';
import { userQuery } from '@/utils/queries';
import { useRouter } from 'next/router';
import { Session } from "next-auth";
import { GetServerSidePropsContext } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Github, AlertCircle } from "lucide-react";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";


const Profile = ({ userData }: { userData: IUserExt }) => {
	const { locale } = useRouter();
	const currentLocale = locale as 'ru' | 'en';
	const { data: session, status } = useSession();
	const dispatch = useDispatch();

    const handleAnswerSelect = (key: string, answer: string) => {
        dispatch(selectAnswer({ key, answer }));
    };
    
    const handleNextQuestion = () => {
        dispatch(nextQuestion());
    };

	if (status === 'loading') {
		return <div>Загрузка...</div>;
	}

	if (!session) {
		return <div>Пожалуйста, войдите в систему, чтобы просмотреть профиль.</div>;
	}
	

	// Данные пользователя из Sanity
	const { userName, email, image, quizzes, questions } = userData;
	console.log(userData)
	return (
		<Layout>
			<div className="container py-10">
				<div className="profile-inner bg-white-main rounded-lg pt-16 pb-8 px-8">
				<div className='profile-info'>
					<img src={image} alt={userName} style={{ borderRadius: '50%', width: '150px' }} />
					<h1 className="text-3xl font-bold  mt-8">Settings {userName}</h1>
					<p className="text-muted-foreground mt-2">
						Manage your account settings and preferences.
					</p>
				</div>
				<Tabs className="space-y-6 mt-16" defaultValue="quizes">
					<TabsList>
						<TabsTrigger value="quizes">Мои Квизы</TabsTrigger>
						<TabsTrigger value="questions">Мои Вопросы</TabsTrigger>
						<TabsTrigger value="selfdata">My Info</TabsTrigger>
					</TabsList>
					<TabsContent value="quizes" className="space-y-6">
					<div className="quiz-wrapper grid-cols-1 grid xl:grid-cols-4 gap-6 md:grid-cols-3 mt-8">
					{quizzes.length > 0 ? (
						quizzes.map((quiz) => (
							<QuizCard
								key={quiz._id}
								title={quiz.title}
								icon={quiz.icon}
								slug={quiz.slug.current}
								questions={quiz.questions}
							/>
						))
					) : (
						<p>У вас пока нет квизов.</p>
					)}
					</div>
				</TabsContent>
				<TabsContent value="questions" className="space-y-6">
				<div className="questions-wrapper grid-cols-1 grid xl:grid-cols-2 gap-6 mt-8">
				{questions.length > 0 ? (
						questions.map((question) => (
							<QuestionCard
								key={question._id}
								title={question.title}
								_id={question._id}
								level={question.level}
								locale={currentLocale}
								questionText={question.questionText}
								answers={question.answers}
								onAnswerSelect={handleAnswerSelect}
								isAuthor={true}
							/>
							// <div key={question._id}>
							// 	<p>{question.questionText?.[currentLocale]?.[0]?.children?.[0]?.text}</p>
							// </div>
						))
					) : (
						<p>У вас пока нет вопросов.</p>
					)}
					</div>
				</TabsContent>
				<TabsContent value="selfdata" className="space-y-6"></TabsContent>
				</Tabs>
				</div>


			</div>
		</Layout>
	);
};

export default Profile;

export async function getServerSideProps(context: GetServerSidePropsContext) {
	// Получаем сессию пользователя
	const session = await getSession(context);

	if (!session) {
		return {
			redirect: {
				destination: '/api/auth/signin',
				permanent: false,
			},
		};
	}

	// Получаем ID пользователя из сессии
	const userId = (session as Session)?.user?.email?.replace(/[^a-zA-Z0-9_]/g, "") ?? '';

	// Запрашиваем все данные пользователя из Sanity, включая квизы и вопросы

	const userQ = userQuery(userId)
	const userData = await client.fetch(userQ);

	// Передаем данные в компонент через props
	return {
		props: {
			userData,
		},
	};
}
