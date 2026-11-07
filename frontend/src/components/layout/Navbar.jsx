import { Bell, UserCircle } from "lucide-react";

function Navbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-8">
      <div>
        <h2 className="text-lg font-semibold text-gray-800">
          Financial Dashboard
        </h2>
      </div>

      <div className="flex items-center gap-5">
        <button className="text-gray-500 hover:text-blue-700">
          <Bell size={21} />
        </button>

        <div className="flex items-center gap-2">
          <UserCircle size={30} className="text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Admin</span>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
