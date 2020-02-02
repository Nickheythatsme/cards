import React from 'react';
import Theming from './components/Theming';
import ShowAll from './components/ShowAll';
import Container from './components/Layout/Container';


const App: React.FC = () => {
  return (
    <Theming>
      <Container>
      <ShowAll/>
      </Container>
    </Theming>
  );
}

export default App;
