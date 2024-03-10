import PropTypes from "prop-types";
import BaseButton from "./BaseButton";
import { FloppyDiskIcon } from "../Icons/FloppyDiskIcon";

function SaveButton({ size, onClick, style, ...props }) {
  return (
    <BaseButton
      size={size}
      onClick={onClick}
      Icon={FloppyDiskIcon}
      style={style}
      {...props}
    ></BaseButton>
  );
}

SaveButton.propTypes = {
  size: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object,
};

export default SaveButton;
