import { useState } from "react";
import { Plus, Search, Wallet, X } from "lucide-react";

import Card from "../components/common/Card";
import PageHeader from "../components/common/PageHeader";
import Button from "../components/common/Button";
import Input from "../components/common/Input";

function Accounts() {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [accounts, setAccounts] = useState([]);

  const [formData, setFormData] = useState({
    accountHolder: "",
    accountType: "Savings",
    initialDeposit: "",
  });

  const filteredAccounts = accounts.filter((account) =>
    account.accountHolder.toLowerCase().includes(search.toLowerCase()),
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newAccount = {
      id: Date.now(),
      accountNumber: `LL${Date.now().toString().slice(-8)}`,
      accountHolder: formData.accountHolder,
      accountType: formData.accountType,
      balance: Number(formData.initialDeposit),
      status: "Active",
    };

    setAccounts([...accounts, newAccount]);

    setFormData({
      accountHolder: "",
      accountType: "Savings",
      initialDeposit: "",
    });

    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Accounts"
        description="Manage and monitor customer accounts."
      />

      {/* Account summary */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Accounts</p>
              <h3 className="mt-2 text-2xl font-bold text-gray-900">
                {accounts.length}
              </h3>
            </div>
            <Wallet className="text-blue-600" size={28} />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Accounts</p>
              <h3 className="mt-2 text-2xl font-bold text-gray-900">
                {accounts.filter((a) => a.status === "Active").length}
              </h3>
            </div>
            <div className="h-3 w-3 rounded-full bg-green-500" />
          </div>
        </Card>
      </div>

      {/* Accounts table */}
      <Card>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              All Accounts
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              View and manage customer accounts.
            </p>
          </div>

          <Button onClick={() => setShowModal(true)}>
            <Plus size={18} />
            Create Account
          </Button>
        </div>

        <div className="relative mt-6 max-w-sm">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search account holder..."
            className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[650px] text-left">
            <thead>
              <tr className="border-b bg-gray-50 text-xs uppercase text-gray-500">
                <th className="px-4 py-3">Account Number</th>
                <th className="px-4 py-3">Account Holder</th>
                <th className="px-4 py-3">Account Type</th>
                <th className="px-4 py-3">Balance</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredAccounts.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-12 text-center">
                    <Wallet className="mx-auto text-gray-300" size={36} />
                    <p className="mt-3 font-medium text-gray-700">
                      No accounts found
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Create an account to get started.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredAccounts.map((account) => (
                  <tr key={account.id} className="border-b last:border-0">
                    <td className="px-4 py-4 font-medium text-gray-800">
                      {account.accountNumber}
                    </td>
                    <td className="px-4 py-4 text-gray-700">
                      {account.accountHolder}
                    </td>
                    <td className="px-4 py-4 text-gray-700">
                      {account.accountType}
                    </td>
                    <td className="px-4 py-4 font-medium text-gray-800">
                      ₹{account.balance.toFixed(2)}
                    </td>
                    <td className="px-4 py-4">
                      <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                        {account.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Create account modal */}
      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Create New Account
              </h3>

              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Account Holder
                </label>
                <Input
                  name="accountHolder"
                  value={formData.accountHolder}
                  onChange={handleChange}
                  placeholder="Enter account holder name"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Account Type
                </label>
                <select
                  name="accountType"
                  value={formData.accountType}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                >
                  <option value="Savings">Savings</option>
                  <option value="Current">Current</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Initial Deposit (₹)
                </label>
                <Input
                  name="initialDeposit"
                  inputType="number"
                  value={formData.initialDeposit}
                  onChange={handleChange}
                  placeholder="Enter initial deposit"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </Button>

                <Button type="submit">Create Account</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Accounts;
