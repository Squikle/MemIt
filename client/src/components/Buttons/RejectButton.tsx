import BaseButton from "./BaseButton";
import { CrossMarkIcon } from "../Icons/CrossMarkIcon.tsx";
import classNames from "classnames";
import styles from "./Buttons.module.scss";
import {ButtonProps} from "@/components/Buttons/types.ts";

function RejectButton({ size, onClick, iconClassName } : ButtonProps) {
  return (
    <BaseButton
      size={size}
      onClick={onClick}
      icon={
        <CrossMarkIcon
          className={classNames(styles.defaultIcon, iconClassName)}
        ></CrossMarkIcon>
      }
    ></BaseButton>
  );
}

export default RejectButton;
