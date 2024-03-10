import styles from "./Buttons.module.css";
import PropTypes from "prop-types";

function BaseButton({ size, onClick, icon }) {
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
