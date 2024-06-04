import styles from "./Buttons.module.scss";
import React, {ReactNode} from "react";

type Props = {
  size?: string,
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
  icon: ReactNode
}

function BaseButton({ size, onClick, icon } : Props) {
  const sizeStyle = size ? { width: size, height: size } : {};

  return (
    <button className={styles.button} onClick={onClick} style={sizeStyle}>
      {icon}
    </button>
  );
}

export default BaseButton;
