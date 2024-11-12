import { client } from '@/utils/client'

export const createQuiz = async (quizData : QuizCardProps) => {
    try {
        const newQuiz = await client.create({
            _type: 'quiz',
            title: quizData.title,
            questions: quizData.questions.map((id) => ({ _ref: id })),
            author: { _ref: quizData.author },
        });
        return newQuiz;
    } catch (error) {
        console.error("Error creating quiz:", error);
        throw error;
    }
};
