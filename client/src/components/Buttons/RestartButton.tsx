import BaseButton from "./BaseButton";
import classNames from "classnames";
import styles from "./Buttons.module.scss";
import { ArrowsRotateIcon } from "../Icons/ArrowsRotateIcon.tsx";
import {ButtonProps} from "@/components/Buttons/types.ts";

function RestartButton({ size, onClick, iconClassName } : ButtonProps) {
  return (
    <BaseButton
      size={size}
      onClick={onClick}
      icon={
        <ArrowsRotateIcon
          className={classNames(styles.defaultIcon, iconClassName)}
        ></ArrowsRotateIcon>
      }
    ></BaseButton>
  );
}

export default RestartButton;
