import PropTypes from "prop-types";
import BaseButton from "./BaseButton";
import { CheckMarkIcon } from "../Icons/CheckMarkIcon";
import classname from "classname";
import styles from "./Buttons.module.css";

function ConfirmButton({ size, onClick, iconClassName }) {
  return (
    <BaseButton
      size={size}
      onClick={onClick}
      icon={
        <CheckMarkIcon
          className={classname(styles.defaultIcon, iconClassName)}
        ></CheckMarkIcon>
      }
    ></BaseButton>
  );
}

ConfirmButton.propTypes = {
  size: PropTypes.string,
  onClick: PropTypes.func,
  iconClassName: PropTypes.string,
};

export default ConfirmButton;
