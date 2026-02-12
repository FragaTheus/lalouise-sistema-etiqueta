export type InputProps = {
  label: string;
  type: string;
  name: string;
  options?: string[];
};

export function Input({ label, type, name, options }: InputProps) {
  const inputId = `id-${name}`;
  const baseClass =
    "rounded-sm p-1 border border-foreground/20 transition-all outline-none focus:bg-background focus:ring-2 focus:ring-primary/70";

  return (
    <div className="flex flex-col gap-1 mb-3">
      <label htmlFor={inputId} className="font-bold cursor-pointer">
        <small>{label}</small>
      </label>

      {options ? (
        <select id={inputId} name={name} className={baseClass}>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={inputId}
          name={name}
          type={type}
          required
          className={baseClass}
        />
      )}
    </div>
  );
}
