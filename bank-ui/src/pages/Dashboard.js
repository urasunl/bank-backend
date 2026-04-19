import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

function Dashboard({ token }) {
    const [transfers, setTransfers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/transfer", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => setTransfers(data));
    }, [token]);

    // 📊 METRİKLER
    const total = transfers.length;
    const pending = transfers.filter(t => t.status === "PENDING").length;
    const approved = transfers.filter(t => t.status === "APPROVED").length;
    const totalAmount = transfers.reduce((sum, t) => sum + t.amount, 0);

    // 📈 GRAFİK (GERÇEK DATA)
    const group = {};

    transfers.forEach(t => {
        const date = t.createdAt
            ? new Date(t.createdAt).toLocaleDateString()
            : "NoDate";

        group[date] = (group[date] || 0) + 1;
    });

    const labels = Object.keys(group);
    const values = Object.values(group);

    const chartData = {
        labels,
        datasets: [
            {
                label: "Günlük Transfer",
                data: values,
                borderColor: "#3b82f6",
                backgroundColor: "#3b82f6",
                tension: 0.4
            }
        ]
    };

    return (
        <div className="p-6 space-y-6">

            <h2 className="text-2xl font-bold">Dashboard</h2>

            {/* 🔥 KARTLAR */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                <Card title="Toplam Transfer" value={total} delay={0} />
                <Card title="Bekleyen" value={pending} delay={0.1} color="yellow" />
                <Card title="Onaylanan" value={approved} delay={0.2} color="green" />
                <Card title="Toplam Tutar" value={totalAmount} delay={0.3} color="blue" />

            </div>

            {/* 📊 GRAFİK */}
            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow">
                <h3 className="font-semibold mb-4">Günlük İşlem Grafiği</h3>
                <Line data={chartData} />
            </div>

            {/* 📋 SON İŞLEMLER */}
            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow">

                <h3 className="font-semibold mb-4">Son İşlemler</h3>

                <table className="w-full text-sm text-center">

                    <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                        <th>ID</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                    </thead>

                    <tbody>
                    {transfers.slice(-5).map(t => (
                        <tr key={t.id} className="border-b dark:border-gray-700">

                            <td>{t.id}</td>
                            <td>{t.fromUser}</td>
                            <td>{t.toUser}</td>
                            <td>{t.amount}</td>

                            <td>
                                {t.status === "PENDING" && "⏳"}
                                {t.status === "APPROVED" && "✅"}
                            </td>

                        </tr>
                    ))}
                    </tbody>

                </table>

            </div>

        </div>
    );
}

// 🔥 CARD COMPONENT
function Card({ title, value, delay, color }) {

    let bg = "bg-white dark:bg-gray-800";

    if (color === "yellow") bg = "bg-yellow-100 dark:bg-yellow-900";
    if (color === "green") bg = "bg-green-100 dark:bg-green-900";
    if (color === "blue") bg = "bg-blue-100 dark:bg-blue-900";

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            whileHover={{ scale: 1.05 }}
            className={`${bg} p-5 rounded-xl shadow`}
        >
            <p className="text-sm">{title}</p>
            <h3 className="text-2xl font-bold">{value}</h3>
        </motion.div>
    );
}

export default Dashboard;