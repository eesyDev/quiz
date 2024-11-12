import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from "@/components/ui/button";

const QuizForm = ({ t, questionsProps }) => {
    const [quizTitle, setQuizTitle] = useState('');
    const handleCreateQuiz = async () => {
        if (!quizTitle) {
            alert(t("enter_quiz_title"));
            return;
        }
        
        try {
            await createQuiz({
                title: quizTitle,
                questions: selectedQuestions,
                author: userData._id,
            });
            
            alert(t("quiz_created_successfully"));
            setIsOpenQuizForm(false);
            setSelectedQuestions([]); // Очистка выбранных вопросов
        } catch (error) {
            alert(t("error_creating_quiz"));
        }
    };
    console.log(questionsProps[0])
  return (
    <div>
        <div className="quiz-form">
            <input
                type="text"
                placeholder={t("quiz_name_placeholder")}
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
            />
            <div className="quiz-form-questions-wrapper">
                {
                    questionsProps.map((item, index) => (
                        <div>
                            {item.title.ru}
                        </div>
                    ))
                }
            </div>
            <Button onClick={handleCreateQuiz}>{t("save_quiz")}</Button>
        </div>
    </div>
  )
}

export default QuizForm