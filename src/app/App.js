import useShortcuts from "hooks/useShortcuts";

import Canvas from 'canvas';

function App() {
  useShortcuts();

  return (
    <div className="App">
      <Canvas />
    </div>
  );
}

export default App;
