import useShortcuts from "hooks/useShortcuts";

import Canvas from 'canvas';

function App() {
  const { lastShortcut } = useShortcuts();

  return (
    <div className="App">
      <Canvas lastShortcut={lastShortcut}/>
    </div>
  );
}

export default App;
