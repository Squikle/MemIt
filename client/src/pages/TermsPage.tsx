import "./pageStyles.scss";
import {useParams} from "react-router-dom";
import GoBackButton from "../components/Buttons/GoBackButton/GoBackButton.tsx";
import TermsStack from "../components/Terms/TermsStack/TermsStack.tsx";
import classNames from "classnames";
import style from "./Pages.module.scss";
import Confetti from "../components/Particles/Confetti.tsx";
import {useEffect, useState} from "react";
import RestartButton from "../components/Buttons/RestartButton.tsx";
import termsPageStyle from "./TermsPage.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {fetchTermsBySet, selectTermsBySetId} from "@/store/terms.ts";
import {AppDispatch} from "@/main.tsx";

const CONFETTI_DURATION_SEC = 2;

export function TermsPage() {
  const { termsSetId } = useParams();
  const [stackFinished, setStackFinished] = useState(false);
  const [isConfettiPlaying, setIsConfettiPlaying] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const terms = useSelector((state) => selectTermsBySetId(state, termsSetId!)).filter(x => !x.isNew);

  useEffect(() => {
    dispatch(fetchTermsBySet(termsSetId!))
  }, [termsSetId, dispatch]);

  const handleStackFinished = () => {
    setStackFinished(true);
    playConfetti();
  };

  const playConfetti = () => {
    setIsConfettiPlaying(true);
    setTimeout(() => {
      setIsConfettiPlaying(false);
    }, CONFETTI_DURATION_SEC * 1000);
  }

  return (
    <>
      <main className={classNames("container", "noScroll", style.centered)}>
        <GoBackButton hideOnNarrow={false} />
        <div className="rolloutReversed">
          {terms.length > 0 && <TermsStack terms={terms} onStackFinished={handleStackFinished}></TermsStack>}
          {stackFinished && (
            <div className={classNames(termsPageStyle.restart)}>
              <RestartButton
                iconClassName={classNames(termsPageStyle.restartIcon)}
                onClick={() => window.location.reload()}
              ></RestartButton>
            </div>
          )}
        </div>
      </main>
      <Confetti isActive={isConfettiPlaying}></Confetti>
    </>
  );
}
