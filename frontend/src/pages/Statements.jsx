import { FileText, Search, Download } from "lucide-react";

function Statements() {
  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Account Statements
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            View your account transaction history.
          </p>
        </div>

        <button
          disabled
          className="flex cursor-not-allowed items-center gap-2 rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-500"
        >
          <Download size={18} />
          Export Statement
        </button>
      </div>

      {/* Filters */}
      <div className="grid gap-4 rounded-xl border border-gray-200 bg-white p-5 md:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Select Account
          </label>

          <select
            defaultValue=""
            className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm outline-none focus:border-blue-500"
          >
            <option value="" disabled>
              Select account
            </option>
            <option value="account-1">Account ending 1234</option>
            <option value="account-2">Account ending 5678</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            From Date
          </label>

          <input
            type="date"
            className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            To Date
          </label>

          <input
            type="date"
            className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Transactions */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="flex items-center justify-between border-b border-gray-200 p-5">
          <h2 className="font-semibold text-gray-800">Transaction History</h2>

          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Search size={17} />
            <span>Transactions</span>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center py-16">
          <FileText size={40} className="text-gray-300" />

          <h3 className="mt-4 font-semibold text-gray-700">
            No transactions found
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Your account transactions will appear here.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Statements;
