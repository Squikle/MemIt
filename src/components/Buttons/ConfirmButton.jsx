import PropTypes from "prop-types";
import BaseButton from "./BaseButton";
import { CheckMarkIcon } from "../Icons/CheckMarkIcon";

function ConfirmButton({ size, onClick, style, ...props }) {
  return (
    <BaseButton
      size={size}
      onClick={onClick}
      Icon={CheckMarkIcon}
      style={style}
      {...props}
    ></BaseButton>
  );
}

ConfirmButton.propTypes = {
  size: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object,
};

export default ConfirmButton;
