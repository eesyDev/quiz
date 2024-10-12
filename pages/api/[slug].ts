import { client } from '@/utils/client';
import { allLevels } from '@/utils/queries';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { slug } = req.query;

    if (typeof slug !== 'string') {
        return res.status(400).json({ error: 'Invalid category parameter' });
    }

    try {
        const query = allLevels();
        const data = await client.fetch(query);

        if (data.length === 0) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json(data);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: 'Failed to fetch data', details: error.message });
        } else {
            res.status(500).json({ error: 'Unknown error occurred' });
        }
    }
}
