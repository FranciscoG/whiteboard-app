import { useEffect } from "react";
import { connect } from "react-redux";
import { setTool } from "features/tools/toolSlice";
import useShortcuts from "hooks/useShortcuts";

import Canvas from 'canvas';

function App({ setTool }) {
  const { shortcut } = useShortcuts();

  useEffect(() => {
    setTool(shortcut);
  }, [shortcut, setTool]);

  return (
    <div className="App">
      <Canvas />
    </div>
  );
}

const mapDispatchToProps = { setTool };

export default connect(null, mapDispatchToProps)(App);
