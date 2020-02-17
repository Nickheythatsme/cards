import React, {useEffect, useRef, useState} from 'react';
import './NavMenu.scss';
import NavItemHolder from './NavItemHolder';
import { IoIosMenu } from "react-icons/io";
import { useSpring, animated } from 'react-spring'
import {clamp} from 'lodash';
import { useGesture } from 'react-with-gesture'
import {currentWindowBreakpoint, useWindowBreakpoint} from '../Utils';

interface StateTypes {
    isExpanded: boolean,
    navMenuPosition: number,
    navMenuBuffer: number,
    isReadyToRender: boolean
}

interface FoldableMenuPropTypes {
    navMenuPosition: number,
    onClick: () => void,
    isExpanded: boolean,
    handleFlick: (doExpand?: boolean) => void,
}

const ExpandButton = React.forwardRef((props: any, ref: React.Ref<any>) => (
    <div {...props} ref={ref} className="expand-button"><IoIosMenu/></div>
));

const FoldableMenu = React.forwardRef((props: FoldableMenuPropTypes, parentRef: React.Ref<any>) => {
    const formatStyle = (xy: any) => {
        return {
            transform: xy.interpolate((x: any, y: any) => `translateY(${y}px)`),
            top: `${props.navMenuPosition}px`
        }
    }
    const br = useWindowBreakpoint();
    const menuRef = useRef(null);
    const [isEventListenerSet, setIsEventListenerSet] = useState(false);
    const [{ xy }, set] = useSpring(() => ({ xy: [0, 0] }));
    const bind = useGesture(({ down, delta, xy, velocity }) => {
        velocity = clamp(velocity, 1, 8)
        if (velocity > 3 || xy[1] > 200) {
            props.handleFlick(delta[1] > 0);
        }
        set({ xy: down ? delta : [0, 0], config: { mass: velocity, tension: 500 * velocity, friction: 50 } })
    });

    useEffect(() => {
        if (!isEventListenerSet && menuRef && (menuRef as any).current) {
            (menuRef as any).current.addEventListener('touchmove', (e: TouchEvent) => {
                e.preventDefault();
            });
            setIsEventListenerSet(true);
        }
    });

    if (br === 'xs' || br === 'sm') {
        return (
            <animated.div ref={menuRef} {...bind()} className="nav-menu" style={formatStyle(xy)}>
                <ExpandButton ref={parentRef} onClick={props.onClick}/>
                <NavItemHolder isExpanded={props.isExpanded}/>
            </animated.div>
        );
    } else {
        return (
            <div className="nav-menu">
                <ExpandButton ref={parentRef} onClick={props.onClick} style={{}}/>
                <NavItemHolder isExpanded={props.isExpanded}/>
            </div>
        );
    }
});

export default class NavMenu extends React.Component<any, StateTypes> {
    state = {
        isExpanded: false,
        navMenuPosition: 0,
        navMenuBuffer: 0,
        isReadyToRender: false,
    }
    private expandButtonRef: React.Ref<any>;

    constructor(props: any) {
        super(props);
        this.expandButtonRef = React.createRef(); 
        this.toggleExpanded = this.toggleExpanded.bind(this);
    }

    componentDidMount() {
        console.log('ref: ', this.expandButtonRef);
        if (this.expandButtonRef) {
            this.setState({
                navMenuBuffer: (this.expandButtonRef as any).current.clientHeight,
                navMenuPosition: -(this.expandButtonRef as any).current.offsetTop,
                isReadyToRender: true
            })
        }
    }

    expandMenu() {
        this.setState({
            isExpanded: true,
            navMenuPosition: 0
        })
    }

    collapseMenu() {
        this.setState({
            isExpanded: false,
            navMenuPosition: -(this.expandButtonRef as any).current.offsetTop,
        });
    }

    toggleExpanded(doExpand?: boolean) {
        if (doExpand === false) {
            this.collapseMenu();
        } else if (doExpand === true) {
            this.expandMenu();
        } else {
            this.state.isExpanded ? this.collapseMenu() : this.expandMenu();
        }
    }

    render() {
        return (
            <>
                <FoldableMenu
                    onClick={this.toggleExpanded}
                    navMenuPosition={this.state.navMenuPosition}
                    isExpanded={this.state.isExpanded}
                    ref={this.expandButtonRef}
                    handleFlick={this.toggleExpanded}
                />
                <div className="nav-menu-buffer" style={{height: `${this.state.navMenuBuffer + 5}px`}}/>
            </>
        );
    }
}
