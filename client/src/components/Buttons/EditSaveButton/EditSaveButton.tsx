import BaseButton from "../BaseButton.tsx";
import { FloppyDiskIcon } from "../../Icons/FloppyDiskIcon.tsx";
import { PencilIcon } from "../../Icons/PencilIcon.tsx";
import classNames from "classnames";
import styles from "../Buttons.module.scss";
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

  return <BaseButton size={size} onClick={onClick} icon={icon}></BaseButton>;
}

export default EditSaveButton;
