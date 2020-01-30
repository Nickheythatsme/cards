import React from 'react';
import Theming, {ThemeContext} from './components/Theming';
import Button from './components/Button';

const App: React.FC = () => {
  return (
    <Theming>
      <div className={'text-left p-4'}>Here is text!</div>
      <ThemeContext.Consumer>
        {({toggleTheme}) => (
          <Button onClick={toggleTheme} className={'btn btn-primary'}>Click me!</Button>
        )}
      </ThemeContext.Consumer>
    </Theming>
  );
}

export default App;
