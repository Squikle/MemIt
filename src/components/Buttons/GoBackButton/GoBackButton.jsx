import PropTypes from "prop-types";
import BaseButton from "../BaseButton";
import { LeftArrowIcon } from "../../Icons/LeftArrowIcon";
import classname from "classname";
import styles from "./GoBackButton.module.css";
import { useNavigate } from "react-router-dom";

function GoBackButton({ size, onClick, style, hideOnNarrow = true, ...props }) {
  const navigate = useNavigate();

  const handleClick = onClick || (() => navigate(-1));
  const buttonSize = size || "4em";

  return (
    <div
      className={classname(styles.backButton, styles.rollout, {
        [styles.wideScreenOnly]: hideOnNarrow,
      })}
    >
      <BaseButton
        size={buttonSize}
        onClick={handleClick}
        Icon={LeftArrowIcon}
        style={style}
        {...props}
      ></BaseButton>
    </div>
  );
}

GoBackButton.propTypes = {
  size: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object,
  hideOnNarrow: PropTypes.bool,
};

export default GoBackButton;
