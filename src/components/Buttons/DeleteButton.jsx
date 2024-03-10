import PropTypes from "prop-types";
import BaseButton from "./BaseButton";
import { TrashIcon } from "../Icons/TrashIcon";
import classname from "classname";
import styles from "./Buttons.module.css";

function DeleteButton({ size, onClick, iconClassName }) {
  return (
    <BaseButton
      size={size}
      onClick={onClick}
      icon={
        <TrashIcon
          className={classname(iconClassName, styles.defaultIcon)}
        ></TrashIcon>
      }
    ></BaseButton>
  );
}

DeleteButton.propTypes = {
  size: PropTypes.string,
  onClick: PropTypes.func,
  iconClassName: PropTypes.string,
};

export default DeleteButton;
