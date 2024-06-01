import PropTypes from "prop-types";
import BaseButton from "./BaseButton";
import classNames from "classnames";
import styles from "./Buttons.module.css";
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

RestartButton.propTypes = {
  size: PropTypes.string,
  onClick: PropTypes.func,
  iconClassName: PropTypes.string,
};

export default RestartButton;
