import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import TimezoneSelector from "./components/TimezoneSelector/TimezoneSelector";
import { Button } from "./shared/ui/Button/Button";
import Card from "./shared/ui/Card/Card";

import { container } from "./App.module.scss";

const App = () => {
  return (
    <>
      <Header />
      <main className={container}>
        <Card>
            <TimezoneSelector />
          <Button title="text" label={"test"} variant="primary">
          </Button>
        </Card>
      </main>
      <Footer />
    </>
  );
};

export default App;
