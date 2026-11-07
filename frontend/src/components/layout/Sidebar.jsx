import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  ArrowDownToLine,
  ArrowUpFromLine,
  FileText,
  ShieldCheck,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Accounts", path: "/accounts", icon: Wallet },
  { name: "Transfers", path: "/transfers", icon: ArrowLeftRight },
  { name: "Deposits", path: "/deposits", icon: ArrowDownToLine },
  { name: "Withdrawals", path: "/withdrawals", icon: ArrowUpFromLine },
  { name: "Statements", path: "/statements", icon: FileText },
  { name: "Audit Logs", path: "/audit-logs", icon: ShieldCheck },
];

function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col border-r border-gray-200 bg-white p-5">
      <h1 className="mb-10 text-2xl font-bold text-blue-700">LedgerLine</h1>

      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <Icon size={19} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-auto text-xs text-gray-400">LedgerLine © 2026</div>
    </aside>
  );
}

export default Sidebar;
