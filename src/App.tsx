import Footer from "./layout/Footer/Footer";
import Header from "./layout/Header/Header";

import { container } from "./App.module.scss";
import Clock from "./components/Clock/Clock";
import Convert from "./components/Convert/Convert";
import ModeSwitch from "./components/ModeSwitch/ModeSwitch";
import ResultBlock from "./components/ResultBlock/ResultBlock";

const App = () => {
  console.log("app rendered");
  return (
    <>
      <Header />
      <main className={container}>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Clock />
          <ResultBlock />
        </div>
        <ModeSwitch />
        <Convert />
      </main>
      <Footer />
    </>
  );
};

export default App;
