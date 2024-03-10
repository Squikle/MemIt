import PropTypes from "prop-types";
import BaseButton from "./BaseButton";
import { FloppyDiskIcon } from "../Icons/FloppyDiskIcon";
import classname from "classname";
import styles from "./Buttons.module.css";

function SaveButton({ size, onClick, iconClassName }) {
  return (
    <BaseButton
      size={size}
      onClick={onClick}
      icon={
        <FloppyDiskIcon
          className={classname(iconClassName, styles.defaultIcon)}
        ></FloppyDiskIcon>
      }
    ></BaseButton>
  );
}

SaveButton.propTypes = {
  size: PropTypes.string,
  onClick: PropTypes.func,
  iconClassName: PropTypes.string,
};

export default SaveButton;
