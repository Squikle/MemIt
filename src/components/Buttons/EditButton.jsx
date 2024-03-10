import PropTypes from "prop-types";
import BaseButton from "./BaseButton";
import { PencilIcon } from "../Icons/PencilIcon";
import classname from "classname";
import styles from "./Buttons.module.css";

function EditButton({ size, onClick, iconClassName }) {
  return (
    <BaseButton
      size={size}
      onClick={onClick}
      icon={
        <PencilIcon
          className={classname(iconClassName, styles.defaultIcon)}
        ></PencilIcon>
      }
    ></BaseButton>
  );
}

EditButton.propTypes = {
  size: PropTypes.string,
  onClick: PropTypes.func,
  iconClassName: PropTypes.string,
};

export default EditButton;
