export const InputField = ({ label, type, value, onChange, options }) => {
  return (
    <div>
      <label>
        {label}:
        {type === 'select' ? (
          <select value={value} onChange={onChange}>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input type={type} value={value} onChange={onChange} />
        )}
      </label>
    </div>
  );
};
