import React from 'react';
import Button, {ReactiveButton} from './components/Button';
import './App.scss'


const App: React.FC = () => {
  return (
    <>
      <h1>App</h1>
      <Button outline disabled>Test</Button>
      <Button variant="secondary">Test</Button>
      <Button variant="secondary" disabled>Test</Button>
      <ReactiveButton onClick={() => console.log('click!')}>React</ReactiveButton>
      <ReactiveButton variant="info" outline>React</ReactiveButton>
    </>
  );
}

export default App;
