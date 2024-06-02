import "./pageStyles.css";
import {useParams} from "react-router-dom";
import GoBackButton from "../components/Buttons/GoBackButton/GoBackButton.tsx";
import TermsStack from "../components/Terms/TermsStack/TermsStack.tsx";
import classNames from "classnames";
import style from "./Pages.module.css";
import Confetti from "../components/Particles/Confetti.tsx";
import { useState } from "react";
import RestartButton from "../components/Buttons/RestartButton.tsx";
import termsPageStyle from "./TermsPage.module.css";

const CONFETTI_DURATION_SEC = 2;

export function TermsPage() {
  const { termsSetId } = useParams();
  const [stackFinished, setStackFinished] = useState(false);
  const [isConfettiPlaying, setIsConfettiPlaying] = useState(false);

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
          <TermsStack
            termsSetId={termsSetId!}
            onStackFinished={handleStackFinished}
          ></TermsStack>
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
