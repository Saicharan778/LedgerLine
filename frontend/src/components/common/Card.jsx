function Card({ title, value, description, icon, children }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{title}</p>
        {icon}
      </div>

      <h2 className="mt-3 text-2xl font-bold text-gray-800">{value}</h2>

      {description && (
        <p className="mt-2 text-xs text-gray-500">{description}</p>
      )}

      {children}
    </div>
  );
}

export default Card;
