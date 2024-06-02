import {
  useEffect,
  useCallback,
  useState,
} from "react";
import particlesOptions from "./particles.json";
import {useParticlesComponent, useParticlesEngine} from "@/components/Particles/useParticlesEngine.tsx";
import {EmitterContainer} from "@tsparticles/plugin-emitters";
import {Container} from "@tsparticles/engine";
import type {EmitterInstance} from "@tsparticles/plugin-emitters/types/EmitterInstance";

type Props = {
  isActive: boolean,
  onLoaded?: () => void;
}

export default function Confetti({ isActive, onLoaded }: Props) {
  const [container, setContainer] = useState<EmitterContainer | null>(null);
  useParticlesEngine();

  useEffect(() => {
    if (!container) return;

    if (isActive) container?.play();
    else (container?.plugins?.get("emitters") as any).array.forEach((x: EmitterInstance) => x.pause());
  }, [isActive]);

  const handleParticlesLoaded = useCallback(
      async (container?: Container) => {
        setContainer(container as EmitterContainer);
        if (onLoaded) onLoaded();
      },
      [onLoaded],
  );

  return useParticlesComponent("Confetti", particlesOptions as any, handleParticlesLoaded);
}