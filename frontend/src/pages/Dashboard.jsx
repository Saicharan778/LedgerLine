import {
  Wallet,
  ArrowDownToLine,
  ArrowUpFromLine,
  ArrowLeftRight,
} from "lucide-react";

import Card from "../components/common/Card";
import PageHeader from "../components/common/PageHeader";

const statistics = [
  {
    title: "Total Balance",
    value: "₹0.00",
    change: "Across all accounts",
    icon: Wallet,
    iconStyle: "bg-blue-50 text-blue-600",
  },
  {
    title: "Total Deposits",
    value: "₹0.00",
    change: "Total money received",
    icon: ArrowDownToLine,
    iconStyle: "bg-green-50 text-green-600",
  },
  {
    title: "Total Withdrawals",
    value: "₹0.00",
    change: "Total money withdrawn",
    icon: ArrowUpFromLine,
    iconStyle: "bg-red-50 text-red-600",
  },
  {
    title: "Total Transfers",
    value: "0",
    change: "Completed transfers",
    icon: ArrowLeftRight,
    iconStyle: "bg-purple-50 text-purple-600",
  },
];

function Dashboard() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description="Overview of your financial activities."
      />

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {statistics.map((item) => {
          const Icon = item.icon;

          return (
            <Card key={item.title}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {item.title}
                  </p>

                  <h3 className="mt-3 text-2xl font-bold text-gray-900">
                    {item.value}
                  </h3>

                  <p className="mt-2 text-xs text-gray-500">{item.change}</p>
                </div>

                <div className={`rounded-xl p-3 ${item.iconStyle}`}>
                  <Icon size={22} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Transactions */}
      <Card>
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Transactions
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Your latest financial activities.
            </p>
          </div>

          <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
            View all
          </button>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[600px] text-left">
            <thead>
              <tr className="border-b text-xs uppercase text-gray-500">
                <th className="px-4 py-3">Transaction</th>
                <th className="px-4 py-3">Account</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td colSpan="5" className="py-12 text-center">
                  <div className="flex flex-col items-center">
                    <Wallet className="text-gray-300" size={36} />

                    <p className="mt-3 font-medium text-gray-700">
                      No transactions yet
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Your financial activities will appear here.
                    </p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export default Dashboard;
