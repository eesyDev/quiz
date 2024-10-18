"use client"
import React from 'react';
import { useRouter } from 'next/router';
import * as IconsFa from 'react-icons/fa';
import * as IconsMd from 'react-icons/md';
import * as IconsIo5 from 'react-icons/io5';
import { IconType } from 'react-icons';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

const QuizCard = ({ title, questions, icon, slug }: QuizCardProps) => {
	const { locale, query, replace } = useRouter();
	const currentLocale = locale as 'ru' | 'en';
	const { t } = useTranslation('common');

	const Icon = icon.startsWith('Fa') ?
		IconsFa[icon as keyof typeof IconsFa] as IconType :
		icon.startsWith('Io') ? IconsIo5[icon as keyof typeof IconsIo5] :
		IconsMd[icon as keyof typeof IconsMd] as IconType;
		

	return (
		<Link href={`/quiz/${slug}`} className='quiz-card'>
			<div className="heading flex gap-4">
				<div className="icon text-pink-100">
					{Icon && <Icon />}
				</div>
				<h4 className="typo-h5">{title[currentLocale]}</h4>
			</div>
			{questions && <div className="qnt">{t("question_qtt")} : {questions.length}</div>}
		</Link>
	)
}

export default QuizCard