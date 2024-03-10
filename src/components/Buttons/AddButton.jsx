import PropTypes from "prop-types";
import BaseButton from "./BaseButton";
import { PlusIcon } from "../Icons/PlusIcon";
import classname from "classname";
import styles from "./Buttons.module.css";

function AddButton({ size, onClick, iconClassName }) {
  return (
    <BaseButton
      size={size}
      onClick={onClick}
      icon={
        <PlusIcon
          className={classname(iconClassName, styles.defaultIcon)}
        ></PlusIcon>
      }
    ></BaseButton>
  );
}

AddButton.propTypes = {
  size: PropTypes.string,
  onClick: PropTypes.func,
  iconClassName: PropTypes.string,
};

export default AddButton;
