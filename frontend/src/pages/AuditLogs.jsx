import { useState } from "react";
import {
  ShieldCheck,
  Search,
  Activity,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

import Card from "../components/common/Card";
import PageHeader from "../components/common/PageHeader";

function AuditLogs() {
  const [search, setSearch] = useState("");
  const [eventType, setEventType] = useState("all");

  const [logs] = useState([]);

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.actor.toLowerCase().includes(search.toLowerCase());

    const matchesType = eventType === "all" || log.type === eventType;

    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Audit Logs"
        description="Monitor financial activities and security events."
      />

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Events</p>
              <h3 className="mt-2 text-2xl font-bold text-gray-900">
                {logs.length}
              </h3>
            </div>

            <Activity className="text-blue-600" size={28} />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Successful Events</p>
              <h3 className="mt-2 text-2xl font-bold text-gray-900">
                {logs.filter((log) => log.status === "Success").length}
              </h3>
            </div>

            <CheckCircle className="text-green-600" size={28} />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Failed Events</p>
              <h3 className="mt-2 text-2xl font-bold text-gray-900">
                {logs.filter((log) => log.status === "Failed").length}
              </h3>
            </div>

            <AlertTriangle className="text-red-600" size={28} />
          </div>
        </Card>
      </div>

      {/* Audit log table */}
      <Card>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Activity History
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Review recorded system events.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-6 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search action or user..."
              className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
          >
            <option value="all">All Events</option>
            <option value="authentication">Authentication</option>
            <option value="financial">Financial Activity</option>
            <option value="account">Account Management</option>
            <option value="security">Security Events</option>
          </select>
        </div>

        {/* Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[750px] text-left">
            <thead>
              <tr className="border-b bg-gray-50 text-xs uppercase text-gray-500">
                <th className="px-4 py-3">Event ID</th>
                <th className="px-4 py-3">Actor</th>
                <th className="px-4 py-3">Action</th>
                <th className="px-4 py-3">Event Type</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-14 text-center">
                    <ShieldCheck size={38} className="mx-auto text-gray-300" />

                    <p className="mt-3 font-medium text-gray-700">
                      No audit events found
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Recorded activities will appear here.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="border-b last:border-0">
                    <td className="px-4 py-4 font-medium text-gray-800">
                      {log.id}
                    </td>

                    <td className="px-4 py-4 text-gray-700">{log.actor}</td>

                    <td className="px-4 py-4 text-gray-700">{log.action}</td>

                    <td className="px-4 py-4 text-gray-700">{log.type}</td>

                    <td className="px-4 py-4 text-gray-700">{log.date}</td>

                    <td className="px-4 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          log.status === "Success"
                            ? "bg-green-50 text-green-700"
                            : "bg-red-50 text-red-700"
                        }`}
                      >
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Security information */}
      <div className="flex items-start gap-3 rounded-xl border border-amber-100 bg-amber-50 p-4">
        <ShieldCheck className="mt-0.5 text-amber-600" size={20} />

        <div>
          <p className="text-sm font-semibold text-amber-800">
            Audit Log Protection
          </p>

          <p className="mt-1 text-xs text-amber-700">
            Audit records should be append-only. Application users must not be
            able to modify or delete historical audit events.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuditLogs;
