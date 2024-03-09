import styles from "./Buttons.module.css";
import PropTypes from "prop-types";

function BaseButton({ size, onClick, Icon, style, ...props }) {
  const buttonSize = size || "1.3em";

  const buttonStyle = {
    ...style,
    width: "100%",
    height: "100%",
  };

  return (
    <button
      className={styles.button}
      style={buttonStyle}
      onClick={onClick}
      {...props}
    >
      <Icon width={buttonSize} height={buttonSize}></Icon>
    </button>
  );
}

BaseButton.propTypes = {
  size: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object,
  Icon: PropTypes.elementType,
};

export default BaseButton;
