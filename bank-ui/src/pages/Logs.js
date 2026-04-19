import { useEffect, useState } from "react";

function Logs({ token }) {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/logs", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => setLogs(data));
    }, []);

    return (
        <div className="p-6 space-y-6">

            <h2 className="text-2xl font-bold">Logs</h2>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">

                <table className="w-full text-sm text-center">

                    <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                        <th>ID</th>
                        <th>Action</th>
                        <th>User</th>
                        <th>Date</th>
                    </tr>
                    </thead>

                    <tbody>
                    {logs.map(log => (
                        <tr key={log.id} className="border-b dark:border-gray-700">

                            <td>{log.id}</td>
                            <td className="font-semibold">{log.action}</td>
                            <td>{log.username}</td>
                            <td>{new Date(log.createdAt).toLocaleString()}</td>

                        </tr>
                    ))}
                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default Logs;