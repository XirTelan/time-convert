import Footer from "./layout/Footer/Footer";
import Header from "./layout/Header/Header";
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
          <Button title="text" label={"test"} variant="primary"></Button>
        </Card>
      </main>
      <Footer />
    </>
  );
};

export default App;
