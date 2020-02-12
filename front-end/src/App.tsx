import React from 'react';
import Button from './components/Button';
import {Reactive} from './components/Button/Button';
import './App.scss'


const App: React.FC = () => {
  return (
    <>
      <h1>App</h1>
      <Button outline>Test</Button>
      <Button variant="secondary">Test</Button>
      <Reactive>React</Reactive>
    </>
  );
}

export default App;
