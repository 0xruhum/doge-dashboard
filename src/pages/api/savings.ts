import type { NextApiRequest, NextApiResponse } from 'next';
import type { SavingsEntry } from '../../types/savings';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<SavingsEntry[]>
) {
    const mockData: SavingsEntry[] = [
        {
            date: '2024-01-01',
            amount: 50000,
            description: 'Process optimization in HR department',
            source: 'https://example.com/report1'
        },
        {
            date: '2024-01-15',
            amount: 75000,
            description: 'Digital transformation initiative',
            source: 'https://example.com/report2'
        },
        {
            date: '2024-02-01',
            amount: 125000,
            description: 'Automated paperwork processing',
            source: 'https://example.com/report3'
        }
    ];

    res.status(200).json(mockData.sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    ));
} 