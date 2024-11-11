"use client"
import React, { useEffect, useState } from 'react';
import Prism from 'prismjs';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/rootReducer';
import Markdown from 'react-markdown';
import { useRouter } from 'next/router';

const QuestionCard = ({ title, level, questionText, answers, locale, onAnswerSelect, _id, isAuthor, isQuizStarted} : QuestionProps) => {
    const theme = useSelector((state: RootState) => state?.theme?.value);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            Prism.highlightAll();
        }
    }, []);

    useEffect(() => {
        setSelectedAnswer(null);
        setIsSubmitted(false);
    }, [_id]);

    const handleAnswerSelect = (answer: string) => {
        if (!isSubmitted && !isAuthor && isQuizStarted) {
            setSelectedAnswer(answer);
        }
    };
    
    const handleSubmit = () => {
        if (!isAuthor && isQuizStarted) {
            setIsSubmitted(true); 
            onAnswerSelect(_id, selectedAnswer || ''); 
        }
    };
    console.log(selectedAnswer)
  return (
    <div className='question-card'>
        <h3 className="question-title">{locale === 'en' && title.en ? title.en : title.ru}</h3>
        {questionText && 
            <div className="code mt-4 code-post">
                <pre>
                    <code className="language-javascript">
                    {
                    locale === 'en' && questionText?.en ?
                    questionText?.en[0].children[0].text : 
                    locale === 'ru' ? questionText?.ru[0].children[0].text : ''
                    }
                    </code>
                </pre>
                {/* <SyntaxHighlighter language="javascript" style={style}>{text}</SyntaxHighlighter> */}
            </div>
        }
        {
            answers && 
            <div className="vars mt-4">
                {answers.map((answer, index) => (
                    <div key={index}>
                    <label key={index} 
                            className={`answer-option ${selectedAnswer === answer.answerText[locale as 'en' | 'ru'] ? 'selected' : ''}`}
                            onClick={() => handleAnswerSelect(answer.answerText[locale as 'en' | 'ru'] || '')}
                            style={{ cursor: isSubmitted ? 'not-allowed' : 'pointer' }}>
                        <input
                            type="radio"
                            name={`question-${_id}`} 
                            value={answer.answerText[locale as 'en' | 'ru']}
                            checked={selectedAnswer === answer.answerText[locale as 'en' | 'ru']}
                            onChange={() => handleAnswerSelect(
                                locale === 'en' && answer.answerText?.en
                                  ? answer.answerText.en
                                  : locale === 'ru' && answer.answerText?.ru
                                  ? answer.answerText.ru
                                  : ''
                              )}
                            readOnly
                            disabled={isAuthor}
                            style={{ display: 'none' }}
                        />
                        {locale === 'en' && answer.answerText.en ? answer.answerText[locale as 'en' | 'ru'] : answer.answerText.ru}
                    </label>
                </div>
                ))}
                {/* Показать кнопку "Ответить" только если выбран ответ и ответ ещё не отправлен */}
                    {selectedAnswer && !isSubmitted && !isAuthor && (
                        <button className="submit-btn btn btn--filled mt-4" onClick={handleSubmit}>
                            Ответить
                        </button>
                    )}
            </div>
        }
    </div>
  )
}

export default QuestionCard