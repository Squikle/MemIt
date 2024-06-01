import classNames from "classnames";
import cssStyles from "./Modal.module.css";
import PropTypes from "prop-types";
import {CSSProperties, ReactNode} from "react";

type ModalProps = {
  children: ReactNode,
  onConfirm: () => void,
  onCancel: () => void,
  style: CSSProperties, 
  isOpen: boolean
}

export function Modal(props : ModalProps) {
  const { children, onConfirm, onCancel, style, isOpen } = props;

  if (!isOpen) return;

  return (
    <div className={cssStyles.container} onClick={onCancel}>
      <div
        style={style}
        className={cssStyles.body}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <div className={cssStyles.buttons}>
          <button
            className={classNames(cssStyles.cancel, cssStyles.button)}
            onClick={onCancel}
          >
            cancel
          </button>
          <button
            className={classNames(cssStyles.confirm, cssStyles.button)}
            onClick={onConfirm}
          >
            confirm
          </button>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  style: PropTypes.object,
  isOpen: PropTypes.bool,
};
