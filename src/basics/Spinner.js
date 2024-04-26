import styles from "./spinner.module.css";
const ButtonSpinner = ({ border, borderTop }) => {
  return (
    <div
      className={styles["small-button-loader"]}
      style={{
        border: `2px solid ${border}`,
        borderTop: `2px solid ${borderTop}`,
      }}
    ></div>
  );
};

const Loader = () => {
  return (
    <div className={styles["loader"]}>
      <div className={styles["spinner"]}></div>
      <div className={styles["loading_text"]}>please wait...</div>
    </div>
  );
};

const LoginLoader = () => {
  return (
    <div className={styles["login-loader"]}>
      <div className={styles["login-spinner"]}></div>
    </div>
  );
};
export { ButtonSpinner, Loader, LoginLoader };
