import React from 'react';
import './Draggable.scss';
import PointerTrack from './PointerTrack';
import { Transition, CSSTransition, TransitionGroup } from 'react-transition-group';


const defaultStyle = {
    transition: `opacity ${200}ms ease-in-out`,
    opacity: 0,
}

const transitionStyles: any = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
};

interface StateType {
    originalPosition: null | {
        pageX: number,
        pageY: number
    },
    lastDropPosition: null | {
        pageX: number,
        pageY: number
    }
    position: {
        pageX: number,
        pageY: number
    }
}

export interface DraggablePropTypes extends React.PropsWithChildren<any> {
    onPointerDown?: (event: any) => void,
    onPointerUp?: (event: any) => void,
    onPointerMove?: (event: any) => void,
}


export default class Draggable extends React.Component<DraggablePropTypes> {
    state: StateType = {
        originalPosition: null,
        lastDropPosition: null,
        position: {
            pageX: 0,
            pageY: 0
        }
    }

    // To store the original location
    private objRef: React.Ref<any> = React.createRef();

    constructor(props: any) {
        super(props);
        this.handleMovement = this.handleMovement.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
        this.resetPosition = this.resetPosition.bind(this);
    }

    componentDidMount() {
        if (this.objRef) {
            let position = {
                pageX: (this.objRef as any).current.offsetLeft,
                pageY: (this.objRef as any).current.offsetTop
            }
            this.setState({
                position: position,
                // wait to move the object until we have the original location
                originalPosition: position,
                lastDropPosition: position
            });
        }
    }

    handleMovement(movement: { movementX: number, movementY: number }) {
        if (!this.state.lastDropPosition) {
            console.error('Last drop position has not been set!');
            return;
        }
        this.setState((state: StateType) => ({
            position: {
                pageX: state.lastDropPosition!.pageX - movement.movementX,
                pageY: state.lastDropPosition!.pageY - movement.movementY
            }
        }))
    }

    resetPosition() {
        this.setState(state => ({
            position: (state as StateType).originalPosition,
            lastDropPosition: (state as StateType).originalPosition
        }))
    }

    handleDrop() {
        this.setState(state => ({
            lastDropPosition: (state as any).position
        }))
    }

    formatCurrentPosition() {
        if (this.state.originalPosition) {
            return {
                position: "fixed" as const,
                left: this.state.position.pageX,
                top: this.state.position.pageY,
            }
        }
        return {};
    }

    render() {
        return (
            <PointerTrack
                {...this.props}
                onPointerMove={this.handleMovement}
                onPointerUp={this.handleDrop}
            >
                <TransitionGroup>
                    <CSSTransition
                    classNames="example"
                    timeout={{ enter: 500, exit: 300 }}
                    >
                        <div>fade!</div>
                    </CSSTransition>
                </TransitionGroup>
                <div ref={this.objRef} style={this.formatCurrentPosition()}>
                    {this.props.children}
                </div>
            </PointerTrack>
        )
    }
}

