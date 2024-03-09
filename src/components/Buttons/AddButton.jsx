import PropTypes from "prop-types";
import BaseButton from "./BaseButton";
import { PlusIcon } from "../Icons/PlusIcon";

function AddButton({ size, onClick, style, ...props }) {
  return (
    <BaseButton
      size={size}
      onClick={onClick}
      Icon={PlusIcon}
      style={style}
      {...props}
    ></BaseButton>
  );
}

AddButton.propTypes = {
  size: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object,
};

export default AddButton;
