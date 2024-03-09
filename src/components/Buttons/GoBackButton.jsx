import PropTypes from "prop-types";
import BaseButton from "./BaseButton";
import { LeftArrowIcon } from "../Icons/LeftArrowIcon";

function GoBackButton({ size, onClick, style, ...props }) {
  return (
    <BaseButton
      size={size}
      onClick={onClick}
      Icon={LeftArrowIcon}
      style={style}
      {...props}
    ></BaseButton>
  );
}

GoBackButton.propTypes = {
  size: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object,
};

export default GoBackButton;
