// import StatusCard from 'components/StatusCard';
// import ChartLine from 'components/ChartLine';
// import ChartBar from 'components/ChartBar';
// import PageVisitsCard from 'components/PageVisitsCard';
// import TrafficCard from 'components/TrafficCard';

// export default function Dashboard() {
//     return (
//         <>
//             <div className="bg-light-blue-500 px-3 md:px-8 h-40" />

//             <div className="px-3 md:px-8 -mt-24">
//                 <div className="container mx-auto max-w-full">
//                     <div className="grid grid-cols-1 xl:grid-cols-5">
//                         <div className="xl:col-start-1 xl:col-end-4 px-4 mb-14">
//                             <ChartLine />
//                         </div>
//                         <div className="xl:col-start-4 xl:col-end-6 px-4 mb-14">
//                             <ChartBar />
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className="px-3 md:px-8">
//                 <div className="container mx-auto max-w-full">
//                     <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 mb-4">
//                         <StatusCard
//                             color="pink"
//                             icon="trending_up"
//                             title="Traffic"
//                             amount="350,897"
//                             percentage="3.48"
//                             percentageIcon="arrow_upward"
//                             percentageColor="green"
//                             date="Since last month"
//                         />
//                         <StatusCard
//                             color="orange"
//                             icon="groups"
//                             title="New Users"
//                             amount="2,356"
//                             percentage="3.48"
//                             percentageIcon="arrow_downward"
//                             percentageColor="red"
//                             date="Since last week"
//                         />
//                         <StatusCard
//                             color="purple"
//                             icon="paid"
//                             title="Sales"
//                             amount="924"
//                             percentage="1.10"
//                             percentageIcon="arrow_downward"
//                             percentageColor="orange"
//                             date="Since yesterday"
//                         />
//                         <StatusCard
//                             color="blue"
//                             icon="poll"
//                             title="Performance"
//                             amount="49,65%"
//                             percentage="12"
//                             percentageIcon="arrow_upward"
//                             percentageColor="green"
//                             date="Since last month"
//                         />
//                     </div>
//                 </div>
//             </div>

//             <div className="px-3 md:px-8 h-auto">
//                 <div className="container mx-auto max-w-full">
//                     <div className="grid grid-cols-1 xl:grid-cols-5">
//                         <div className="xl:col-start-1 xl:col-end-4 px-4 mb-14">
//                             <PageVisitsCard />
//                         </div>
//                         <div className="xl:col-start-4 xl:col-end-6 px-4 mb-14">
//                             <TrafficCard />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }
import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    LineElement,
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
);

const DashboardPage = () => {
    const lineChartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: '2025',
                data: [60, 75, 70, 40, 45, 65, 85],
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                fill: true,
            },
            {
                label: '2024',
                data: [10, 55, 85, 70, 60, 45, 70],
                borderColor: '#f97316',
                backgroundColor: 'rgba(249, 115, 22, 0.2)',
                fill: true,
            },
        ],
    };

    const barChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
            {
                label: '2025',
                backgroundColor: '#3b82f6',
                data: [40, 60, 70, 55, 30, 90, 85],
            },
            {
                label: '2024',
                backgroundColor: '#ef4444',
                data: [30, 40, 60, 35, 70, 20, 60],
            },
        ],
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
                <StatCard title="Traffic" value="350,897" growth="↑ 3.48%" color="rose" />
                <StatCard title="New Users" value="2,356" growth="↓ 3.48%" color="amber" />
                <StatCard title="Sales" value="924" growth="↓ 1.10%" color="purple" />
                <StatCard title="Performance" value="49.65%" growth="↑ 12%" color="blue" />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
                <ChartCard title="Sales Value" chart={<Line data={lineChartData} />} color="orange" />
                <ChartCard title="Sales Value" chart={<Bar data={barChartData} />} color="pink" />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <DataTable />
                <SocialMediaPanel />
            </div>
        </div>
    );
};

const StatCard = ({ title, value, growth, color }) => (
    <div className={`bg-white rounded-lg p-4 shadow-md border-l-8 border-${color}-500`}>
        <p className="text-gray-500 font-semibold">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
        <p className={`text-sm text-${color}-600 font-medium mt-1`}>{growth} Since last period</p>
    </div>
);

const ChartCard = ({ title, chart, color }) => (
    <div className={`bg-white rounded-lg p-6 shadow-md`}>
        <h2 className={`text-${color}-600 font-bold text-lg mb-4 uppercase`}>{title}</h2>
        {chart}
    </div>
);

const DataTable = () => (
    <div className="bg-white rounded-lg p-6 shadow-md">
        <h2 className="text-blue-600 font-bold text-lg mb-4 uppercase">Page Visits</h2>
        <table className="w-full text-left table-auto">
            <thead>
                <tr className="text-gray-600 font-semibold border-b">
                    <th className="p-2">ID</th>
                    <th className="p-2">Name</th>
                    <th className="p-2">Salary</th>
                    <th className="p-2">Country</th>
                </tr>
            </thead>
            <tbody>
                <tr className="border-b">
                    <td className="p-2">1</td>
                    <td className="p-2">Dakota Rice</td>
                    <td className="p-2">$36,738</td>
                    <td className="p-2">Niger</td>
                </tr>
                <tr className="border-b">
                    <td className="p-2">2</td>
                    <td className="p-2">Minerva Hooper</td>
                    <td className="p-2">$23,789</td>
                    <td className="p-2">Curaçao</td>
                </tr>
            </tbody>
        </table>
    </div>
);

const SocialMediaPanel = () => (
    <div className="bg-white rounded-lg p-6 shadow-md">
        <h2 className="text-purple-600 font-bold text-lg mb-4 uppercase">Social Media</h2>
        <div className="space-y-4">
            <ProgressRow platform="Facebook" count={1480} color="blue" />
            <ProgressRow platform="Google" count={4807} color="red" />
        </div>
    </div>
);

const ProgressRow = ({ platform, count, color }) => (
    <div>
        <div className="flex justify-between mb-1 text-sm text-gray-700 font-medium">
            <span>{platform}</span>
            <span>{count}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
            <div
                className={`bg-${color}-500 h-2 rounded-full`}
                style={{ width: `${Math.min((count / 5000) * 100, 100)}%` }}
            ></div>
        </div>
    </div>
);

export default DashboardPage;