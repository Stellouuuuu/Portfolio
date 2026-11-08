import { useRef } from 'react';
import { About } from './components/About';
import { Beyond } from './components/Beyond';
import { Build } from './components/Build';
import { Connect } from './components/Connect';
import { Experience } from './components/Experience';
import { Future } from './components/Future';
import { Hero } from './components/Hero';
import { Mind } from './components/Mind';
import { Nav } from './components/Nav';
import { Rail } from './components/Rail';
import { Scene } from './components/Scene';
import { useActiveSection } from './hooks/useActiveSection';
import { useScroll } from './hooks/useScroll';

export function App() {
  const treeRef = useRef<SVGSVGElement>(null);
  const active = useActiveSection();
  const { scrolled, progress } = useScroll();

  return (
    <>
      <Nav scrolled={scrolled} active={active} />
      <Rail active={active} progress={progress} />
      <Scene treeRef={treeRef} section={active} />
      <main>
        <Hero treeRef={treeRef} />
        <About />
        <Mind />
        <Experience />
        <Build />
        <Beyond />
        <Future />
        <Connect />
      </main>
    </>
  );
}
