import "./pageStyles.css";
import { useParams } from "react-router-dom";
import GoBackButton from "../components/Buttons/GoBackButton/GoBackButton";
import TermsStack from "../components/Terms/TermsStack/TermsStack";
import classname from "classname";
import style from "./Pages.module.css";
import Confetti from "../components/Particles/Confetti";
import { useRef, useState } from "react";

export function TermsPage() {
  const { termsSetId } = useParams();
  const [stackFinished, setStackFinished] = useState(false);
  const confettiControl = useRef(null);

  const pauseConfetti = () => {
    confettiControl.current.pause();
  };

  const handleStackFinished = () => {
    setStackFinished(true);

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
        </div>
      </main>
      {
        <div className={classname({ hidden: !stackFinished })}>
          <Confetti ref={confettiControl}></Confetti>
        </div>
      }
    </>
  );
}
