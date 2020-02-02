import React from 'react';
import Container from '../Layout/Container';
import Row from '../Layout/Row';
import GameCard from '../GameCard/GameCard';
import './GameBoard.scss';

interface GameBoardPropTypes {
    title: string,
}

interface GameBoardStateTypes {
    cards: Array<{suite: string, value: string}>,
}


export default class GameBoard extends React.Component<GameBoardPropTypes, GameBoardStateTypes> {
    state = {
        cards: [
            {suite: 'hearts', value: 'king'},
            {suite: 'hearts', value: '10'},
            {suite: 'clubs', value: '3'},
        ]
    }

    renderCards() {
        return this.state.cards.map(card => {
            return <GameCard {...card} /> 
        })
    }

    render() {
        return (
            <Container>
                <Row>
                    {this.renderCards()}
                </Row>
            </Container>
        )
    }
}
