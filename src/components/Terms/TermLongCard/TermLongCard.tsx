import React, { useRef, useState } from "react";
import styles from "./TermLongCard.module.css";
import PropTypes from "prop-types";
import { TermLongCardSide } from "./TermLongCardSide.tsx";
import { useDispatch, useSelector } from "react-redux";
import { termUpdated, termDeleted } from "../../../store/terms.ts";
import { Modal } from "../../Modal/Modal.tsx";
import DeleteButton from "../../Buttons/DeleteButton.tsx";
import EditSaveButton from "../../Buttons/EditSaveButton/EditSaveButton.tsx";
import {RootState, Term} from "@/store/types.ts";

type Props = {
  termId: string
}

function TermLongCard({ termId }: Props) {
  const term = useSelector<RootState, Term>((state) =>
    state.entities.terms.find((x) => x.id === termId)!
  );
  const [isEditing, setIsEditing] = useState(term!.isNew || false);
  const [isDeleting, setIsDeleting] = useState(false);

  const editExpressionRef = useRef<HTMLDivElement>(null);
  const editTranslationRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const handleEditClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isEditing) {
      const newExpression =
        editExpressionRef.current?.innerText || term?.expression || "";
      const newTranslation =
        editTranslationRef.current?.innerText || term?.translation || "";

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

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const isDoubleClick = e.detail >= 2;
    if (isDoubleClick) {
      setIsEditing(true);
      window.getSelection()?.removeAllRanges();
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
          onClick={handleRemoveClick}
        />
        <EditSaveButton
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
