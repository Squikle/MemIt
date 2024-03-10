import classname from "classname";
import styles from "./Pages.module.css";
import "./pageStyles.css";
import { useNavigate, useParams } from "react-router-dom";
import GoBackButton from "../components/Buttons/GoBackButton";
import TermCard from "../components/Terms/TermCard/TermCard";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const selectTermsFromSet = createSelector(
  (state) => state.entities.terms,
  (_, termsSetId) => termsSetId,
  (terms, termsSetId) => terms.filter((x) => x.setId === termsSetId)
);

export function TermsPage() {
  const { termsSetId } = useParams();
  const navigate = useNavigate();
  const terms = useSelector((state) => selectTermsFromSet(state, termsSetId));

  return (
    <main className="container">
      <div className={classname(styles.backButton, styles.rollout)}>
        <GoBackButton size="4em" onClick={() => navigate(-1)}></GoBackButton>
      </div>
      <div className="content">
        {terms.map((x) => {
          return <TermCard key={x.id} termId={x.id}></TermCard>;
        })}
      </div>
    </main>
  );
}
