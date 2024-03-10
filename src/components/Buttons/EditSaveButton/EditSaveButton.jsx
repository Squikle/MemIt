import PropTypes from "prop-types";
import BaseButton from "../BaseButton";
import { FloppyDiskIcon } from "../../Icons/FloppyDiskIcon";
import { PencilIcon } from "../../Icons/PencilIcon";
import classname from "classname";
import styles from "../Buttons.module.css";

function EditSaveButton({ size, onClick, iconClassName, isEditing }) {
  const icon = isEditing ? (
    <FloppyDiskIcon
      style={{ margin: "1px 0 0 0" }}
      className={classname(iconClassName, styles.defaultIcon)}
    />
  ) : (
    <PencilIcon className={classname(iconClassName, styles.defaultIcon)} />
  );
  console.log("icon", icon);
  console.log("size", size);

  return <BaseButton size={size} onClick={onClick} icon={icon}></BaseButton>;
}

EditSaveButton.propTypes = {
  size: PropTypes.string,
  onClick: PropTypes.func,
  isEditing: PropTypes.bool,
  iconClassName: PropTypes.string,
};

export default EditSaveButton;
