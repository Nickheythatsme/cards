import React from 'react';
import Button, { ReactiveButton } from './components/Button';
import Card from './components/Card';
import NavMenu from './components/NavMenu';
import { VariantNames } from './components/Theming';
import './App.scss';
import './components/Theming/dark.scss';
import 'bootstrap/scss/bootstrap-grid.scss';

const App: React.FC = () => {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <NavMenu />
                    <div className="col">
                        <h1>App</h1>
                        <Card>
                            <Card.Image
                                src="https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                                alt="nature image"
                            />
                            <Card.Heading>
                                <Card.Title>Test title</Card.Title>
                                <Card.Subtitle>Test subtitle</Card.Subtitle>
                            </Card.Heading>
                            <Card.Body>
                                Test body. This is the body of the card. It's
                                meant to hold more data
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Image
                                src="https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                                alt="nature image"
                            />
                            <Card.Heading>
                                <Card.Title>A great nature walk</Card.Title>
                                <Card.Subtitle>
                                    Testing the nature subtitle
                                </Card.Subtitle>
                            </Card.Heading>
                            <Card.Body>
                                Test body. This is the body of the card. It's
                                meant to hold more data
                            </Card.Body>
                        </Card>
                        <div className="row">
                            {VariantNames.map(name => (
                                <div key={name}>
                                    <h3>{name}</h3>
                                    <Button variant={name}>Submit</Button>
                                    <Button variant={name} outline>
                                        Submit
                                    </Button>
                                    <ReactiveButton variant={name}>
                                        Submit
                                    </ReactiveButton>
                                    <ReactiveButton variant={name} outline>
                                        Submit
                                    </ReactiveButton>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default App;
