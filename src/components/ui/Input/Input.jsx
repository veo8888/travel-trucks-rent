import css from "./Input.module.css";

function Input({ label, error, ...props }) {
  return (
    <label className={css.label}>
      {label}
      <input className={css.input} {...props} />
      {error && <div className={css.error}>{error}</div>}
    </label>
  );
}

export default Input;
