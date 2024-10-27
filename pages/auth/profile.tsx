import React from 'react';
import Layout from '../../components/Layout';
import QuizCard from '../../components/QuizCard'
import { useSession, getSession } from 'next-auth/react';
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
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
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
				<div>
					<img src={image} alt={userName} style={{ borderRadius: '50%', width: '150px' }} />
					<h1 className="text-3xl font-bold">Settings {userName}</h1>
					<p className="text-muted-foreground">
						Manage your account settings and preferences.
					</p>
				</div>
				<Tabs defaultValue="overview" className="space-y-6">
					<TabsList>
						<TabsTrigger value="quizes">Мои Квизы</TabsTrigger>
						<TabsTrigger value="questions">Мои Вопросы</TabsTrigger>
						<TabsTrigger value="selfdata">My Info</TabsTrigger>
					</TabsList>
					<TabsContent value="quizes" className="space-y-6">
					{quizzes.length > 0 ? (
						quizzes.map((quiz) => (
							<QuizCard
								key={quiz._id}
								title={quiz.title[currentLocale]}
								icon={quiz.icon}
								slug={quiz.slug.current}
								questions={quiz.questions.length}
							/>
							// <div key={quiz._id}>
							// 	<h3>{quiz.title[currentLocale]}</h3>
							// 	<p>{quiz.description}</p>
							// </div>
						))
					) : (
						<p>У вас пока нет квизов.</p>
					)}
				</TabsContent>
				<TabsContent value="questions" className="space-y-6">
				{questions.length > 0 ? (
						questions.map((question) => (
							<div key={question._id}>
								<p>{question.questionText?.[currentLocale]?.[0]?.children?.[0]?.text}</p>
							</div>
						))
					) : (
						<p>У вас пока нет вопросов.</p>
					)}
				</TabsContent>
				<TabsContent value="selfdata" className="space-y-6"></TabsContent>
				</Tabs>


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
