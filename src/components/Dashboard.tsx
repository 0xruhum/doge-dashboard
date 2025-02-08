import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { FixedSizeList } from 'react-window';
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { SavingsEntry } from '../types/savings';

const Dashboard = () => {
    const [data, setData] = useState<SavingsEntry[]>([]);
    const [graphData, setGraphData] = useState<{ date: string; amount: number; }[]>([]);

    useEffect(() => {
        const mockData: SavingsEntry[] = [
            {
                amount: 420000000,
                description: 'In the first 80 hours, approx $420M of current/impending contracts have been cancelled. 2 leases have also been cancelled, focusing on DEI contracts and unoccupied buildings.',
                source: 'https://x.com/DOGE/status/1882862487261114500',
                date: '2025-01-24'
            },
            {
                amount: 145000000,
                description: 'Another $145M in federal savings due to cancellations of 16 DEIA contracts by the Departments of Labor, Transportation, Agriculture, Commerce, HHS, and Treasury. Thanks to those departments for their pro-active and rapid work.',
                source: 'https://x.com/DOGE/status/1883631632110014810',
                date: '2025-01-25'
            },
            {
                amount: 1600000,
                description: 'The GSA terminated three leases of mostly empty office space, with tenants relocating to nearby buildings in the GSA portfolio. With savings of $1.6M, these are the first steps to right size the Federal real estate portfolio of more than 7,500 leases',
                source: 'https://x.com/DOGE/status/1884015256957296917',
                date: '2025-01-28'
            },
            {
                amount: 45000000,
                description: 'The $45 million in DEI scholarships in Burma has been cancelled.',
                source: 'https://x.com/DOGE/status/1884612616347066536',
                date: '2025-01-29'
            },
            {
                date: '2025-01-30',
                amount: 390000000,
                description: 'Through 1/29/2025, 85 DEIA related contracts totaling ~$1B have been terminated within multiple agencies. After subtracting the previously reported $610M in DEI cancellations, the remaining new DEI savings is $390M.',
                source: 'https://x.com/DOGE/status/1884762497850146857'
            },
            {
                date: '2025-02-03',
                amount: 43000000,
                description: 'The number of lease terminations increased from 3 to 22, raising total lease savings from $1.6M to $44.6M. Subtracting the previously reported $1.6M, the new savings is $43M.',
                source: 'https://x.com/DOGE/status/1886273522214813785'
            },
            {
                date: '2025-02-03',
                amount: 26000000,
                description: 'This morning, 20 consulting contracts, mostly focused on "strategic communication" and "executive coaching," were terminated for immediate savings of $26mm.',
                source: 'https://x.com/DOGE/status/1886467781136158853'
            },
            {
                date: '2025-02-04',
                amount: 139000000,
                description: `Today's number has increased to 22 consulting contract terminations for a total savings of ~$45mm. All in today, 36 contracts were terminated for a total savings of ~$165mm across 6 agencies. After subtracting the previously reported $26mm, the new net savings is $139mm.`,
                source: 'https://x.com/DOGE/status/1886578681805504608'
            },
            {
                date: '2025-02-05',
                amount: 33000000,
                description: '12 consulting contract terminations (in GSA and Dept. of Education) totaling $30mm, plus 12 underutilized lease cancellations for an annual savings of $3mm.',
                source: 'https://x.com/DOGE/status/1886982858369020330'
            },
            {
                date: '2025-02-06',
                amount: 110000000,
                description: 'Today, 78 contracts were terminated for convenience across DEI, Non-Performing, Media, and Consulting categories, including one for "groundwater exploration and assessment in the Islamic Republic of Mauritania." Approximately $110mm of total savings.',
                source: 'https://x.com/DOGE/status/1887390241797120317'
            },
            {
                date: '2025-02-07',
                amount: 182000000,
                description: 'In the past 48 hours, HHS canceled 62 contracts worth $182 million. These contracts were entirely for administrative expenses—none affected any healthcare programs. This included terminating a $168,000 contract for an Anthony Fauci exhibit at the NIH Museum.',
                source: 'https://x.com/DOGE/status/1887972340446683576'
            },
            {
                date: '2025-02-08',
                amount: 15000000,
                description: 'Today, the Department of Education terminated three DEI training grants totaling $15M. One of the institutions had previously hosted faculty workshops entitled "Decolonizing the Curriculum".',
                source: 'https://x.com/DOGE/status/1888034494252192048'
            },
            {
                date: '2025-02-08',
                amount: 250000000,
                description: 'Great coordination across 35 agencies over the last two days to terminate 199 wasteful contracts saving ~$250mm, including:\n-Contract for "Asia Pacific - Sri Lanka climate change mitigation adaption and resilience coordinator services for forest service"\n-Workshop for "Intercultural communication diversity dialogue circle communicating across differences"',
                source: 'https://x.com/DOGE/status/1888046273543979183'
            }
        ];

        // Sort data in descending order for the table
        const sortedTableData = [...mockData].sort((a, b) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        // Sort data chronologically for the graph
        const sortedGraphData = [...mockData].sort((a, b) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        // Create cumulative data for graph
        const cumulativeData = sortedGraphData.reduce((acc: { date: string; amount: number; }[], entry) => {
            const lastEntry = acc[acc.length - 1];
            const amount = entry.amount + (lastEntry?.amount || 0);

            if (lastEntry && lastEntry.date === entry.date) {
                lastEntry.amount = amount;
                return acc;
            } else {
                return [...acc, { date: entry.date, amount }];
            }
        }, []);

        setData(sortedTableData);  // Table data in DESC order
        setGraphData(cumulativeData);  // Graph data stays chronological
    }, []);

    const Row = ({ index, style }: { index: number; style: React.CSSProperties; }) => {
        const entry = data[index];
        return (
            <div
                style={{
                    ...style,
                    display: 'grid',
                    gridTemplateColumns: '150px 200px 1fr 100px',
                    borderBottom: '1px solid #e5e7eb',
                }}
                className="hover:bg-gray-50 transition-colors"
            >
                <div className="p-5 text-gray-900">
                    {format(new Date(entry.date), 'MM/dd/yyyy')}
                </div>
                <div className="p-5 text-gray-900 font-medium">
                    ${entry.amount.toLocaleString()}
                </div>
                <div className="p-5 text-gray-600 whitespace-pre-wrap leading-relaxed">
                    {entry.description}
                </div>
                <div className="p-5">
                    <a
                        href={entry.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                        Source
                    </a>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="w-full py-12 bg-white border-b border-gray-200 mb-8">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="text-3xl font-medium text-gray-600 mb-4">Total Savings</div>
                    <div className="text-8xl font-black tracking-tight">
                        ${data.reduce((sum, entry) => sum + entry.amount, 0).toLocaleString()}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6">
                <div className="h-[400px] mb-8 bg-white p-4 rounded-lg border border-gray-200">
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={graphData}>
                            <XAxis
                                dataKey="date"
                                tickFormatter={(date) => format(new Date(date), 'MM/dd')}
                                angle={-45}
                                textAnchor="end"
                                height={60}
                            />
                            <YAxis
                                tickFormatter={(value) => `$${(value / 1000000000).toFixed(1)}B`}
                            />
                            <Line
                                type="monotone"
                                dataKey="amount"
                                stroke="#10B981"
                                strokeWidth={2}
                                dot={{ fill: '#10B981', strokeWidth: 2 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="rounded-lg border border-gray-200 overflow-hidden bg-white">
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '150px 200px 1fr 100px',
                            padding: '20px',
                        }}
                        className="bg-gray-50 border-b border-gray-200 font-semibold text-gray-700"
                    >
                        <div>Date</div>
                        <div>Amount</div>
                        <div>Description</div>
                        <div>Source</div>
                    </div>

                    <div className="bg-white">
                        <FixedSizeList
                            height={600}
                            width="100%"
                            itemCount={data.length}
                            itemSize={140}
                            overscanCount={5}
                        >
                            {Row}
                        </FixedSizeList>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard; 