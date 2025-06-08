import Footer from "./layout/Footer/Footer";
import Header from "./layout/Header/Header";

import {
  container,
  convert,
  clockRow,
  blockA,
  blockB,
  blockC,
} from "./App.module.scss";

import {
  Clock,
  ModeSwitch,
  ResultBlock,
  TimeInput,
  TimezoneSelector,
} from "./components";

import { Card } from "./shared/ui";

const App = () => {
  return (
    <>
      <Header />
      <main className={container}>
        <div className={clockRow}>
          <Clock />
        </div>
        <ModeSwitch />
        <div className={convert}>
          <div className={blockA}>
            <Card>
              <div>
                <TimezoneSelector />
                <TimezoneSelector to />
              </div>
            </Card>
          </div>
          <div className={blockB}>
            <Card>
              <TimeInput />
            </Card>
          </div>
          <div className={blockC}>
            <ResultBlock />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default App;
