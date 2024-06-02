import styles from "./TermsSetsList.module.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TermsSetCard } from "../TermsSetCard/TermsSetCard.tsx";
import {RootState, TermSet} from "@/store/types.ts";

export function TermsSetsList() {
  const termsSets = useSelector<RootState, TermSet[]>((state) => state.entities.termsSets);

  return (
    <div className={styles.wordsContainer}>
      <ul>
          {termsSets?.map((x) => {
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
