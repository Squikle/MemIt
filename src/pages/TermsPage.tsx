import "./pageStyles.css";
import { useParams } from "react-router-dom";
import GoBackButton from "../components/Buttons/GoBackButton/GoBackButton.tsx";
import TermsStack from "../components/Terms/TermsStack/TermsStack.tsx";
import classNames from "classnames";
import style from "./Pages.module.css";
import Confetti from "../components/Particles/Confetti.tsx";
import { useRef, useState } from "react";
import RestartButton from "../components/Buttons/RestartButton.tsx";
import termsPageStyle from "./TermsPage.module.css";

export function TermsPage() {
  const { termsSetId } = useParams();
  const [stackFinished, setStackFinished] = useState(false);
  const confettiControl = useRef(null);

  const pauseConfetti = () => {
    confettiControl.current?.pause();
  };
  const startConfetti = () => {
    confettiControl.current?.start();
  };

  const handleStackFinished = () => {
    setStackFinished(true);

    startConfetti();
    setTimeout(() => pauseConfetti(), 2000);
  };

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
      <Confetti ref={confettiControl}></Confetti>
    </>
  );
}
