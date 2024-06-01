import PropTypes from "prop-types";
import BaseButton from "./BaseButton";
import { CrossMarkIcon } from "../Icons/CrossMarkIcon.tsx";
import classNames from "classnames";
import styles from "./Buttons.module.css";
import {ButtonProps} from "@/components/Buttons/types.tsx";

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

RejectButton.propTypes = {
  size: PropTypes.string,
  onClick: PropTypes.func,
  iconClassName: PropTypes.string,
};

export default RejectButton;
