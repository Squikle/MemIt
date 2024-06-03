import styles from "./TermsSetCard.module.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {removeSet, selectTermsSet} from "../../../store/termsSets.ts";
import ConfirmButton from "../../Buttons/ConfirmButton.tsx";
import RejectButton from "../../Buttons/RejectButton.tsx";
import DeleteButton from "../../Buttons/DeleteButton.tsx";
import React, { useState } from "react";
import EditButton from "../../Buttons/EditButton.tsx";
import { useNavigate } from "react-router-dom";
import {AppDispatch} from "@/main.tsx";

type Props = {
  termsSetId: string
}

export function TermsSetCard({ termsSetId }: Props) {
  const [isDeleting, setIsDeleting] = useState(false);
  const termsSet = useSelector((state) => selectTermsSet(state, termsSetId));
  const dispatch = useDispatch<AppDispatch>();
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
    dispatch(removeSet(termsSetId));
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
          ({termsSet.termsCount ? `${termsSet.termsCount} words` : "empty"})
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
