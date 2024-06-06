import Canvas from "./components/Canvas"
import { useState } from 'react';
import Toolbar from "./components/Toolbar";

const App = () => {
  const [addShape, setAddShape] = useState<string>('');
  const [selectedTool, setSelectedTool] = useState<string>('select');

  return (
    <div>
      <Toolbar onShapeSelect={setAddShape} onToolSelect={setSelectedTool} />
      <Canvas addShape={addShape} selectedTool={selectedTool} />
    </div>
  );
};

export default App;