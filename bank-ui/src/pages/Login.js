import { useState } from "react";
import { login } from "../services/api";

function Login({ setToken }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        const res = await login({ username, password });
        setToken(res.token);
        localStorage.setItem("token", res.token);
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white p-8 rounded-xl shadow w-80">

                <h2 className="text-2xl font-bold mb-6 text-center">
                    Bank Login
                </h2>

                <input
                    className="w-full mb-3 p-2 border rounded"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    className="w-full mb-4 p-2 border rounded"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Login
                </button>

            </div>

        </div>
    );
}

export default Login;