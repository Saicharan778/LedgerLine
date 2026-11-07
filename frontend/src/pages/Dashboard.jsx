import {
  Wallet,
  ArrowDownToLine,
  ArrowUpFromLine,
  ArrowLeftRight,
} from "lucide-react";

import Card from "../components/common/Card";
import PageHeader from "../components/common/PageHeader";

function Dashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Welcome to your LedgerLine financial overview."
      />

      {/* Summary Cards */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <Card
          title="Total Balance"
          value="₹0.00"
          icon={<Wallet size={22} className="text-blue-600" />}
        />

        <Card
          title="Total Deposits"
          value="₹0.00"
          icon={<ArrowDownToLine size={22} className="text-green-600" />}
        />

        <Card
          title="Total Withdrawals"
          value="₹0.00"
          icon={<ArrowUpFromLine size={22} className="text-red-600" />}
        />

        <Card
          title="Total Transfers"
          value="0"
          icon={<ArrowLeftRight size={22} className="text-purple-600" />}
        />
      </div>

      {/* Recent Transactions */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">
            Recent Transactions
          </h2>

          <span className="text-sm text-blue-600">View all</span>
        </div>

        <div className="py-12 text-center">
          <p className="text-sm text-gray-500">
            No transactions available yet.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
