import PropTypes from "prop-types";
import BaseButton from "../BaseButton";
import { LeftArrowIcon } from "../../Icons/LeftArrowIcon";
import classname from "classname";
import goBackStyles from "./GoBackButton.module.css";
import { useNavigate } from "react-router-dom";
import styles from "../Buttons.module.css";

function GoBackButton({ size, onClick, iconClassName, hideOnNarrow = true }) {
  const navigate = useNavigate();

  const handleClick = onClick || (() => navigate(-1));
  const buttonSize = size || "4em";

  return (
    <div
      className={classname(goBackStyles.backButton, goBackStyles.rollout, {
        [goBackStyles.wideScreenOnly]: hideOnNarrow,
      })}
    >
      <BaseButton
        size={buttonSize}
        onClick={handleClick}
        icon={
          <LeftArrowIcon
            className={classname(iconClassName, styles.defaultIcon)}
            style={{ width: buttonSize, height: buttonSize }}
          ></LeftArrowIcon>
        }
      ></BaseButton>
    </div>
  );
}

GoBackButton.propTypes = {
  size: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object,
  hideOnNarrow: PropTypes.bool,
  iconClassName: PropTypes.string,
};

export default GoBackButton;
