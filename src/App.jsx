import Background from "./components/Background";
import FloatingCard from "./components/FloatingCard";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import Page3 from "./pages/Page3";
import Page4 from "./pages/Page4";
import Page5 from "./pages/Page5";
import Page6 from "./pages/Page6";

export default function App() {
  return (
    <>
      <Background />
      <FloatingCard />

      <main className="relative z-10 w-full">
        <section className="min-h-[100svh] snap-start" style={{ scrollSnapAlign: "start" }}>
          <Page1 />
        </section>
        <section className="min-h-[100svh] snap-start" style={{ scrollSnapAlign: "start" }}>
          <Page2 />
        </section>
        <section className="min-h-[100svh] snap-start" style={{ scrollSnapAlign: "start" }}>
          <Page3 />
        </section>
        <section className="min-h-[100svh] snap-start" style={{ scrollSnapAlign: "start" }}>
          <Page4 />
        </section>
        <section className="min-h-[100svh] snap-start" style={{ scrollSnapAlign: "start" }}>
          <Page5 />
        </section>
        <section className="min-h-[100svh] snap-start" style={{ scrollSnapAlign: "start" }}>
          <Page6 />
        </section>
      </main>
    </>
  );
}