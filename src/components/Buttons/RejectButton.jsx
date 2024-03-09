import PropTypes from "prop-types";
import BaseButton from "./BaseButton";
import { CrossMarkIcon } from "../Icons/CrossMarkIcon";

function ConfirmButton({ size, onClick, style, ...props }) {
  return (
    <BaseButton
      size={size}
      onClick={onClick}
      Icon={CrossMarkIcon}
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
