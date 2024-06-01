import PropTypes from "prop-types";
import BaseButton from "./BaseButton";
import { PencilIcon } from "../Icons/PencilIcon.tsx";
import classNames from "classnames";
import styles from "./Buttons.module.css";
import {ButtonProps} from "@/components/Buttons/types.ts";

function EditButton({ size, onClick, iconClassName } : ButtonProps) {
  return (
    <BaseButton
      size={size}
      onClick={onClick}
      icon={
        <PencilIcon
          className={classNames(iconClassName, styles.defaultIcon)}
        ></PencilIcon>
      }
    ></BaseButton>
  );
}

EditButton.propTypes = {
  size: PropTypes.string,
  onClick: PropTypes.func,
  iconClassName: PropTypes.string,
};

export default EditButton;
