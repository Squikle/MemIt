import PropTypes from "prop-types";
import BaseButton from "./BaseButton";
import { PencilIcon } from "../Icons/PencilIcon";

function EditButton({ size, onClick, style, ...props }) {
  return (
    <BaseButton
      size={size}
      onClick={onClick}
      Icon={PencilIcon}
      style={style}
      {...props}
    ></BaseButton>
  );
}

EditButton.propTypes = {
  size: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object,
};

export default EditButton;
