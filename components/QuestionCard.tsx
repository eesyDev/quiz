"use client"
import React, { useEffect } from 'react';
import Prism from 'prismjs';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/rootReducer';
import Markdown from 'react-markdown'

const QuestionCard = ({ title, level, text, answers, locale} : QuestionProps) => {
    const theme = useSelector((state: RootState) => state?.theme?.value);
    // const style = theme === 'dark' ? vscDarkPlus : vs;

    useEffect(() => {
        if (typeof window !== 'undefined') {
            Prism.highlightAll();
        }
    }, []);
  return (
    <div className='question-card'>
        <h3 className="question-title">{title}</h3>
        {text && 
            <div className="code mt-4 code-post">
                <pre>
                    <code className="language-javascript">
                    {text}
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
                        {answer.answerText.en ? answer.answerText[locale as 'en' | 'ru'] : answer.answerText.ru}
                    </div>
                ))}
            </div>
        }
    </div>
  )
}

export default QuestionCard