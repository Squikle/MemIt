import PropTypes from "prop-types";
import BaseButton from "../BaseButton";
import { FloppyDiskIcon } from "../../Icons/FloppyDiskIcon";
import { PencilIcon } from "../../Icons/PencilIcon";

function EditSaveButton({ size, onClick, isEditing }) {
  const icon = isEditing ? FloppyDiskIcon : PencilIcon;
  const iconStyle = isEditing ? { margin: "1px 0 0 0" } : {};
  return (
    <BaseButton
      size={size}
      onClick={onClick}
      Icon={icon}
      iconStyle={iconStyle}
    ></BaseButton>
  );
}

EditSaveButton.propTypes = {
  size: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object,
  isEditing: PropTypes.bool,
};

export default EditSaveButton;
