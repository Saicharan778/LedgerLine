function PageHeader({ title, description, action }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>

        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>

      {action && <div>{action}</div>}
    </div>
  );
}

export default PageHeader;
