import React, { useTransition, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useDispatch } from 'react-redux';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogTitle,
	AlertDialogTrigger,
	AlertDialogPortal,
	AlertDialogOverlay
} from "@/components/ui/alert-dialog";
import QuestionForm from '@/components/QuestionForm';
import QuizForm from './QuizForm';
import QuizCard from '../components/QuizCard';
import QuestionCard from '../components/QuestionCard';
import { selectAnswer, nextQuestion } from '@/redux/slices/quizAnswersSlice';

const MentorDashboard = ({ userData, questionsProps }: { userData: IUserExt, questionsProps: QuestionProps[] }) => {
    const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
    const [createQuizAlert, setCreateQuizAlert] = useState<boolean>(false);
    const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
    const { locale } = useRouter();
	const currentLocale = locale as 'ru' | 'en';
    const { t } = useTranslation('common');
    const dispatch = useDispatch();
    const { userName, email, image, quizzes, questions } = userData;
    

    const handleAnswerSelect = (key: string, answer: string) => {
        dispatch(selectAnswer({ key, answer }));
    };

    const handleQuestionSelect = (id: string, isSelected: boolean) => {
        setSelectedQuestions((prev) =>
            isSelected ? [...prev, id] : prev.filter((questionId) => questionId !== id)
        );
    };

    return (
        <div className="profile-inner bg-white-main rounded-lg pt-16 pb-8 px-8">
            <div className='profile-info'>
                <img src={image} alt={userName} style={{ borderRadius: '50%', width: '150px', minHeight: '150px' }} />
                <h1 className="text-3xl font-bold  mt-8">Settings {userName}</h1>
                <p className="text-muted-foreground mt-2">
                    {t("profile_text")}
                </p>
                <div className="profile-actions">
                    <AlertDialog open={isOpenForm} onOpenChange={setIsOpenForm} >
                        <AlertDialogTrigger>
                            <Button variant="secondary">{t("create_question")}</Button>
                        </AlertDialogTrigger>

                        <AlertDialogPortal>
                            <AlertDialogOverlay className="fixed inset-0 bg-black-text bg-opacity-80 z-50" />
                            <AlertDialogContent className="alert-dialog-content overflow-y-auto max-h-128">
                                <AlertDialogTitle>{t("create_question")}</AlertDialogTitle>
                                <QuestionForm userData={userData}/>
                                <AlertDialogFooter>
                                    <AlertDialogCancel onClick={() => setIsOpenForm(false)}>Отмена</AlertDialogCancel>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialogPortal>
                    </AlertDialog>
                    <AlertDialog open={createQuizAlert} onOpenChange={setCreateQuizAlert}>
                        <AlertDialogTrigger>
                            <Button variant="secondary">{t("create_quiz")}</Button>
                        </AlertDialogTrigger>
                        <AlertDialogPortal>
                        <AlertDialogOverlay className="fixed inset-0 bg-black-text bg-opacity-80 z-50" />
                        <AlertDialogContent className="alert-dialog-content overflow-y-auto max-h-128">
                        <AlertDialogTitle>{t("create_quiz")}</AlertDialogTitle>
                        <QuizForm t={t} questionsProps={questionsProps} userData={userData}/>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setIsOpenForm(false)}>Отмена</AlertDialogCancel>
                        </AlertDialogFooter>
                        </AlertDialogContent>
                        
                        </AlertDialogPortal>
                    </AlertDialog>
                </div>
            </div>
            <Tabs className="space-y-6 mt-16" defaultValue="quizes">
                <TabsList>
                    <TabsTrigger value="quizes">{t("my_quizes")}</TabsTrigger>
                    <TabsTrigger value="questions">{t("my_questions")}</TabsTrigger>
                    <TabsTrigger value="selfdata">{t("self_info")}</TabsTrigger>
                </TabsList>
                <TabsContent value="quizes" className="space-y-6">
                    <div className="quiz-wrapper grid-cols-1 grid xl:grid-cols-4 gap-6 md:grid-cols-3 mt-8">
                        {quizzes.length > 0 ? (
                            quizzes.map((quiz) => (
                                <QuizCard
                                    key={quiz._id}
                                    title={quiz.title}
                                    icon={quiz.icon}
                                    slug={quiz.slug.current}
                                    questions={quiz.questions}
                                    author={quiz.author}
                                />
                            ))
                        ) : (
                            <p>{t("no_quiz_yet")}</p>
                        )}
                    </div>
                </TabsContent>
                <TabsContent value="questions" className="space-y-6">
                    <div className="questions-wrapper grid-cols-1 grid xl:grid-cols-2 gap-6 mt-8">
                        {questions.length > 0 ? (
                            questions.map((question) => (
                                <QuestionCard
                                    key={question._id}
                                    title={question.title}
                                    _id={question._id}
                                    level={question.level}
                                    locale={currentLocale}
                                    questionText={question.questionText}
                                    answers={question.answers}
                                    onAnswerSelect={handleAnswerSelect}
                                    isAuthor={true}
                                    isQuizStarted={false}
                                />
                            ))
                        ) : (
                            <p>{t("no_questions_yet")}</p>
                        )}
                    </div>
                </TabsContent>
                <TabsContent value="selfdata" className="space-y-6"></TabsContent>
            </Tabs>
        </div>
    )
}

export default MentorDashboard