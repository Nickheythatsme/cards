import React, { useRef, useState, useEffect } from 'react';
import './NavMenu.scss';
import NavItemHolder from './NavItemHolder';
import { IoIosArrowUp } from "react-icons/io";
import { useSpring, animated } from 'react-spring'
import { useGesture } from 'react-use-gesture'
import {FullGestureState} from 'react-use-gesture/dist/types';
import { currentWindowBreakpoint, clamp } from '../Utils';

interface StateTypes {
    isMobile: boolean,
}

interface FoldableMenuPropTypes {
    isMobile: boolean,
}

const ExpandButton = React.forwardRef(({isExpanded, ...props}: any, ref: React.Ref<any>) => (
    <div {...props} ref={ref} className={`expand-button${isExpanded ? ' expand' : ''}`}>
        <IoIosArrowUp/>
    </div>
));

function FoldableMenu(props: FoldableMenuPropTypes) {
    const expandButton = useRef(null);
    const [expandButtonSize, setExpandButtonSize] = useState(0);
    const [isExpanded, setIsExpanded] = useState(true);
    const [isMobile, setIsMobile] = useState(true);
    const [isPeeking, setIsPeeking] = useState(isExpanded);
    const [{ xy }, set] = useSpring(() => ({ xy: [0, isExpanded ? 0 : expandButtonSize] }));

    const handleAction = ({ xy, delta, velocity, args }: FullGestureState<'move'>) => {
        let [_isExpanded, , expandButtonSize, isMobile, _setIsPeeking] = args;
        velocity = clamp(velocity, 1, 8);
        let adjustedDelta = [0, _isExpanded ? delta[1] : xy[1] - expandButtonSize];
        if (!isMobile) {
            set({ xy: [0, 0], config: { mass: 1, tension: 500, friction: 50 } })
            return;
        }
        if (Math.abs(delta[1]) > 30) {
            _setIsPeeking(delta[1] > 0);
        }
        set({ 
            xy: adjustedDelta,
            config: { mass: velocity, tension: 500 * velocity, friction: 50 } 
        });
    }

    const handleUp = ({args, delta}: FullGestureState<'move'>) => {
        let [, _setIsExpanded, , , _setIsPeeking] = args;
        if (delta[1] > 200) {
            _setIsExpanded(true);
        } else if (delta[1] < -100) {
            _setIsExpanded(false);
        }
        _setIsPeeking(isExpanded);
        let restingPos = [0, isExpanded ? 0 : -expandButtonSize];
        set({ 
            xy: restingPos, 
            config: { mass: 1, tension: 500, friction: 50 } 
        })
    }

    const bind = useGesture({
        onMove: handleAction,
        onMoveEnd: handleUp,
    })

    useEffect(() => {
        if (expandButtonSize === 0 && expandButton && (expandButton as any).current) {
            setExpandButtonSize((expandButton as any).current.offsetTop);
        }
        setIsMobile(props.isMobile)
        if (isMobile) {
            let restingPos = [0, isExpanded ? 0 : -expandButtonSize];
            set({ 
                xy: restingPos, 
                config: { mass: 1, tension: 500, friction: 50 } 
            })
        } else {
            set({xy: [0,0]})
        }
    }, [props, set, expandButtonSize, setExpandButtonSize, isExpanded, setIsMobile, isMobile]);

    const formatStyle = (xy: any) => ({
        transform: xy.interpolate((x: any, y: any) => `translateY(${y}px)`)
    });

    const handleClick = () => {
        setIsExpanded(!isExpanded)
        setIsPeeking(!isExpanded);
    }

    return (
        <animated.div {...bind(isExpanded, setIsExpanded, expandButtonSize, isMobile, setIsPeeking)} className="nav-menu" style={formatStyle(xy)}>
            <ExpandButton onClick={handleClick} ref={expandButton} isExpanded={isExpanded}/>
            <NavItemHolder isPeeking={isPeeking}/>
        </animated.div>
    );
};

export default class NavMenu extends React.Component<any, StateTypes> {
    state = {
        navMenuPosition: 0,
        navMenuBuffer: 0,
        isMobile: false,
    }
    private containerRef: React.Ref<any>;

    constructor(props: any) {
        super(props);
        this.handleResize = this.handleResize.bind(this);
        this.containerRef = React.createRef();
    }

    componentDidMount() {
        this.handleResize();
        window.addEventListener('resize', this.handleResize);
        if (this.containerRef && (this.containerRef as any).current) {
            (this.containerRef as any).current.addEventListener('touchmove', (e: TouchEvent) => {
                e.preventDefault();
            });
        }
    }

    handleResize() {
        this.setState({
            isMobile: ['xs', 'sm'].includes(currentWindowBreakpoint())
        }, () => console.debug('isMobile: ', this.state.isMobile));
    }

    render() {
        return (
            <div ref={this.containerRef}>
                <FoldableMenu
                    isMobile={this.state.isMobile}
                />
            </div>
        )
    }
}
