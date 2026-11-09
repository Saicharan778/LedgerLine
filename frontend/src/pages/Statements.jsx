import { useState } from "react";
import { FileText, Download, Search } from "lucide-react";

import Card from "../components/common/Card";
import PageHeader from "../components/common/PageHeader";
import Button from "../components/common/Button";

function Statements() {
  const [filters, setFilters] = useState({
    account: "",
    startDate: "",
    endDate: "",
    type: "all",
  });

  const [transactions] = useState([]);

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const filteredTransactions = transactions.filter((transaction) => {
    return (
      (filters.type === "all" || transaction.type === filters.type) &&
      (!filters.startDate || transaction.date >= filters.startDate) &&
      (!filters.endDate || transaction.date <= filters.endDate)
    );
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Statements"
        description="View and review account transaction history."
      />

      {/* Filters */}
      <Card>
        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
            <Search size={22} />
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">Statement Filters</h3>
            <p className="text-sm text-gray-500">
              Filter transactions by account and date.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Account
            </label>

            <select
              name="account"
              value={filters.account}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
            >
              <option value="">All Accounts</option>
              <option value="1001">LL10000001</option>
              <option value="1002">LL10000002</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Start Date
            </label>

            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              End Date
            </label>

            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleChange}
              min={filters.startDate || undefined}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Transaction Type
            </label>

            <select
              name="type"
              value={filters.type}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
            >
              <option value="all">All Transactions</option>
              <option value="deposit">Deposits</option>
              <option value="withdrawal">Withdrawals</option>
              <option value="transfer">Transfers</option>
              <option value="refused">Refused Attempts</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Statement table */}
      <Card>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Transaction History
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              {filteredTransactions.length} transactions found
            </p>
          </div>

          <Button variant="secondary" disabled>
            <Download size={18} />
            Export Statement
          </Button>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[750px] text-left">
            <thead>
              <tr className="border-b bg-gray-50 text-xs uppercase text-gray-500">
                <th className="px-4 py-3">Transaction ID</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-14 text-center">
                    <FileText size={38} className="mx-auto text-gray-300" />

                    <p className="mt-3 font-medium text-gray-700">
                      No transactions found
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Transaction history will appear here.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b">
                    <td className="px-4 py-4">{transaction.id}</td>
                    <td className="px-4 py-4">{transaction.description}</td>
                    <td className="px-4 py-4">{transaction.type}</td>
                    <td className="px-4 py-4">{transaction.date}</td>
                    <td className="px-4 py-4 font-medium">
                      ₹{transaction.amount}
                    </td>
                    <td className="px-4 py-4">{transaction.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Statement information */}
      <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
        <div className="flex items-start gap-3">
          <FileText className="mt-0.5 text-blue-600" size={20} />

          <div>
            <p className="text-sm font-semibold text-blue-800">
              Account Statement
            </p>

            <p className="mt-1 text-xs text-blue-700">
              Statements will include successful transactions and refused
              transaction attempts for authorized accounts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statements;
