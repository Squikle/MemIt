import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import {
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
  useCallback,
  useMemo,
} from "react";
import particlesOptions from "./particles.json";

const Confetti = forwardRef(function Confetti(_, ref) {
  const containerRef = useRef(null);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    });
  }, []);

  const loaded = useCallback((instanceContainer) => {
    containerRef.current = instanceContainer;
  }, []);

  const particles = useMemo(() => {
    console.log("new memo");
    return (
      <Particles
        id="tsparticles"
        options={particlesOptions}
        particlesLoaded={loaded}
      />
    );
  }, [loaded]);

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
    []
  );

  return particles;
});

Confetti.propTypes = {};

export default Confetti;
