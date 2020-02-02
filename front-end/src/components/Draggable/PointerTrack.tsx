import React from 'react';

export interface PointerTrackPropType extends React.PropsWithChildren<any> {
    onPointerDown?: (event: any) => void,
    onPointerUp?: (event: any) => void,
    onPointerMove: (movement: {movementX: number, movementY: number}) => void,
}

interface StateType {
    movementStartPosition: null | {
        pageX: number,
        pageY: number 
    },
    movementEndPosition: null | {
        pageX: number,
        pageY: number 
    },
}

export default class PonterTrack extends React.Component<PointerTrackPropType> {
    state: StateType = {
        movementStartPosition: null,
        movementEndPosition: null,
    };

    constructor(props: PointerTrackPropType) {
        super(props);
        this.onPointerDownHandler = this.onPointerDownHandler.bind(this);
        this.onPointerUpHandler = this.onPointerUpHandler.bind(this);
        this.onPointerMoveHandler = this.onPointerMoveHandler.bind(this);
        this.onTouchMoveHandler = this.onTouchMoveHandler.bind(this);
    }

    calculateMovement(pageX: number, pageY: number) {
        if (this.state.movementStartPosition) {
            this.props.onPointerMove({
                movementX: this.state.movementStartPosition.pageX - pageX,
                movementY: this.state.movementStartPosition.pageY - pageY
            });
        }
    }

    onTouchMoveHandler(event: TouchEvent) {
        if (event.touches.length > 0) {
            this.calculateMovement(event.touches.item(0)!.pageX, event.touches.item(0)!.pageY);
        }
    }

    onTouchEndHandler(event: TouchEvent) {
        window.removeEventListener('touchmove', this.onTouchMoveHandler);
        window.removeEventListener('touchend', this.onTouchEndHandler);
    }

    onPointerMoveHandler(event: MouseEvent) {
        this.calculateMovement(event.pageX, event.pageY);
    }

    onPointerUpHandler(event: MouseEvent) {
        if (this.props.onPointerUp) {
            this.props.onPointerUp(event)
        }
        this.setState({
            movementEndPosition: {pageX: event.pageX, pageY: event.pageY},
            movementStartPosition: null
        })
        window.removeEventListener('mousemove', this.onPointerMoveHandler);
        window.removeEventListener('mouseup', this.onPointerUpHandler);
    }

    onPointerDownHandler(event: React.MouseEvent) {
        this.setState({
            movementStartPosition: {pageX: event.pageX, pageY: event.pageY},
        }, () => {
            window.addEventListener('mousemove', this.onPointerMoveHandler);
            window.addEventListener('mouseup', this.onPointerUpHandler);
            window.addEventListener('touchmove', this.onTouchMoveHandler);
            window.addEventListener('touchend', this.onTouchEndHandler);
        })
        if (this.props.onPointerDown) {
            this.props.onPointerDown(event);
        }
    }

    render() { 
        return (
            <div 
                onPointerDown={this.onPointerDownHandler}
            >
                {this.props.children}
            </div>
        )
    }
}