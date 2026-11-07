import { ArrowUpFromLine, Wallet, AlertCircle } from "lucide-react";

function Withdrawals() {
  const handleWithdrawal = (e) => {
    e.preventDefault();
    alert("Withdrawal functionality will be connected to the backend later.");
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Withdraw Money</h1>
        <p className="mt-1 text-sm text-gray-500">
          Withdraw money from your account.
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-lg bg-red-50 p-3">
            <ArrowUpFromLine className="text-red-600" size={22} />
          </div>

          <div>
            <h2 className="font-semibold text-gray-800">New Withdrawal</h2>
            <p className="text-sm text-gray-500">
              Enter your withdrawal details below.
            </p>
          </div>
        </div>

        <form onSubmit={handleWithdrawal} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Select Account
            </label>

            <select
              required
              defaultValue=""
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
            >
              <option value="" disabled>
                Select source account
              </option>
              <option value="account-1">Account ending 1234</option>
              <option value="account-2">Account ending 5678</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Withdrawal Amount (₹)
            </label>

            <input
              type="number"
              min="0.01"
              step="0.01"
              required
              placeholder="Enter amount"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Description
            </label>

            <textarea
              rows="3"
              placeholder="Enter withdrawal description"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div className="rounded-lg bg-red-50 p-4">
            <div className="flex items-center gap-2 text-sm text-red-700">
              <AlertCircle size={18} />
              <span>
                Withdrawals cannot exceed the available account balance.
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-red-600 px-4 py-3 font-medium text-white hover:bg-red-700"
          >
            Withdraw Money
          </button>
        </form>
      </div>
    </div>
  );
}

export default Withdrawals;
