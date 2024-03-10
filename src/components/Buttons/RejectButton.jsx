import PropTypes from "prop-types";
import BaseButton from "./BaseButton";
import { CrossMarkIcon } from "../Icons/CrossMarkIcon";
import classname from "classname";
import styles from "./Buttons.module.css";

function RejectButton({ size, onClick, iconClassName }) {
  return (
    <BaseButton
      size={size}
      onClick={onClick}
      icon={
        <CrossMarkIcon
          className={classname(iconClassName, styles.defaultIcon)}
        ></CrossMarkIcon>
      }
    ></BaseButton>
  );
}

RejectButton.propTypes = {
  size: PropTypes.string,
  onClick: PropTypes.func,
  iconClassName: PropTypes.string,
};

export default RejectButton;
