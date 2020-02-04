import React from 'react';
import Theming from './components/Theming';
import DevPanel from './components/DevPanel';
import GameBoard from './components/GameBoard/GameBoard';


const App: React.FC = () => {
  return (
    <Theming>
      <DevPanel/>
      <GameBoard title={'test game'}/>
      <div style={{height: '200px', width: '100%', backgroundColor: 'pink', zIndex: 1005}}/>
    </Theming>
  );
}

export default App;
