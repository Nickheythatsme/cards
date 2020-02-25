import React, { useRef, useState, useEffect } from 'react';
import classnames from 'classnames';
import './NavMenu.scss';
import NavItemHolder from './NavItemHolder';
import { IoIosArrowUp } from "react-icons/io";
import { useSpring, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import {FullGestureState} from 'react-use-gesture/dist/types';
import { currentWindowBreakpoint, clamp } from '../Utils';

interface StateTypes {
    isMobile: boolean,
}

interface FoldableMenuArgs {
    percentExpanded: number,
    setIsExpanded: (value: boolean) => void,
}
interface FoldableMenuPropTypes {
    children: (results: FoldableMenuArgs) => React.ReactNode,
}

const ExpandButton = React.forwardRef(({percentExpanded, className, ...props}: any, ref: React.Ref<any>) => {
    const[currentStyle, setCurrentStyle]: [any, any] = useState({transform: 'rotate(90deg)'});
    useEffect(() => {
        if (percentExpanded) {
            let adjustedPercentExpanded = clamp(percentExpanded, 0, 100);
            setCurrentStyle({transform: `rotate(${180 - 1.8*adjustedPercentExpanded}deg)`.toString()});
        } else {
            setCurrentStyle(null);
        }
    }, [percentExpanded, setCurrentStyle])
    return (
        <div {...props} ref={ref} className={classnames("expand-button", className)} style={currentStyle}>
            <IoIosArrowUp/>
        </div>
    );
});

function FoldableMenu(props: FoldableMenuPropTypes) {
    const expandButton = useRef(null);
    const [expandButtonOffset, setExpandButtonOffset] = useState(0);
    const [lastOffset, setLastOffset] = useState(0);
    const [percentExpanded, setPercentExpanded] = useState(0);
    const [{ y }, set] = useSpring(() => ({ y: 0 }));
    const bind = useDrag(({down, velocity, args, movement, xy}: FullGestureState<"drag">) => {
        let [expandButtonOffset, lastOffset, setLastOffset, setPercentExpanded] = args;
        velocity = clamp(velocity, 1, 8);
        if (Math.abs(movement[1]) < 20) {
            return;
        }
        let y = movement[1] - lastOffset;
        if (!down) {
            if (xy[1] > (expandButtonOffset/2)) {
                console.log('greater than expandButtonOffset');
                y = 0;
                setLastOffset(0);
            }
            else {
                y = -expandButtonOffset;
                setLastOffset(expandButtonOffset);
            }
        }
        let percent = (100/Math.abs(expandButtonOffset)) * y + 100;
        setPercentExpanded(percent);
        set({ 
            y: y,
            config: { mass: velocity/2, tension: 500 * velocity, friction: 50 } 
        });
    });

    useEffect(() => {
        if (expandButtonOffset === 0 && expandButton && (expandButton as any).current) {
            let offset: number = (expandButton as any).current.offsetTop;
            setExpandButtonOffset(offset);
            setLastOffset(offset);
            setPercentExpanded(0);
            set({ 
                y: -offset,
                config: { mass: 1, tension: 200, friction: 50, duration: 0 } 
            })
        }
    }, [expandButtonOffset, setExpandButtonOffset, expandButton, setLastOffset, setPercentExpanded, percentExpanded, set]);

    const formatStyle = (y: any) => ({
        transform: y.interpolate((y: any) => `translateY(${y}px)`)
    });

    const toggleExpand = (doExpand?: boolean) => {
        let config = { mass: 1, tension: 500, friction: 50 };
        if (doExpand === true || lastOffset > 0) {
            setPercentExpanded(100);
            setLastOffset(0);
            set({y: 0, config});
        } else {
            setPercentExpanded(0);
            setLastOffset(expandButtonOffset);
            set({ y: -expandButtonOffset, config});
        }
    }

    return (
        <animated.div {...bind(expandButtonOffset, lastOffset, setLastOffset, setPercentExpanded)} className="nav-menu" style={formatStyle(y)}>
            <ExpandButton onClick={toggleExpand} ref={expandButton} percentExpanded={percentExpanded}/>
            {props.children({percentExpanded, setIsExpanded: toggleExpand})}
        </animated.div>
    );
};


interface FixedMenuArgs {
    isExpanded: boolean
}

interface FixedMenuPropTypes {
    children: (results: FixedMenuArgs) => React.ReactNode,
}

function FixedMenu(props: FixedMenuPropTypes) {
    const [isExpanded, setIsExpanded] = useState(true);
    
    return (
        <div className="nav-menu">
            <ExpandButton onClick={() => {setIsExpanded(!isExpanded)}} className={isExpanded ? "expand" : ""} />
            {props.children({isExpanded})}
        </div>
    )
}

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
        if (this.state.isMobile) {
            return (
                <div ref={this.containerRef}>
                    <FoldableMenu>
                        {
                            ({percentExpanded, setIsExpanded}) => (
                                <NavItemHolder percentExpanded={percentExpanded}/>
                            )
                        }
                    </FoldableMenu>
                </div>
            )
        } else {
            return (
                <FixedMenu>
                    {
                        ({isExpanded}) => <NavItemHolder percentExpanded={isExpanded ? 100 : 0}/>
                    }
                </FixedMenu>
            )
        }
    }
}
