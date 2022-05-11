import type { FC } from "react";

import styles from "./Input.module.css";

type Props = {
  name: string;
  label: string;
  required?: boolean;
};

const Input: FC<Props> = ({ name, label, required = true }) => {
  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input
        className={styles.input}
        type="text"
        name={name}
        id={name}
        required={required}
      />
    </div>
  );
};

export default Input;
