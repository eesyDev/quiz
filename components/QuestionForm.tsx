import React, { useState, useEffect } from 'react';
import { createQuestion } from '@/utils/api'; 
import { generateSlug } from '../utils';
import { fetchCategories, fetchLevels } from '../utils/index';

const QuestionForm = () => {
	const [title, setTitle] = useState({ ru: '', en: '' });
	const [questionText, setQuestionText] = useState({
		ru: [{ children: [{ text: '' }] }],
		en: [{ children: [{ text: '' }] }],
	});
	const [levels, setLevels] = useState<LevelSelect[]>([]);
	const [categories, setCategories] = useState<CategorySelect[]>([]);
	const [answers, setAnswers] = useState([{ answerText: { ru: '', en: '' }, isCorrect: false }]);
	const [hasOptions, setHasOptions] = useState(false);
	const [levelId, setLevelId] = useState('');
	const [categoryId, setCategoryId] = useState('');
	const [formErrors, setFormErrors] = useState('');
	const [errors, setErrors] = useState({
		titleRu: false,
		// titleEn: false,
		questionTextRu: false,
		// questionTextEn: false,
		levelId: false,
		categoryId: false,
	  });

	console.log(categories)
	  useEffect(() => {
		const loadLevels = async () => {
		  const levelsData = await fetchLevels();
		  setLevels(levelsData);
		};
	
		const loadCategories = async () => {
		  const categoriesData = await fetchCategories();
		  setCategories(categoriesData);
		};
	
		loadLevels();
		loadCategories();
	  }, []);

	const handleAddAnswer = () => {
		setAnswers([...answers, { answerText: { ru: '', en: '' }, isCorrect: false }]);
	};

	const handleQuestionTextChange = (locale: 'ru' | 'en', value: string) => {
		setQuestionText((prev) => ({
			...prev,
			[locale]: [{ children: [{ text: value }] }],
		}));
	};

	const validateForm = () => {
		setErrors({
			titleRu: !title.ru,
			questionTextRu: !questionText.ru[0]?.children[0]?.text,
			levelId: !levelId,
			categoryId: !categoryId,
		});
		return !(!title.ru || !questionText.ru[0]?.children[0]?.text || !levelId || !categoryId);
	};
	

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!validateForm()) {
			setFormErrors('Заполните все обязательные поля.');
			return;
		}
		try {
			await createQuestion({
				title,
				questionText,
				slug: { current: generateSlug(title.en) },
				difficulty: 2,
				level: { _id: levelId },
				category: { _id: categoryId },
				hasOptions,
				answers: hasOptions ? answers : [],
				authorId: 'user-id', // ID текущего пользователя
			});
			alert('Вопрос успешно создан!');
		} catch (error) {
			alert('Ошибка при создании вопроса.');
		}
	};

	const handleAnswerChange = (index: number, locale: 'ru' | 'en', value: string) => {
		setAnswers((prevAnswers) =>
			prevAnswers.map((answer, i) =>
				i === index
					? {
						...answer,
						answerText: {
							...answer.answerText,
							[locale]: value, // Обновляем текст ответа для указанного языка
						},
					}
					: answer
			)
		);
	};


	return (
		<form onSubmit={handleSubmit}>
			<h2 className='typo-h5'>Создание нового вопроса</h2>

			<div className="input-row mt-8">
				<label>Заголовок (RU):</label>
				<input
					type="text"
					value={title.ru}
					onChange={(e) => {
						setTitle((prev) => ({ ...prev, ru: e.target.value }));
						setErrors((prev) => ({ ...prev, titleRu: !e.target.value }));
					}}
					className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
						errors.titleRu
						? 'border-red-500 focus:border-red-500 focus:ring-red-500'
						: 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
					}`}
				/>
			</div>
			<div className="input-row mt-4">
				<label>Заголовок (EN):</label>
				<input
					type="text"
					value={title.en}
					onChange={(e) => {
						setTitle((prev) => ({ ...prev, en: e.target.value }));
						setErrors((prev) => ({ ...prev, titleEn: !e.target.value }));
					}}
					className='block w-full rounded-md shadow-sm sm:text-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
				/>
			</div>
			<div className="input-row mt-8">
				<label>Текст вопроса (RU):</label>
				<textarea
					value={questionText.ru[0]?.children[0]?.text || ''}
					onChange={(e) => {
						handleQuestionTextChange('ru', e.target.value)
						setErrors((prev) => ({ ...prev, questionTextRu: !e.target.value }));
					}}
					className={`rounded-md border-1 py-1.5 pl-7 pr-20 text-gray-900 ring-inset placeholder:text-gray-400 sm:text-sm/6 w-full ${
						errors.questionTextRu
						? 'border-red-500 focus:border-red-500 focus:ring-red-500 ring-red-100'
						: 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 ring-1' 
					}`}
				/>
			</div>
			<div className="input-row mt-4">
				<label>Текст вопроса (EN):</label>
				<textarea
					value={questionText.en[0]?.children[0]?.text || ''}
					onChange={(e) => {
						handleQuestionTextChange('en', e.target.value)
						setErrors((prev) => ({ ...prev, questionTextEn: !e.target.value }));
					}}
					className={'rounded-md border-1 py-1.5 pl-7 pr-20 text-gray-900 ring-inset placeholder:text-gray-400 sm:text-sm/6 w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 ring-1' 
					}
				/>
			</div>
			<div className="input-row mt-8 gap-4">
			<div className="input-row-sm">
				<label>ID Уровня:</label>
				<select
				value={levelId}
				onChange={(e) => {
					setLevelId(e.target.value);
					setErrors((prev) => ({ ...prev, levelId: !e.target.value }));
				}}
				className={`rounded-md border-1 py-1.5 pl-7 pr-20 text-gray-900 ring-inset placeholder:text-gray-400 sm:text-sm/6 w-full ${
					errors.levelId
					? 'border-red-500 focus:border-red-500 focus:ring-red-500 ring-red-100'
					: 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 ring-1'
				}`}
				>
				<option value="">Выберите уровень</option>
				{levels.map((level) => (
					<option key={level._id} value={level._id}>
					{level.title.ru}
					</option>
				))}
				</select>
			</div>
			<div className="input-row-sm">
					<label>ID Категории :</label>
					<select
						value={categoryId}
						onChange={(e) => {
							setCategoryId(e.target.value);
							setErrors((prev) => ({ ...prev, categoryId: !e.target.value }));
						}}
						className={`rounded-md border-1 py-1.5 pl-7 pr-20 text-gray-900 ring-inset placeholder:text-gray-400 sm:text-sm/6 w-full ${
							errors.categoryId
							? 'border-red-500 focus:border-red-500 focus:ring-red-500 ring-red-100'
							: 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 ring-1'
						}`}
						>
						<option value="">Выберите категорию</option>
						{categories.map((category) => (
							<option key={category._id} value={category._id}>
							{category.title}
							</option>
						))}
						</select>
				</div>
				
			</div>
			<div className="input-row mt-8 ">
					<label>Есть варианты ответа?</label>
					<input type="checkbox" checked={hasOptions} onChange={() => setHasOptions(!hasOptions)} className='rounded-md border-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6'/>
				</div>
			{hasOptions && (
				<div className=' mt-16'>
					<h3>Варианты ответа</h3>
					{answers.map((answer, index) => (
						<div key={index} className='input-row'>
							<label>Ответ (RU):</label>
							<input
								type="text"
								value={answer.answerText.ru}
								onChange={(e) => handleAnswerChange(index, 'ru', e.target.value)}
								className='rounded-md border-1 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 w-full'
							/>

							<label>Ответ (EN):</label>
							<input
								type="text"
								value={answer.answerText.en}
								onChange={(e) => handleAnswerChange(index, 'en', e.target.value)}
								className='rounded-md border-1 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 w-full'
							/>

							<label>Правильный?</label>
							<input
								type="checkbox"
								checked={answer.isCorrect}
								onChange={(e) =>
									setAnswers((prevAnswers) =>
										prevAnswers.map((ans, i) =>
											i === index ? { ...ans, isCorrect: e.target.checked } : ans
										)
									)
								}
								className='rounded-md border-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6'
							/>
						</div>
					))}
					<button type="button" onClick={handleAddAnswer}>
						Добавить ответ
					</button>
				</div>
			)}

			<button type="submit" disabled={Object.values(errors).some((error) => error)}
				className={`mt-6 w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
					Object.values(errors).some((error) => error)
						? 'bg-gray-400 cursor-not-allowed'
						: 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
				}`}>Создать вопрос</button>
		</form>
	);
};

export default QuestionForm;
