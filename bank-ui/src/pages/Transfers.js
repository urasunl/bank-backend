import { useEffect, useState } from "react";

function Transfers({ token }) {
    const [transfers, setTransfers] = useState([]);

    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [amount, setAmount] = useState("");

    // 📥 GET ALL
    const loadTransfers = () => {
        fetch("http://localhost:8080/transfer", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => setTransfers(data));
    };

    useEffect(() => {
        loadTransfers();
    }, []);

    // 💸 CREATE TRANSFER
    const createTransfer = () => {
        fetch(`http://localhost:8080/transfer?from=${from}&to=${to}&amount=${amount}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(() => {
            loadTransfers();
            setFrom("");
            setTo("");
            setAmount("");
        });
    };

    // ✅ APPROVE
    const approve = (id) => {
        fetch(`http://localhost:8080/transfer/approve/${id}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(() => loadTransfers());
    };

    return (
        <div className="p-6 space-y-6">

            <h2 className="text-2xl font-bold">Transfers</h2>

            {/* 💸 CREATE FORM */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow flex gap-3">

                <input
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    placeholder="From"
                    className="p-2 border rounded"
                />

                <input
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    placeholder="To"
                    className="p-2 border rounded"
                />

                <input
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount"
                    className="p-2 border rounded"
                />

                <button
                    onClick={createTransfer}
                    className="bg-blue-500 text-white px-4 rounded"
                >
                    Create
                </button>

            </div>

            {/* 📋 LIST */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">

                <table className="w-full text-center">

                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    </thead>

                    <tbody>
                    {transfers.map(t => (
                        <tr key={t.id} className="border-t">

                            <td>{t.id}</td>
                            <td>{t.fromUser}</td>
                            <td>{t.toUser}</td>
                            <td>{t.amount}</td>
                            <td>{t.status}</td>

                            <td>
                                {t.status === "PENDING" && (
                                    <button
                                        onClick={() => approve(t.id)}
                                        className="bg-green-500 text-white px-2 rounded"
                                    >
                                        Approve
                                    </button>
                                )}
                            </td>

                        </tr>
                    ))}
                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default Transfers;