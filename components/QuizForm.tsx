import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { createQuiz } from '@/utils/api';

interface QuizFormProps {
    t: (key: string) => string; 
    questionsProps: QuestionProps[]; 
    userData: IUser; 
    onClose: () => void;
}

const QuizForm = ({ t, questionsProps, userData } : QuizFormProps) => {
    const [quizTitle, setQuizTitle] = useState('');
    const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]); // Хранение выбранных вопросов

    const handleCreateQuiz = async () => {
        if (!quizTitle) {
            alert(t("enter_quiz_title"));
            return;
        }

        if (selectedQuestions.length === 0) {
            alert(t("select_questions_for_quiz"));
            return;
        }

        try {
            await createQuiz({
                title: quizTitle,
                questions: selectedQuestions,
                author: userData._id,
            });

            alert(t("quiz_created_successfully"));
            setSelectedQuestions([]); 
            setQuizTitle(''); 
        } catch (error) {
            alert(t("error_creating_quiz"));
        }
    };

    const handleQuestionSelect = (questionId: string, isSelected: boolean) => {
        setSelectedQuestions((prevSelected) =>
            isSelected ? [...prevSelected, questionId] : prevSelected.filter((id) => id !== questionId)
        );
    };

    return (
        <div>
            <div className="quiz-form">
                <input
                    type="text"
                    placeholder={t("quiz_name_placeholder")}
                    value={quizTitle}
                    onChange={(e) => setQuizTitle(e.target.value)}
                    className="mb-4 border p-2 rounded w-full"
                />
                <div className="quiz-form-questions-wrapper">
                    <h3>{t("select_questions")}</h3>
                    {questionsProps.map((item, index) => (
                        <div key={item._id} className="question-item">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedQuestions.includes(item._id)}
                                    onChange={(e) => handleQuestionSelect(item._id, e.target.checked)}
                                />
                                {item.title.ru}
                            </label>
                        </div>
                    ))}
                </div>
                <Button onClick={handleCreateQuiz} className="mt-4">
                    {t("save_quiz")}
                </Button>
            </div>
        </div>
    );
};

export default QuizForm;
