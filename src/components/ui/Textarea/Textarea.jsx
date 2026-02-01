import css from "./Textarea.module.css";

function Textarea({ label, error, ...props }) {
  return (
    <label className={css.label}>
      {label}
      <textarea className={css.textarea} {...props} />
      {error && <div className={css.error}>{error}</div>}
    </label>
  );
}

export default Textarea;
