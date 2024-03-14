import { initParticlesEngine } from "@tsparticles/react";
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
import Particles from "./Particles";

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

  useEffect(() => {
    console.log("mount");
    return () => console.log("unmount");
  }, []);

  const particlesLoaded = useCallback((container) => {
    containerRef.current = container;
    container._lifeTime = 123;
    container._duration = undefined;
  }, []);

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
  const start = () => {
    console.log(containerRef?.current);
    console.log(containerRef?.current.destroyed);
    console.log(containerRef?.current._duration);
    console.log(containerRef?.current._lifeTime);
    containerRef?.current?.play(true);
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        pause,
        play,
        start,
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [containerRef]
  );

  return (
    <>
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={particlesOptions}
      />
    </>
  );
});

Confetti.propTypes = {};

export default Confetti;
