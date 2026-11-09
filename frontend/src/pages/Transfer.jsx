import { useState } from "react";
import { ArrowLeftRight, ArrowRight, Wallet, CheckCircle } from "lucide-react";

import Card from "../components/common/Card";
import PageHeader from "../components/common/PageHeader";
import Button from "../components/common/Button";
import Input from "../components/common/Input";

function Transfer() {
  const [formData, setFormData] = useState({
    fromAccount: "",
    toAccount: "",
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

    if (formData.fromAccount === formData.toAccount) {
      setMessage("Source and destination accounts must be different.");
      return;
    }

    if (Number(formData.amount) <= 0) {
      setMessage("Please enter a valid transfer amount.");
      return;
    }

    setMessage("Transfer form validated. Backend integration is pending.");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Money Transfer"
        description="Transfer funds securely between accounts."
      />

      <div className="mx-auto max-w-3xl">
        <Card>
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
              <ArrowLeftRight size={24} />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Transfer Details
              </h3>
              <p className="text-sm text-gray-500">
                Enter the details of your transfer.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Source account */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                From Account
              </label>

              <select
                name="fromAccount"
                value={formData.fromAccount}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">Select source account</option>
                <option value="1001">LL10000001</option>
                <option value="1002">LL10000002</option>
              </select>
            </div>

            {/* Transfer icon */}
            <div className="flex justify-center">
              <div className="rounded-full bg-blue-50 p-3 text-blue-600">
                <ArrowRight size={22} />
              </div>
            </div>

            {/* Destination account */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                To Account
              </label>

              <select
                name="toAccount"
                value={formData.toAccount}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">Select destination account</option>
                <option value="1001">LL10000001</option>
                <option value="1002">LL10000002</option>
              </select>
            </div>

            {/* Amount */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Transfer Amount (₹)
              </label>

              <Input
                name="amount"
                inputType="number"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Enter amount"
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
                placeholder="Enter transfer description"
                rows="3"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Message */}
            {message && (
              <div className="rounded-lg bg-blue-50 p-3 text-sm text-blue-700">
                {message}
              </div>
            )}

            <Button type="submit" block>
              <ArrowLeftRight size={18} />
              Review Transfer
            </Button>
          </form>
        </Card>

        {/* Security information */}
        <div className="mt-5 flex items-start gap-3 rounded-xl border border-green-100 bg-green-50 p-4">
          <CheckCircle className="mt-0.5 text-green-600" size={20} />

          <div>
            <p className="text-sm font-semibold text-green-800">
              Secure Transfers
            </p>
            <p className="mt-1 text-xs text-green-700">
              Transfers will be validated and processed by the backend with
              transaction integrity and duplicate-request protection.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transfer;
