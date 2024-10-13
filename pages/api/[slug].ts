import { client } from '@/utils/client';
import { allLevels, questionsByCategoryAndLevel, categoryQuestions } from '@/utils/queries';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { level, slug } = req.query;

    // Проверка на наличие category
    if (typeof slug !== 'string') {
        return res.status(400).json({ error: 'Invalid category parameter' });
    }

    try {
        let questionsDataQuery;
        
        // Если level не передан, запрашиваем все вопросы по категории
        if (!level || typeof level !== 'string') {
            questionsDataQuery = categoryQuestions(slug);
        } else {
            // Если level передан, запрашиваем вопросы, отфильтрованные по категории и уровню
            questionsDataQuery = questionsByCategoryAndLevel(slug, level);
        }

        // Параллельный запрос всех уровней и вопросов
        const [levelData, allQuestionsData, questionsByLevelData] = await Promise.all([
            client.fetch(allLevels()),
            client.fetch(categoryQuestions(slug)), // Запрос всех вопросов по категории
            client.fetch(questionsDataQuery) // Запрос по категории и уровню, если level передан
        ]);

        // Проверка наличия данных
        if (!levelData.length || !allQuestionsData.length || !questionsByLevelData.length) {
            return res.status(404).json({ message: 'Data not found' });
        }

        // Возврат данных
        res.status(200).json({
            levels: levelData,
            allQuestions: allQuestionsData,
            questionsByLevel: questionsByLevelData,
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data', details: error instanceof Error ? error.message : 'Unknown error occurred' });
    }
}
