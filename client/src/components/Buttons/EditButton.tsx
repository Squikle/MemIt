import BaseButton from "./BaseButton";
import { PencilIcon } from "../Icons/PencilIcon.tsx";
import classNames from "classnames";
import styles from "./Buttons.module.scss";
import {ButtonProps} from "@/components/Buttons/types.ts";

function EditButton({ size, onClick, iconClassName } : ButtonProps) {
  return (
    <BaseButton
      size={size}
      onClick={onClick}
      icon={
        <PencilIcon
          className={classNames(iconClassName, styles.defaultIcon)}
        ></PencilIcon>
      }
    ></BaseButton>
  );
}

export default EditButton;
