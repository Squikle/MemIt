import PropTypes from "prop-types";
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

SaveButton.propTypes = {
  size: PropTypes.string,
  onClick: PropTypes.func,
  iconClassName: PropTypes.string,
};

export default SaveButton;
