import PropTypes from "prop-types";
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

DeleteButton.propTypes = {
  size: PropTypes.string,
  onClick: PropTypes.func,
  iconClassName: PropTypes.string,
};

export default DeleteButton;
