import { useRef, useState } from "react";
import styles from "./LongCard.module.css";
import PropTypes from "prop-types";
import { LongCardSide } from "./LongCardSide";
import classname from "classname";
import { useDispatch, useSelector } from "react-redux";
import { termUpdated, termDeleted } from "../../store/terms";
import { Modal } from "../Modal/Modal";

function LongCard({ termId }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const term = useSelector((state) =>
    state.entities.terms.find((x) => x.id === termId)
  );

  const editExpressionRef = useRef();
  const editTranslationRef = useRef();
  const dispatch = useDispatch();

  const handleEditClick = () => {
    if (isEditing == true) {
      const newExpression =
        editExpressionRef.current.innerText || term.expression;
      const newTranslation =
        editTranslationRef.current.innerText || term.translation;

      dispatch(
        termUpdated({
          ...term,
          expression: newExpression,
          translation: newTranslation,
        })
      );
    }

    setIsEditing((x) => !x);
  };

  const handleRemoveClick = () => {
    setIsDeleting(true);
  };

  const confirmRemoving = () => {
    setIsDeleting(false);
    dispatch(termDeleted(termId));
  };

  const cancelRemoving = () => {
    setIsDeleting(false);
  };

  const editIcon = (
    <svg
      className={styles.editIcon}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z" />
    </svg>
  );

  const saveIcon = (
    <svg
      className={styles.saveIcon}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
    >
      <path d="M48 96V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V170.5c0-4.2-1.7-8.3-4.7-11.3l33.9-33.9c12 12 18.7 28.3 18.7 45.3V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96C0 60.7 28.7 32 64 32H309.5c17 0 33.3 6.7 45.3 18.7l74.5 74.5-33.9 33.9L320.8 84.7c-.3-.3-.5-.5-.8-.8V184c0 13.3-10.7 24-24 24H104c-13.3 0-24-10.7-24-24V80H64c-8.8 0-16 7.2-16 16zm80-16v80H272V80H128zm32 240a64 64 0 1 1 128 0 64 64 0 1 1 -128 0z" />
    </svg>
  );

  const trashIcon = (
    <svg
      className={styles.trashIcon}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
    >
      <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
    </svg>
  );

  return (
    <div className={styles.card}>
      <Modal
        onCancel={cancelRemoving}
        onConfirm={confirmRemoving}
        isOpen={isDeleting}
        style={{
          height: "40%",
          width: "26%",
        }}
      >
        <h1>Remove this term?</h1>
      </Modal>
      <div className={styles.buttons}>
        <button className={styles.cardButton} onClick={handleRemoveClick}>
          {trashIcon}
        </button>
        <button
          className={classname(styles.cardButton, {
            [styles.editing]: isEditing,
          })}
          onClick={handleEditClick}
        >
          {isEditing ? saveIcon : editIcon}
        </button>
      </div>
      <div className={styles.cardContent}>
        <LongCardSide
          text={term.expression}
          image={term.expressionImage}
          isEditing={isEditing}
          editTextRef={editExpressionRef}
        ></LongCardSide>
        <LongCardSide
          text={term.translation}
          image={term.translationImage}
          isEditing={isEditing}
          editTextRef={editTranslationRef}
        ></LongCardSide>
      </div>
    </div>
  );
}

LongCard.propTypes = {
  termId: PropTypes.string,
};

export default LongCard;
