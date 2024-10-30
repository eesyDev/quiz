import { client } from './client';

export const createQuestion = async (questionData: QuestionPropsMutation) => {
  try {
    const newQuestion = await client.create({
      _type: 'question',
      title: questionData.title,
      slug: questionData.slug,
      difficulty: questionData.difficulty,
      level: questionData.level,
      questionText: questionData.questionText,
      answers: questionData.answers,
      hasOptions: questionData.hasOptions,
      authorId: questionData.authorId,
      category: questionData.category,
    });
    return newQuestion;
  } catch (error) {
    console.error('Error creating question:', error);
    throw error;
  }
};
