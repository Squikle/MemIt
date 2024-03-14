import "./pageStyles.css";
import { useParams } from "react-router-dom";
import GoBackButton from "../components/Buttons/GoBackButton/GoBackButton";
import TermsStack from "../components/Terms/TermsStack/TermsStack";
import classname from "classname";
import style from "./Pages.module.css";
import Confetti from "../components/Particles/Confetti";
import { useRef, useState } from "react";
import RestartButton from "../components/Buttons/RestartButton";
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
      <main className={classname("container", "noScroll", style.centered)}>
        <GoBackButton hideOnNarrow={false} />
        <div className="rolloutReversed">
          <TermsStack
            termsSetId={termsSetId}
            onStackFinished={handleStackFinished}
          ></TermsStack>
          {stackFinished && (
            <div className={classname(termsPageStyle.restart)}>
              <RestartButton
                iconClassName={classname(termsPageStyle.restartIcon)}
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
