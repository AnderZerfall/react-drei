import { Scene } from "./scenes/main";
import { InteractiveScreenProvider } from "./scenes/main/context/InterfactiveScreenContext";

function App() {
  return (
    <InteractiveScreenProvider>
        <Scene />
      </InteractiveScreenProvider>
  );
}

export default App;
