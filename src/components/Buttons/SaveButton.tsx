import BaseButton from "./BaseButton";
import { FloppyDiskIcon } from "../Icons/FloppyDiskIcon.tsx";
import classNames from "classnames";
import styles from "./Buttons.module.css";
import {ButtonProps} from "@/components/Buttons/types.ts";

function SaveButton({ size, onClick, iconClassName } : ButtonProps) {
  return (
    <BaseButton
      size={size}
      onClick={onClick}
      icon={
        <FloppyDiskIcon
          className={classNames(iconClassName, styles.defaultIcon)}
        ></FloppyDiskIcon>
      }
    ></BaseButton>
  );
}

export default SaveButton;
