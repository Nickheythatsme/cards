import React from 'react';
import Button from './components/Button';
import './App.scss'


const App: React.FC = () => {
  return (
    <>
      <h1>App</h1>
      <Button outline>Test</Button>
      <Button variant="secondary">Test</Button>
      <Button.Reactive>React</Button.Reactive>
    </>
  );
}

export default App;
