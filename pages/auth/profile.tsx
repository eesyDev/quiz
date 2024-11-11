import React, { useTransition, useState, useEffect } from 'react';
import { Github, AlertCircle } from "lucide-react";
import Layout from '../../components/Layout';
import MentorDashboard from '@/components/MentorDashboard';
import StudentDashboard from '@/components/StudentDashboard';

import { useSession, getSession } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import { selectAnswer, nextQuestion } from '@/redux/slices/quizAnswersSlice';
import { client } from '../../utils/client';
import { userQuery } from '@/utils/queries';
import { useRouter } from 'next/router';
import { Session } from "next-auth";
import { useTranslation } from 'next-i18next';
import { GetServerSidePropsContext } from "next";


const Profile = ({ userData }: { userData: IUserExt }) => {
	const { locale } = useRouter();
	const currentLocale = locale as 'ru' | 'en';
	const { data: session, status } = useSession();
	const dispatch = useDispatch();
	const { t } = useTranslation('common');
    
    const handleNextQuestion = () => {
        dispatch(nextQuestion());
    };

	if (status === 'loading') {
		return <div>{t("loading")}</div>;
	}

	if (!session) {
		return <div>{t("please_log_in")}</div>;
	}
	const { userName, email, image, quizzes, questions, role } = userData;
	console.log(userData)
	return (
		<Layout>
			<div className="container py-10">
				{
					role === 'mentor' ? <MentorDashboard userData={userData}/> : <StudentDashboard/>
				}
			</div>
		</Layout>
	);
};

export default Profile;
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const session = await getSession(context);
	const locale = context.locale || 'ru';
	if (!session) {
		return {
			redirect: {
				destination: '/api/auth/signin',
				permanent: false,
			},
		};
	}
	const userId = (session as Session)?.user?.email?.replace(/[^a-zA-Z0-9_]/g, "") ?? '';

	const userQ = userQuery(userId)
	const userData = await client.fetch(userQ);

	return {
		props: {
			userData,
			...(await serverSideTranslations(locale, ['common'])),
		},
	};
}
