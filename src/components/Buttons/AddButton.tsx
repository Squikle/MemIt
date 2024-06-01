import BaseButton from "./BaseButton.tsx";
import { PlusIcon } from "../Icons/PlusIcon.tsx";
import classNames from "classnames";
import styles from "./Buttons.module.css";
import {ButtonProps} from "@/components/Buttons/types.ts";

function AddButton({ size, onClick, iconClassName } : ButtonProps) {
  return (
    <BaseButton
      size={size}
      onClick={onClick}
      icon={
        <PlusIcon
          className={classNames(iconClassName, styles.defaultIcon)}
        ></PlusIcon>
      }
    ></BaseButton>
  );
}

export default AddButton;
