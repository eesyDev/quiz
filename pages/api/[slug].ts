import { client } from '@/utils/client';
import { allLevels, questionsByCategoryAndLevel, categoryQuestions, quizesCat, quizesCatAndLevel } from '@/utils/queries';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { level, slug } = req.query;

    // Проверка на наличие category
    if (typeof slug !== 'string') {
        return res.status(400).json({ error: 'Invalid category parameter' });
    }

    try {
        let questionsDataQuery;
        let quizesDataQuery;

        console.log(level)
        console.log(slug)
        
        // Если level не передан, запрашиваем все вопросы по категории
        if (!level || typeof level !== 'string') {
            questionsDataQuery = categoryQuestions(slug);
            quizesDataQuery = quizesCat(slug)
        } else {
            // Если level передан, запрашиваем вопросы, отфильтрованные по категории и уровню
            questionsDataQuery = questionsByCategoryAndLevel(slug, level);
            quizesDataQuery = quizesCatAndLevel(slug, level)
        }

        // Параллельный запрос всех уровней и вопросов
        const [levelData, allQuestionsData, questionsByLevelData, quizData] = await Promise.all([
            client.fetch(allLevels()),
            client.fetch(categoryQuestions(slug)), // Запрос всех вопросов по категории
            client.fetch(questionsDataQuery), // Запрос по категории и уровню, если level передан
            client.fetch(quizesDataQuery)
        ]);

        // Проверка наличия данных
        if (!levelData.length) {
            return res.status(404).json({ message: 'No levels found' });
        }
        
        // Проверяем отдельно наличие квизов, вопросов и данных по уровню
        if (!allQuestionsData.length && !questionsByLevelData.length && !quizData.length) {
            return res.status(404).json({ message: 'No data found for the selected category and level' });
        }
        

        // Возврат данных
        res.status(200).json({
            levels: levelData,
            allQuestions: allQuestionsData,
            questionsByLevel: questionsByLevelData,
            quizData: quizData
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data', details: error instanceof Error ? error.message : 'Unknown error occurred' });
    }
}
