function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  min,
  step,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        min={min}
        step={step}
        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500"
      />
    </div>
  );
}

export default Input;
