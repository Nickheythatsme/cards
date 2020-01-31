import React from 'react';
import Button from './Button/Button';
import Container from './Containers/Container';
import Row from './Containers/Row';
import Col from './Containers/Col';
import {useWindowDimensions} from './Utils'
import {BreakpointSizes} from './Theming';

function showBreakpoint(width: number) {
    let size = 'xs';
    Object.keys(BreakpointSizes).forEach(key => {
        if (width > BreakpointSizes[key]) {
            size = key;
        }
    });
    return size;
}

const ShowAll: React.FC = () => {
    const { height, width } = useWindowDimensions();
    let currentBreakpoint = showBreakpoint(width);

    return (
        <Container fluid>
            <Row>
                <Col>
                    <h1>Test title</h1>
                    <p>Window height: {height}</p>
                    <p>Window width: {width}</p>
                    <p>breakpont: {currentBreakpoint}</p>
                </Col>
            </Row>
            <Row>
                <Button>Primary</Button>
            </Row>
            <Row>
                <Button variant={"secondary"}>Secondary</Button>
            </Row>
            <Row>
                <Button variant={"secondary-outline"}>Ouline Secondary</Button>
            </Row>
            <Row className={'my-2'}>
                <Button variant={"danger"}>Danger</Button>
            </Row>
            <Row>
                <Button variant={"danger-outline"}>Outline Danger</Button>
            </Row>
            <div className={'my-4'}/>
            <Row>
                <Col sm={4}>
                    <Button variant={"danger-outline"}>Outline Danger</Button>
                </Col>
                <Col>
                    <Button variant={"danger-outline"}>Outline Danger</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default ShowAll;
