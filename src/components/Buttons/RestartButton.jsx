import PropTypes from "prop-types";
import BaseButton from "./BaseButton";
import classname from "classname";
import styles from "./Buttons.module.css";
import { ArrowsRotateIcon } from "../Icons/ArrowsRotateIcon";

function RestartButton({ size, onClick, iconClassName }) {
  return (
    <BaseButton
      size={size}
      onClick={onClick}
      icon={
        <ArrowsRotateIcon
          className={classname(styles.defaultIcon, iconClassName)}
        ></ArrowsRotateIcon>
      }
    ></BaseButton>
  );
}

RestartButton.propTypes = {
  size: PropTypes.string,
  onClick: PropTypes.func,
  iconClassName: PropTypes.string,
};

export default RestartButton;
