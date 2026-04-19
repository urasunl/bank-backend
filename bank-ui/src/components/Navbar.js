function Navbar({ dark, setDark, setOpen }) {
    return (
        <div className="flex justify-between items-center px-6 py-3 bg-white dark:bg-gray-800 shadow">

            {/* LEFT */}
            <div className="flex items-center gap-4">

                {/* ☰ HAMBURGER (mobil) */}
                <button
                    className="md:hidden text-2xl"
                    onClick={() => setOpen(true)}
                >
                    ☰
                </button>

                <h1 className="text-xl font-bold">🏦 Bank Admin</h1>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-4">

                {/* 🌙 DARK MODE */}
                <button
                    onClick={() => setDark(!dark)}
                    className="px-3 py-1 bg-gray-800 text-white rounded"
                >
                    {dark ? "☀️" : "🌙"}
                </button>

                {/* USER */}
                <div className="hidden md:flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                    <span>admin</span>
                </div>

            </div>
        </div>
    );
}

export default Navbar;