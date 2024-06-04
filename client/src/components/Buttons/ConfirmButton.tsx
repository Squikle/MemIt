import BaseButton from "./BaseButton";
import { CheckMarkIcon } from "../Icons/CheckMarkIcon.tsx";
import classNames from "classnames";
import styles from "./Buttons.module.scss";
import {ButtonProps} from "@/components/Buttons/types.ts";

function ConfirmButton({ size, onClick, iconClassName } : ButtonProps) {
  return (
    <BaseButton
      size={size}
      onClick={onClick}
      icon={
        <CheckMarkIcon
          className={classNames(styles.defaultIcon, iconClassName)}
        ></CheckMarkIcon>
      }
    ></BaseButton>
  );
}

export default ConfirmButton;
