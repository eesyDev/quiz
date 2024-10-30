import React, { useState } from 'react';
import { createQuestion } from '@/utils/api'; // Импорт функции для создания вопроса в Sanity

const QuestionForm = () => {
  const [title, setTitle] = useState({ ru: '', en: '' });
  const [questionText, setQuestionText] = useState({
    ru: [{ children: [{ text: '' }] }],
    en: [{ children: [{ text: '' }] }],
  });
  const [answers, setAnswers] = useState([{ answerText: { ru: '', en: '' }, isCorrect: false }]);
  const [hasOptions, setHasOptions] = useState(false);
  const [levelId, setLevelId] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const handleAddAnswer = () => {
    setAnswers([...answers, { answerText: { ru: '', en: '' }, isCorrect: false }]);
  };

  const handleQuestionTextChange = (locale: 'ru' | 'en', value: string) => {
    setQuestionText((prev) => ({
      ...prev,
      [locale]: [{ children: [{ text: value }] }],
    }));
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase() 
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .slice(0, 50);
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createQuestion({
        title,
        questionText,
        slug: {current: generateSlug(title.en)},
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
      <h2>Создание нового вопроса</h2>

      {/* Поле для заголовка на русском и английском */}
      <label>Заголовок (RU):</label>
      <input
        type="text"
        value={title.ru}
        onChange={(e) => setTitle((prev) => ({ ...prev, ru: e.target.value }))}
      />

      <label>Заголовок (EN):</label>
      <input
        type="text"
        value={title.en}
        onChange={(e) => setTitle((prev) => ({ ...prev, en: e.target.value }))}
      />

      {/* Поле для текста вопроса на русском и английском */}
      <label>Текст вопроса (RU):</label>
      <textarea
        value={questionText.ru[0]?.children[0]?.text || ''}
        onChange={(e) => handleQuestionTextChange('ru', e.target.value)}
      />

      <label>Текст вопроса (EN):</label>
      <textarea
        value={questionText.en[0]?.children[0]?.text || ''}
        onChange={(e) => handleQuestionTextChange('en', e.target.value)}
      />

      {/* Уровень и категория */}
      <label>ID Уровня:</label>
      <input type="text" value={levelId} onChange={(e) => setLevelId(e.target.value)} />

      <label>ID Категории:</label>
      <input type="text" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} />

      {/* Варианты ответов для вопросов с множественным выбором */}
      <label>Есть варианты ответа?</label>
      <input type="checkbox" checked={hasOptions} onChange={() => setHasOptions(!hasOptions)} />

      {hasOptions && (
        <div>
          <h3>Варианты ответа</h3>
          {answers.map((answer, index) => (
            <div key={index}>
              <label>Ответ (RU):</label>
              <input
                type="text"
                value={answer.answerText.ru}
                onChange={(e) => handleAnswerChange(index, 'ru', e.target.value)}
              />

              <label>Ответ (EN):</label>
              <input
                type="text"
                value={answer.answerText.en}
                onChange={(e) => handleAnswerChange(index, 'en', e.target.value)}
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
              />
            </div>
          ))}
          <button type="button" onClick={handleAddAnswer}>
            Добавить ответ
          </button>
        </div>
      )}

      <button type="submit">Создать вопрос</button>
    </form>
  );
};

export default QuestionForm;
