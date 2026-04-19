import { motion } from "framer-motion";

function Sidebar({ setPage, open, setOpen }) {
    return (
        <>
            {/* OVERLAY (mobilde arka plan karartma) */}
            {open && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
                    onClick={() => setOpen(false)}
                ></div>
            )}

            {/* SIDEBAR */}
            <div
                className={`fixed md:static z-50 top-0 left-0 h-full w-64 bg-gray-900 text-white p-5 transform 
        ${open ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 transition-transform duration-300`}
            >
                <h2 className="text-2xl font-bold mb-8">🏦 Bank Panel</h2>

                <nav className="flex flex-col gap-3">

                    <MenuItem label="📊 Dashboard" onClick={() => { setPage("dashboard"); setOpen(false); }} />
                    <MenuItem label="💸 Transfers" onClick={() => { setPage("transfers"); setOpen(false); }} />
                    <MenuItem label="📜 Logs" onClick={() => { setPage("logs"); setOpen(false); }} />

                </nav>

                <div className="mt-auto text-sm text-gray-400">
                    v1.0 Admin Panel
                </div>
            </div>
        </>
    );
}

// 🔥 ANİMASYONLU MENU ITEM
function MenuItem({ label, onClick }) {
    return (
        <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#374151" }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className="text-left px-4 py-2 rounded-lg transition"
        >
            {label}
        </motion.button>
    );
}

export default Sidebar;