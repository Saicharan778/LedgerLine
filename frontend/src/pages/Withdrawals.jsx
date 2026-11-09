import { useState } from "react";
import { ArrowUpFromLine, CheckCircle } from "lucide-react";

import Card from "../components/common/Card";
import PageHeader from "../components/common/PageHeader";
import Button from "../components/common/Button";
import Input from "../components/common/Input";

function Withdrawals() {
  const [formData, setFormData] = useState({
    account: "",
    amount: "",
    description: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Number(formData.amount) <= 0) {
      setMessage("Please enter a valid withdrawal amount.");
      return;
    }

    setMessage("Withdrawal form validated. Backend integration is pending.");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Withdrawals"
        description="Withdraw funds from customer accounts."
      />

      <div className="mx-auto max-w-2xl">
        <Card>
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-red-50 p-3 text-red-600">
              <ArrowUpFromLine size={24} />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Withdrawal Details
              </h3>
              <p className="text-sm text-gray-500">
                Enter the withdrawal information below.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Source account */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Source Account
              </label>

              <select
                name="account"
                value={formData.account}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
              >
                <option value="">Select account</option>
                <option value="1001">LL10000001</option>
                <option value="1002">LL10000002</option>
              </select>
            </div>

            {/* Amount */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Withdrawal Amount (₹)
              </label>

              <Input
                name="amount"
                inputType="number"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Enter withdrawal amount"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter withdrawal description"
                rows="3"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
              />
            </div>

            {/* Feedback */}
            {message && (
              <div className="rounded-lg bg-blue-50 p-3 text-sm text-blue-700">
                {message}
              </div>
            )}

            <Button type="submit" block variant="danger">
              <ArrowUpFromLine size={18} />
              Review Withdrawal
            </Button>
          </form>
        </Card>

        {/* Security information */}
        <div className="mt-5 flex items-start gap-3 rounded-xl border border-amber-100 bg-amber-50 p-4">
          <CheckCircle className="mt-0.5 text-amber-600" size={20} />

          <div>
            <p className="text-sm font-semibold text-amber-800">
              Withdrawal Protection
            </p>
            <p className="mt-1 text-xs text-amber-700">
              The backend will verify account authorization and available
              balance before processing a withdrawal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Withdrawals;
