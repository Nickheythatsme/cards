import React from 'react';
import Button from './Button';
import Container from './Container';
import Row from './Row';
import Col from './Col';
import {useWindowDimensions} from './Utils'

const ShowAll: React.FC = () => {
    const { height, width } = useWindowDimensions();

    return (
        <Container fluid={true}>
            <Row>
                <Col>
                    <h1>Test title</h1>
                    <p>Window height: {height}</p>
                    <p>Window width: {width}</p>
                </Col>
            </Row>
            <Row>
                <Button>Primary</Button>
            </Row>
            <Row>
                <Button variant={"secondary"}>Secondary</Button>
            </Row>
            <Row>
                <Button variant={"outline-secondary"}>Ouline Secondary</Button>
            </Row>
            <Row>
                <Button variant={"outline-danger"}>Ouline Danger</Button>
            </Row>
            <Row>
                <Col sm={4}>
                    <Button variant={"outline-danger"}>Test Col</Button>
                </Col>
                <Col>
                    <Button variant={"outline-danger"}>Test Col</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default ShowAll;
