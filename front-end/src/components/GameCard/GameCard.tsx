import React from 'react';
import './GameCard.scss';
import Row from '../Layout/Row';
import Col from '../Layout/Col';
import Draggable from '../Draggable/Draggable';
import Button from '../Button/Button';

interface StateType {
    isSelected: boolean,
}

interface GameCardPropTypes extends React.PropsWithChildren<any> {
    suite: string,
    value: string,
}

export default class GameCard extends React.Component<GameCardPropTypes> {
    state: StateType = {
        isSelected: false,
    }
    private draggableRef: React.Ref<any> = React.createRef();

    constructor(props: any) {
        super(props);
        this.toggleSelected = this.toggleSelected.bind(this);
    }

    toggleSelected() {
        this.setState(state => ({
            isSelected: !(state as StateType).isSelected
        }));
    }

    render() {
        let className = `game-card ${this.props.suite} ${this.state.isSelected ? ' selected' : ''}`
        return (
            <Draggable ref={this.draggableRef}>
                {styles => (
                    <div onClick={this.toggleSelected} style={styles} className={className}>
                        <Col>
                            <div className={'mr-auto'}>{this.props.value}</div>
                            <Button onClick={() => {(this.draggableRef as any).current.resetPosition()}}>Reset</Button>
                            <div className={'ml-auto'}>{this.props.value}</div>
                        </Col>
                    </div>
                )}
            </Draggable>
        );
    }
}
