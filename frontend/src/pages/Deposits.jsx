import { ArrowDownToLine, Wallet } from "lucide-react";

function Deposits() {
  const handleDeposit = (e) => {
    e.preventDefault();
    alert("Deposit functionality will be connected to the backend later.");
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Deposit Money</h1>
        <p className="mt-1 text-sm text-gray-500">Add money to your account.</p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-lg bg-green-50 p-3">
            <ArrowDownToLine className="text-green-600" size={22} />
          </div>

          <div>
            <h2 className="font-semibold text-gray-800">New Deposit</h2>
            <p className="text-sm text-gray-500">
              Enter your deposit details below.
            </p>
          </div>
        </div>

        <form onSubmit={handleDeposit} className="space-y-5">
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
                Select destination account
              </option>
              <option value="account-1">Account ending 1234</option>
              <option value="account-2">Account ending 5678</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Deposit Amount (₹)
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
              placeholder="Enter deposit description"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div className="rounded-lg bg-green-50 p-4">
            <div className="flex items-center gap-2 text-sm text-green-700">
              <Wallet size={18} />
              <span>
                Your account balance will be updated after a successful deposit.
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-green-600 px-4 py-3 font-medium text-white hover:bg-green-700"
          >
            Deposit Money
          </button>
        </form>
      </div>
    </div>
  );
}

export default Deposits;
