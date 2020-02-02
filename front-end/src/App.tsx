import React from 'react';
import Theming from './components/Theming';
import DevPanel from './components/DevPanel';
import GameBoard from './components/GameBoard/GameBoard';


const App: React.FC = () => {
  return (
    <Theming>
      <DevPanel/>
      <GameBoard title={'test game'}/>
    </Theming>
  );
}

export default App;
