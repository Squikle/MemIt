import styles from "./TermsSetsList.module.css";
import {useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";
import { TermsSetCard } from "../TermsSetCard/TermsSetCard.tsx";
import {fetchSets, selectAllTermsSets} from "@/store/termsSets.ts";
import {useEffect} from "react";
import {AppDispatch} from "@/main.tsx";
import {RootState} from "@/store/types.ts";
import TermsSet from "@/@types/TermsSet.ts";

export function TermsSetsList() {
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(fetchSets());
    }, [dispatch]);
    const termsSets = useSelector<RootState, TermsSet[]>(state => selectAllTermsSets(state));

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
