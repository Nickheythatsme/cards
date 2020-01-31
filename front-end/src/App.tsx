import React from 'react';
import Theming, {ThemeContext} from './components/Theming';
import ShowAll from './components/ShowAll';
import Container from './components/Containers/Container';
import Button from './components/Button/Button';

const App: React.FC = () => {
  return (
    <Theming>
      <Container>
        <div className={'text-left py-4'}>Here is text!</div>
        <ThemeContext.Consumer>
          {({toggleTheme}) => (
            <Button onClick={toggleTheme} variant={'primary'}>Click me!</Button>
          )}
        </ThemeContext.Consumer>
      <ShowAll/>
      </Container>
    </Theming>
  );
}

export default App;
