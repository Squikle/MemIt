import PropTypes from "prop-types";
import BaseButton from "../BaseButton.tsx";
import { LeftArrowIcon } from "../../Icons/LeftArrowIcon.tsx";
import classNames from "classnames";
import goBackStyles from "./GoBackButton.module.css";
import { useNavigate } from "react-router-dom";
import styles from "../Buttons.module.css";
import {ButtonProps} from "@/components/Buttons/types.ts";

type BackButtonProps = Omit<ButtonProps, 'onClick'> & {
    hideOnNarrow: boolean;
} & Partial<Pick<ButtonProps, 'onClick'>>;

function GoBackButton({ size, onClick, iconClassName, hideOnNarrow = true } : BackButtonProps) {
  const navigate = useNavigate();

  const handleClick = onClick || (() => navigate(-1));
  const buttonSize = size || "4em";

  return (
    <div
      className={classNames(goBackStyles.backButton, goBackStyles.rollout, {
        [goBackStyles.wideScreenOnly]: hideOnNarrow,
      })}
    >
      <BaseButton
        size={buttonSize}
        onClick={handleClick}
        icon={
          <LeftArrowIcon
            className={classNames(iconClassName, styles.defaultIcon)}
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
