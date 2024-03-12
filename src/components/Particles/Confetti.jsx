import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import {
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useCallback,
} from "react";
import particlesOptions from "./particles.json";

const Confetti = forwardRef(function Confetti(_, ref) {
  const containerRef = useRef(null);
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (init) {
      return;
    }

    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, [init]);

  const particlesLoaded = useCallback(
    (container) => {
      containerRef.current = container;
    },
    [containerRef]
  );

  const pause = () => {
    containerRef?.current?.plugins
      .get("emitters")
      .array.forEach((x) => x.pause());
  };
  const play = () => {
    containerRef?.current?.plugins
      .get("emitters")
      .array.forEach((x) => x.play());
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        pause,
        play,
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [containerRef]
  );

  return (
    <>
      {init && (
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={particlesOptions}
        />
      )}
    </>
  );
});

Confetti.propTypes = {};

export default Confetti;
