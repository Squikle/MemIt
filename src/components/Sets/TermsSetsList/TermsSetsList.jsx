import PropTypes from "prop-types";
import styles from "./TermsSetsList.module.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TermsSetCard } from "../TermsSetCard/TermsSetCard";

export function TermsSetsList() {
  const termsSets = useSelector((state) => state.entities.termsSets);

  return (
    <div className={styles.wordsContainer}>
      <ul>
        {termsSets.map((x) => {
          return (
            <li key={x.id}>
              <Link to={`/terms/${x.id}`}>
                <TermsSetCard termsSetId={x.id}></TermsSetCard>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

TermsSetsList.propTypes = {
  termsSetId: PropTypes.string,
};
