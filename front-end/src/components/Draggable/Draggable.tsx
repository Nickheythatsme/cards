import React from 'react';
import './Draggable.scss';
import PointerTrack from './PointerTrack';

const TRANSITION_DURATION = 200; // ms

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
    },
    isTransitioning: boolean
}

export interface DraggablePropTypes extends React.PropsWithChildren<any> {
    onPointerDown?: (event: any) => void,
    onPointerUp?: (event: any) => void,
    onPointerMove?: (event: any) => void,
}


export default class Draggable extends React.Component<DraggablePropTypes, StateType> {
    state: StateType = {
        originalPosition: null,
        lastDropPosition: null,
        position: {
            pageX: 0,
            pageY: 0
        },
        isTransitioning: false
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
        if (!this.state.originalPosition) {
            return;
        }
        this.setState(state => ({
            position: state.originalPosition!,
            lastDropPosition: state.originalPosition!,
            isTransitioning: true
        }), () => setTimeout(() => {
            this.setState({isTransitioning: false})
        }, TRANSITION_DURATION))
    }

    handleDrop() {
        this.setState(state => ({
            lastDropPosition: state.position
        }))
    }

    formatPosition() {
        if (this.state.originalPosition) {
            return {
                transition: this.state.isTransitioning ? `all ${TRANSITION_DURATION}ms ease-in-out` : undefined,
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
                <div ref={this.objRef} style={this.formatPosition()}>
                    {this.props.children}
                </div>
            </PointerTrack>
        )
    }
}

