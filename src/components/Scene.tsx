import { useEffect, useRef, type RefObject } from 'react';
import { petalDensity, type SectionId } from '../data/content';
import { createPetals } from '../lib/petals';
import { createTree } from '../lib/tree';
import { createWind } from '../lib/wind';

interface SceneProps {
  treeRef: RefObject<SVGSVGElement | null>;
  section: SectionId;
}

/**
 * Everything that moves outside React's render cycle: the tree growing and swaying, the wind, and
 * the petals on a full-screen canvas. One animation loop drives all of it.
 */
export function Scene({ treeRef, section }: SceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef(section);
  sectionRef.current = section;

  useEffect(() => {
    const svg = treeRef.current;
    const canvas = canvasRef.current;
    if (!svg || !canvas) {
      return;
    }
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mobile = window.matchMedia('(max-width: 960px)').matches;

    const wind = createWind();
    const tree = createTree(svg, { mobile, reduceMotion });
    let heroVisible = true;
    const visibility = new IntersectionObserver(([entry]) => {
      heroVisible = entry?.isIntersecting ?? true;
    });
    visibility.observe(svg);
    const bloom = window.setTimeout(() => svg.classList.add('bloom'), reduceMotion ? 0 : 400);

    const petals = reduceMotion
      ? null
      : createPetals(canvas, {
          target: () => petalDensity[sectionRef.current] ?? 10,
          treeRect: () => svg.getBoundingClientRect(),
          treeVisible: () => heroVisible,
          wind: wind.state,
          mobile,
        });
    const onResize = () => petals?.resize();
    window.addEventListener('resize', onResize);

    const start = performance.now();
    let frameId = 0;
    const loop = (now: number) => {
      const t = (now - start) / 1000;
      wind.step(t);
      if (heroVisible || t < 4) {
        tree.frame(t, wind.state.gust);
      }
      petals?.frame(t);
      frameId = requestAnimationFrame(loop);
    };
    if (reduceMotion) {
      tree.frame(10, 0);
    } else {
      frameId = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(frameId);
      window.clearTimeout(bloom);
      window.removeEventListener('resize', onResize);
      visibility.disconnect();
      wind.destroy();
    };
  }, [treeRef]);

  return <canvas id="petals" ref={canvasRef} aria-hidden="true" />;
}
