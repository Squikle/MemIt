import PropTypes from "prop-types";
import styles from "./LongCardSide.module.css";
import { useId } from "react";

export function LongCardSide({ text, image, isEditing, editTextRef }) {
  const contentId = useId();

  const editingContent = (
    <div className={styles.text} key={`${contentId}-editing`} ref={editTextRef}>
      <div
        contentEditable="plaintext-only"
        suppressContentEditableWarning="true"
      >
        {text}
      </div>
    </div>
  );

  const staticContent = (
    <div className={styles.text} key={`${contentId}-static`}>
      {text}
    </div>
  );

  return (
    <div className={styles.content}>
      {image && <img src={image}></img>}
      {isEditing ? editingContent : staticContent}
    </div>
  );
}

LongCardSide.propTypes = {
  text: PropTypes.node,
  image: PropTypes.string,
  isEditing: PropTypes.bool,
  editTextRef: PropTypes.object,
};
