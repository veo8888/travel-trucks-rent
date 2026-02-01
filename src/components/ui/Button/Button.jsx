import css from "./Button.module.css";

function Button({ children, variant = "primary", ...props }) {
  return (
    <button className={`${css.button} ${css[variant]}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
