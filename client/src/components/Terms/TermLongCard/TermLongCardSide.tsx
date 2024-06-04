import styles from "./TermLongCardSide.module.scss";
import React, {RefObject, useId, useRef} from "react";

type Props = {
  text?: string,
  image?: string,
  isEditing: boolean,
  editTextRef: RefObject<HTMLDivElement>,
}

export function TermLongCardSide({ text, image, isEditing, editTextRef }: Props) {
  const contentId = useId();
  const editingRef = useRef<HTMLDivElement>(null);

  const editingContent = (
    <div className={styles.text} key={`${contentId}-editing`} ref={editTextRef}>
      <div
        ref={editingRef}
        contentEditable="plaintext-only"
        suppressContentEditableWarning={true}
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

  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isEditing) return;

    const input = editingRef.current?.lastChild as Text;
    if (input && e.target !== input && e.target !== editingRef.current) {
      const range = document.createRange();
      const sel = window.getSelection();

      range.setStart(input, input.length);
      range.collapse(true);

      sel?.removeAllRanges();
      sel?.addRange(range);
    } else {
      editingRef.current?.focus();
    }
  };

  return (
    <div className={styles.content} onClick={handleContentClick}>
      {image && <img src={image}></img>}
      {isEditing ? editingContent : staticContent}
    </div>
  );
}