import { client } from './client';

export const createQuestion = async (questionData: QuestionPropsMutation) => {
  try {
    const newQuestion = await client.create({
      _type: 'question',
      title: {
        ru: questionData.title.ru,
        en: questionData.title.en,
      },
      slug: questionData.slug,
      difficulty: questionData.difficulty,
      level: { _ref: questionData.level },
      questionText: questionData.questionText,
      answers: questionData.answers,
      hasOptions: questionData.hasOptions,
      author: { _ref: questionData.author },
      category: { _ref: questionData.category },
    });
    return newQuestion;
  } catch (error) {
    console.error('Error creating question:', error);
    throw error;
  }
};

export const createQuiz = async (quizData: CreateQuizData) => {
    try {
        const newQuiz = await client.create({
            _type: 'quiz',
            title: quizData.title,
            questions: quizData.questions.map((id) => ({ _ref: id })),
            author: { _ref: quizData.author }
        });
        console.log('Success', newQuiz)
        return newQuiz;
    } catch (error) {
        console.error("Error creating quiz:", error);
        throw error;
    }
};
