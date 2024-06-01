import PropTypes from "prop-types";
import BaseButton from "../BaseButton.tsx";
import { FloppyDiskIcon } from "../../Icons/FloppyDiskIcon.tsx";
import { PencilIcon } from "../../Icons/PencilIcon.tsx";
import classNames from "classnames";
import styles from "../Buttons.module.css";
import {ButtonProps} from "@/components/Buttons/types.ts";

type EditSaveButtonProps = ButtonProps & {
  isEditing: boolean
}

function EditSaveButton({ size, onClick, iconClassName, isEditing } : EditSaveButtonProps) {
  const icon = isEditing ? (
    <FloppyDiskIcon
      style={{ margin: "1px 0 0 0" }}
      className={classNames(iconClassName, styles.defaultIcon)}
    />
  ) : (
    <PencilIcon className={classNames(iconClassName, styles.defaultIcon)} />
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
