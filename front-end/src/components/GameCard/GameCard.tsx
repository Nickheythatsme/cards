import React from 'react';
import './GameCard.scss';
import Row from '../Layout/Row';
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
        return (
            <Draggable ref={this.draggableRef}>
                <div onClick={this.toggleSelected} className={'game-card' + (this.state.isSelected ? ' selected' : '')}>
                    <div>hello</div>
                    <Row>
                        <Button onClick={() => {(this.draggableRef as any).current.resetPosition()}}>Reset</Button>
                    </Row>
                </div>
            </Draggable>
        );
    }
}
