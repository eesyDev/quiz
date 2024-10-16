import React from 'react';
import { useRouter } from 'next/router';
import * as IconsFa from 'react-icons/fa';
import * as IconsMd from 'react-icons/md';
import { IconType } from 'react-icons';
import { useTranslation } from 'next-i18next';

const QuizCard = ({ title, questions, icon, slug }: QuizCardProps) => {
	const { locale, query, replace } = useRouter();
	const currentLocale = locale as 'ru' | 'en';
	const { t } = useTranslation('common');

	const Icon = icon.startsWith('Fa') ?
		IconsFa[icon as keyof typeof IconsFa] as IconType :
		IconsMd[icon as keyof typeof IconsMd] as IconType;
		

	return (
		<div className='qiuz-card'>
			<div className="heading flex gap-4">
				<div className="icon">
					{Icon && <Icon />}
				</div>
				<h4 className="typo-h4">{title[currentLocale]}</h4>
			</div>
			{questions && <div className="qnt">{t("question_qtt")} : {questions.length}</div>}
		</div>
	)
}

export default QuizCard