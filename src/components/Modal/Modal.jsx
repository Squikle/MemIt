import classname from "classname";
import cssStyles from "./Modal.module.css";
import PropTypes from "prop-types";

export function Modal(props) {
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
            className={classname(cssStyles.cancel, cssStyles.button)}
            onClick={onCancel}
          >
            cancel
          </button>
          <button
            className={classname(cssStyles.confirm, cssStyles.button)}
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
