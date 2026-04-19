const API = "http://localhost:8080";

export const login = async (data) => {
    const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    return res.json();
};

export const getSecure = async (token) => {
    const res = await fetch(`${API}/api/secure`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return res.text();
};