import BaseButton from "./BaseButton";
import { TrashIcon } from "../Icons/TrashIcon.tsx";
import classNames from "classnames";
import styles from "./Buttons.module.css";
import {ButtonProps} from "@/components/Buttons/types.ts";

function DeleteButton({ size, onClick, iconClassName } : ButtonProps) {
  return (
    <BaseButton
      size={size}
      onClick={onClick}
      icon={
        <TrashIcon
          className={classNames(iconClassName, styles.defaultIcon)}
        ></TrashIcon>
      }
    ></BaseButton>
  );
}

export default DeleteButton;
