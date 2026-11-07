import { ShieldCheck, Search, Filter } from "lucide-react";

function AuditLogs() {
  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Audit Logs</h1>

        <p className="mt-1 text-sm text-gray-500">
          Monitor and review system activities.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid gap-5 md:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">Total Activities</p>
          <h2 className="mt-2 text-2xl font-bold text-gray-800">0</h2>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">Successful Activities</p>
          <h2 className="mt-2 text-2xl font-bold text-green-600">0</h2>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">Refused Activities</p>
          <h2 className="mt-2 text-2xl font-bold text-red-600">0</h2>
        </div>
      </div>

      {/* Audit log table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 p-5">
          <h2 className="font-semibold text-gray-800">Activity History</h2>

          <div className="flex gap-3">
            <div className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2">
              <Search size={17} className="text-gray-400" />

              <input
                type="text"
                placeholder="Search activities..."
                className="w-40 text-sm outline-none"
              />
            </div>

            <button className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50">
              <Filter size={17} />
              Filter
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center py-16">
          <ShieldCheck size={40} className="text-gray-300" />

          <h3 className="mt-4 font-semibold text-gray-700">
            No audit records found
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            System activities will appear here.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuditLogs;
