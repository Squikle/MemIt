import styles from "./TermsSet.module.scss";
import TermLongCard from "../../Terms/TermLongCard/TermLongCard.tsx";
import { useDispatch, useSelector } from "react-redux";
import TermLongCardPlaceholder from "../../Terms/TermLongCard/TermLongCardPlaceholder.tsx";
import {emptyTermAdded, fetchTermsBySet, selectTermsBySetId} from "../../../store/terms.ts";
import { useEffect, useRef, useState } from "react";
import {AppDispatch} from "@/main.tsx";

type Props = {
  termsSetId: string
}

export function TermsSet({ termsSetId }: Props) {
  const terms = useSelector((state) => selectTermsBySetId(state, termsSetId));
  const [shouldScroll, setShouldScroll] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const placeHolderRef = useRef<HTMLDivElement>(null);

  const handleAddClick = () => {
    const event = emptyTermAdded({ setId: termsSetId });
    dispatch(event);
    setShouldScroll(true);
  };

  const scrollToBottom = () => {
    placeHolderRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    dispatch(fetchTermsBySet(termsSetId!))
  }, [termsSetId, dispatch]);

  useEffect(() => {
    if (shouldScroll) {
      scrollToBottom();
      setShouldScroll(false);
    }
  }, [shouldScroll]);

  return (
    <div className={styles.wordsContainer}>
      {terms.map((x) => {
        return <TermLongCard key={x.id} termId={x.id}></TermLongCard>;
      })}
      <div ref={placeHolderRef}>
        <TermLongCardPlaceholder
          onTermCreating={handleAddClick}
        ></TermLongCardPlaceholder>
      </div>
    </div>
  );
}
