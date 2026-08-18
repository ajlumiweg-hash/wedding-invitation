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
    <main className="relative min-h-screen overflow-hidden">
      <Background />
      <FloatingCard />
      <Page1 />
      <Page2 />
      <Page3 />
      <Page4 />
      <Page5 />
      <Page6 />
    </main>
  );
}