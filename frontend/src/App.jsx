import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./pages/Dashboard";
import Accounts from "./pages/Accounts";
import Transfer from "./pages/Transfer";
import Deposits from "./pages/Deposits";
import Withdrawals from "./pages/Withdrawals";
import Statements from "./pages/Statements";
import AuditLogs from "./pages/AuditLogs";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Sidebar />

        <div className="ml-64">
          <Navbar />

          <main className="p-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/accounts" element={<Accounts />} />
              <Route path="/transfers" element={<Transfer />} />
              <Route path="/deposits" element={<Deposits />} />
              <Route path="/withdrawals" element={<Withdrawals />} />
              <Route path="/statements" element={<Statements />} />
              <Route path="/audit-logs" element={<AuditLogs />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
