import Cursor from "./components/Cursor";
import Nav from "./components/Nav";
import SectionIndicator from "./components/SectionIndicator";
import Hero from "./sections/Hero";
import Manifesto from "./sections/Manifesto";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Contact from "./sections/Contact";

export default function App() {
  return (
    <div className="relative bg-ink text-paper">
      <div className="grain" aria-hidden />
      <Cursor />
      <Nav />
      <SectionIndicator />
      <main>
        <Hero />
        <Manifesto />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </div>
  );
}
