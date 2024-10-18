import { client } from '@/utils/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { singleQuiz } from '@/utils/queries';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {slug} = req.query
    
    if (typeof slug !== 'string') {
        return res.status(400).json({ error: 'Invalid category parameter' });
    }

    try {
        let quizQuery = singleQuiz(slug);

        const quizData = await client.fetch(quizQuery);

        console.log(quizData)

        if (!quizData.length) {
            return res.status(404).json({ message: 'No levels found' });
        }

        res.status(200).json({
            quizData: quizData
        });
    } catch(error) {
        res.status(500).json({ error: 'Failed to fetch data', details: error instanceof Error ? error.message : 'Unknown error occurred' });
    }
}