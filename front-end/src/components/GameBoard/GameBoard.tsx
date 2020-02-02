import React from 'react';
import Container from '../Layout/Container';
import Row from '../Layout/Row';
import GameCard from '../GameCard/GameCard';
import './GameBoard.scss';

interface GameBoardPropTypes {
    title: string,
}

interface GameBoardStateTypes {
    cards: Array<{suite: string, value: string, key: number}>,
}


export default class GameBoard extends React.Component<GameBoardPropTypes, GameBoardStateTypes> {
    state = {
        cards: [
            {suite: 'hearts', value: 'king', key: 0},
            {suite: 'hearts', value: '10', key: 1},
            {suite: 'clubs', value: '3', key: 2},
        ]
    }

    renderCards() {
        return this.state.cards.map(card => {
            return <GameCard {...card} />
        })
    }

    render() {
        return (
            <Container className={'game-board'}>
                <Row>
                    {this.renderCards()}
                </Row>
            </Container>
        )
    }
}
