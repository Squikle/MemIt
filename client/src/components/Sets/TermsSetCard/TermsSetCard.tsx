import styles from "./TermsSetCard.module.css";
import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { termsSetDeleted } from "../../../store/termsSets.ts";
import ConfirmButton from "../../Buttons/ConfirmButton.tsx";
import RejectButton from "../../Buttons/RejectButton.tsx";
import DeleteButton from "../../Buttons/DeleteButton.tsx";
import React, { useState } from "react";
import EditButton from "../../Buttons/EditButton.tsx";
import { useNavigate } from "react-router-dom";
import {Term, TermSet} from "@/store/types.ts";

const selectTermsSet = createSelector(
  (state) => state.entities.termsSets,
  (_, termsSetId) => termsSetId,
  (terms: TermSet[], termsSetId) => terms.find((x) => x.id === termsSetId)
);

const selectTermsFromSet = createSelector(
  (state) => state.entities.terms,
  (_, termsSetId) => termsSetId,
  (terms: Term[], termsSetId) => terms.filter((x) => x.setId === termsSetId)
);

type Props = {
  termsSetId: string
}

export function TermsSetCard({ termsSetId }: Props) {
  const [isDeleting, setIsDeleting] = useState(false);
  const termsSet = useSelector((state) => selectTermsSet(state, termsSetId));
  const termsCount = useSelector((state) =>
    selectTermsFromSet(state, termsSetId)
  ).length;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsDeleting(true);
    e.preventDefault();
  };

  const handleRejectDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsDeleting(false);
    e.preventDefault();
  };

  const confirmRemoving = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(termsSetDeleted(termsSetId));
    event.preventDefault();
  };

  const handleEditClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    navigate(`${termsSetId}`);
    event.preventDefault();
  };

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <p>{termsSet?.name}</p>
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
