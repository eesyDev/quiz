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
import QuizCard from '../components/QuizCard';
import QuestionCard from '../components/QuestionCard';
import { selectAnswer, nextQuestion } from '@/redux/slices/quizAnswersSlice';

const MentorDashboard = ({ userData }: { userData: IUserExt }) => {
    const [isOpenForm, setIsOpenForm] = useState(false);
    const { locale } = useRouter();
	const currentLocale = locale as 'ru' | 'en';
    const { t } = useTranslation('common');
    const dispatch = useDispatch();
    const { userName, email, image, quizzes, questions } = userData;
    const handleAnswerSelect = (key: string, answer: string) => {
        dispatch(selectAnswer({ key, answer }));
    };
    return (
        <div className="profile-inner bg-white-main rounded-lg pt-16 pb-8 px-8">
            <div className='profile-info'>
                <img src={image} alt={userName} style={{ borderRadius: '50%', width: '150px' }} />
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
                                <AlertDialogTitle>Create question</AlertDialogTitle>
                                <QuestionForm />
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