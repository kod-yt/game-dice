import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import { FiLock } from "react-icons/fi";

interface Props {
  text: string;
  locked?: boolean;
  clickFn?: Function;
}

const TextOption: React.FC<Props> = ({ text, locked, clickFn = () => {} }: Props) => {
  return (
    <div className={styles.textoptioncontainer} onClick={() => clickFn()}>
      {locked && (
        <div className={styles.icon}>
          <FiLock />
        </div>
      )}
      <h2 className={styles.textoption}>{text}</h2>
    </div>
  );
};

export default TextOption;
