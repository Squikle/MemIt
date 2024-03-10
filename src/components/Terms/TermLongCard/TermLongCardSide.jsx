import PropTypes from "prop-types";
import styles from "./TermLongCardSide.module.css";
import { useId, useRef } from "react";

export function TermLongCardSide({ text, image, isEditing, editTextRef }) {
  const contentId = useId();
  const editingRef = useRef();

  const editingContent = (
    <div className={styles.text} key={`${contentId}-editing`} ref={editTextRef}>
      <div
        ref={editingRef}
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

  const handleContentClick = (e) => {
    if (!isEditing) return;

    const input = editingRef.current?.lastChild;
    if (input && e.target !== input && e.target !== editingRef.current) {
      const range = document.createRange();
      const sel = window.getSelection();

      range.setStart(input, input.length);
      range.collapse(true);

      sel.removeAllRanges();
      sel.addRange(range);
    } else {
      editingRef.current.focus();
    }
  };

  return (
    <div className={styles.content} onClick={handleContentClick}>
      {image && <img src={image}></img>}
      {isEditing ? editingContent : staticContent}
    </div>
  );
}

TermLongCardSide.propTypes = {
  text: PropTypes.node,
  image: PropTypes.string,
  isEditing: PropTypes.bool,
  editTextRef: PropTypes.object,
};
