import { client } from '@/utils/client';
import { singleCategoryLevel } from '@/utils/queries';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { slug } = req.query;
    console.log(slug)

    if (typeof slug !== 'string') {
        return res.status(400).json({ error: 'Invalid category parameter' });
    }

    try {
        const query = singleCategoryLevel(slug);
        const data = await client.fetch(query);

        if (data.length === 0) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json(data[0]);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: 'Failed to fetch data', details: error.message });
        } else {
            //if err not Error
            res.status(500).json({ error: 'Unknown error occurred' });
        }
    }
}
