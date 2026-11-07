import { Search, Plus, Wallet } from "lucide-react";

function Accounts() {
  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Accounts</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and monitor your bank accounts.
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          <Plus size={18} />
          Create Account
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3">
        <Search size={19} className="text-gray-400" />

        <input
          type="text"
          placeholder="Search by account number..."
          className="w-full text-sm outline-none"
        />
      </div>

      {/* Accounts table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-200 p-5">
          <h2 className="font-semibold text-gray-800">All Accounts</h2>
        </div>

        <div className="flex flex-col items-center justify-center py-16">
          <Wallet size={40} className="text-gray-300" />

          <h3 className="mt-4 font-semibold text-gray-700">
            No accounts found
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Accounts will appear here once they are created.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Accounts;
