import styles from "./Buttons.module.css";
import PropTypes from "prop-types";
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

BaseButton.propTypes = {
  size: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object,
  icon: PropTypes.object,
};

export default BaseButton;
