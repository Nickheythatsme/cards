import React from 'react';
import Button, {ReactiveButton} from './components/Button';
import NavMenu from './components/NavMenu';
import {VariantNames} from './components/Theming';
import Pull from './components/Pull/Pull';
import './App.scss'
import './components/Theming/dark.scss';
import 'bootstrap/scss/bootstrap-grid.scss'


const App: React.FC = () => {
  return (
    <>
    <div className="container-fluid">
      <div className="row">
      <NavMenu/>
        <div className="col">
          <h1>App</h1>
          <div className="row">
            {VariantNames.map(name => (
                <div key={name}>
                    <h3>{name}</h3>
                    <Button variant={name}>Submit</Button>
                    <Button variant={name} outline>Submit</Button>
                    <ReactiveButton variant={name}>Submit</ReactiveButton>
                    <ReactiveButton variant={name} outline>Submit</ReactiveButton>
                </div>
            ))}
          </div>
          <div className="row">
            <Pull/>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
