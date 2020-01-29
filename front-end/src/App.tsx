import React from 'react';
import './App.scss';
import Theming from './components/Theming';
import ShowAll from './components/ShowAll';

const App: React.FC = () => {
  return (
    <Theming>
      <ShowAll/>
    </Theming>
  );
}

export default App;
