import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Transfers from "./pages/Transfers";
import Logs from "./pages/Logs";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [page, setPage] = useState("dashboard");
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);

  if (!token) return <Login setToken={setToken} />;

  return (
      <div className={dark ? "dark bg-gray-900 text-white min-h-screen flex" : "min-h-screen flex"}>

        {/* SIDEBAR */}
        <Sidebar setPage={setPage} open={open} setOpen={setOpen} />

        {/* MAIN */}
        <div className="flex-1 flex flex-col">

          {/* NAVBAR */}
          <Navbar dark={dark} setDark={setDark} setOpen={setOpen} />

          {/* CONTENT */}
          <div className="p-4">
            {page === "dashboard" && <Dashboard token={token} />}
            {page === "transfers" && <Transfers token={token} />}
            {page === "logs" && <Logs token={token} />}
          </div>

        </div>
      </div>
  );
}

export default App;