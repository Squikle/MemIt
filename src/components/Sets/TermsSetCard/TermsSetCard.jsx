import PropTypes from "prop-types";
import styles from "./TermsSetCard.module.css";
import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { termsSetDeleted } from "../../../store/termsSets";
import ConfirmButton from "../../Buttons/ConfirmButton";
import RejectButton from "../../Buttons/RejectButton";
import DeleteButton from "../../Buttons/DeleteButton";
import { useState } from "react";
import EditButton from "../../Buttons/EditButton";
import { useNavigate } from "react-router-dom";

const selectTermsSet = createSelector(
  (state) => state.entities.termsSets,
  (_, termsSetId) => termsSetId,
  (terms, termsSetId) => terms.find((x) => x.id === termsSetId)
);

const selectTermsFromSet = createSelector(
  (state) => state.entities.terms,
  (_, termsSetId) => termsSetId,
  (terms, termsSetId) => terms.filter((x) => x.setId === termsSetId)
);

export function TermsSetCard({ termsSetId }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const termsSet = useSelector((state) => selectTermsSet(state, termsSetId));
  const termsCount = useSelector((state) =>
    selectTermsFromSet(state, termsSetId)
  ).length;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteClick = (e) => {
    setIsDeleting(true);
    e.preventDefault();
  };

  const handleRejectDeleteClick = (e) => {
    setIsDeleting(false);
    e.preventDefault();
  };

  const confirmRemoving = (e) => {
    dispatch(termsSetDeleted(termsSetId));
    e.preventDefault();
  };

  const handleEditClick = (e) => {
    navigate(`${termsSetId}`);
    e.preventDefault();
  };

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <p>{termsSet.name}</p>
        <p className={styles.wordsCount}>
          ({termsCount ? `${termsCount} words` : "empty"})
        </p>
      </div>
      <div className={styles.buttons}>
        {!isDeleting ? (
          <DeleteButton onClick={handleDeleteClick}></DeleteButton>
        ) : (
          <>
            <ConfirmButton onClick={confirmRemoving}></ConfirmButton>
            <RejectButton onClick={handleRejectDeleteClick}></RejectButton>
          </>
        )}
        <EditButton onClick={handleEditClick} />
      </div>
    </div>
  );
}

TermsSetCard.propTypes = {
  termsSetId: PropTypes.string,
};
