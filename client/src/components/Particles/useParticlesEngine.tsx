import {loadEmittersPlugin} from "@tsparticles/plugin-emitters";
import Particles, {initParticlesEngine} from "@tsparticles/react";
import {useEffect, useMemo} from "react";
import type {Container, ISourceOptions} from "@tsparticles/engine";
import {loadBaseMover} from "@tsparticles/move-base";
import {loadRotateUpdater} from "@tsparticles/updater-rotate";
import {loadSizeUpdater} from "@tsparticles/updater-size";
import {loadDestroyUpdater} from "@tsparticles/updater-destroy";
import {loadBasic} from "@tsparticles/basic";
import {loadTriangleShape} from "@tsparticles/shape-polygon";

export function useParticlesEngine(onLoaded?: () => void) {
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadEmittersPlugin(engine);
            await loadTriangleShape(engine);
            await loadBaseMover(engine);
            await loadRotateUpdater(engine);
            await loadSizeUpdater(engine);
            await loadDestroyUpdater(engine);
            await loadBasic(engine);
        }).then(() => {
            if (onLoaded) onLoaded();
        });
    }, [onLoaded]);
}

export function useParticlesComponent(
    id: string,
    options: ISourceOptions,
    particlesLoaded: (container?: Container) => Promise<void>,
) {
    return useMemo(() => {
        return (
            <Particles id={id} options={options} particlesLoaded={particlesLoaded}/>
        );
    }, [id, particlesLoaded, options]);
}
