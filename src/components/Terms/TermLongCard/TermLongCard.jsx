import { useRef, useState } from "react";
import styles from "./TermLongCard.module.css";
import PropTypes from "prop-types";
import { TermLongCardSide } from "./TermLongCardSide";
import classname from "classname";
import { useDispatch, useSelector } from "react-redux";
import { termUpdated, termDeleted } from "../../../store/terms";
import { Modal } from "../../Modal/Modal";
import DeleteButton from "../../Buttons/DeleteButton";
import EditSaveButton from "../../Buttons/EditSaveButton/EditSaveButton";

function TermLongCard({ termId }) {
  const term = useSelector((state) =>
    state.entities.terms.find((x) => x.id === termId)
  );
  const [isEditing, setIsEditing] = useState(term.isNew);
  const [isDeleting, setIsDeleting] = useState(false);

  const editExpressionRef = useRef();
  const editTranslationRef = useRef();
  const dispatch = useDispatch();

  const handleEditClick = (e) => {
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
    e.stopPropagation();
  };

  const deleteCard = () => {
    dispatch(termDeleted(termId));
  };

  const handleRemoveClick = () => {
    if (term.isNew) deleteCard();
    else setIsDeleting(true);
  };

  const confirmRemoving = () => {
    setIsDeleting(false);
    deleteCard();
  };

  const cancelRemoving = () => {
    setIsDeleting(false);
  };

  const handleCardClick = (e) => {
    const isDoubleClick = e.detail >= 2;
    if (isDoubleClick) {
      setIsEditing(true);
      window.getSelection().removeAllRanges();
    }
  };

  return (
    <div className={styles.card} onClick={handleCardClick}>
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
        <DeleteButton
          className={styles.cardButton}
          onClick={handleRemoveClick}
        />
        <EditSaveButton
          className={classname(styles.cardButton, {
            [styles.editing]: isEditing,
          })}
          onClick={handleEditClick}
          isEditing={isEditing}
        />
      </div>

      <div className={styles.cardContent}>
        <TermLongCardSide
          text={term.expression}
          image={term.expressionImage}
          isEditing={isEditing}
          editTextRef={editExpressionRef}
        ></TermLongCardSide>
        <TermLongCardSide
          text={term.translation}
          image={term.translationImage}
          isEditing={isEditing}
          editTextRef={editTranslationRef}
        ></TermLongCardSide>
      </div>
    </div>
  );
}

TermLongCard.propTypes = {
  termId: PropTypes.string,
};

export default TermLongCard;
