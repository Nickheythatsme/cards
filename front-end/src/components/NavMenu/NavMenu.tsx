import React, { useRef, useState, useEffect } from 'react';
import { useDrag } from 'react-use-gesture';
import classnames from 'classnames';
import { IoIosArrowUp } from 'react-icons/io';
import { useSpring, animated } from 'react-spring';
import { FullGestureState } from 'react-use-gesture/dist/types';
import { currentWindowBreakpoint, clamp } from '../Utils';
import NavItemHolder from './NavItemHolder';
import './NavMenu.scss';

interface NavMenuStateTypes {
    isMobile: boolean;
    listenersSet: boolean;
}

interface MenuArgs {
    percentExpanded: number;
    setIsExpanded: (value: boolean) => void;
}

interface MenuPropTypes {
    children: (results: MenuArgs) => React.ReactNode;
    containerRef: React.Ref<any>;
}

const ExpandButton = React.forwardRef(
    ({ percentExpanded, className, ...props }: any, ref: React.Ref<any>) => {
        const [currentStyle, setCurrentStyle]: [any, any] = useState(null);
        const [prevPercent, setPrevPercent] = useState(0);
        useEffect(() => {
            if (
                percentExpanded !== undefined &&
                percentExpanded !== prevPercent
            ) {
                // eslint-disable-next-line
                percentExpanded = clamp(percentExpanded, 0, 100);
                setCurrentStyle({
                    transform: `rotate(${180 -
                        1.8 * percentExpanded}deg)`.toString(),
                });
                setPrevPercent(percentExpanded);
            }
        }, [percentExpanded, setCurrentStyle, prevPercent, setPrevPercent]);
        return (
            <div
                {...props}
                ref={ref}
                className={classnames('expand-button', className)}
                style={currentStyle}
            >
                <IoIosArrowUp />
            </div>
        );
    }
);

function FoldableMenu(props: MenuPropTypes) {
    const expandButton = useRef(null);
    const [expandButtonOffset, setExpandButtonOffset] = useState(0);
    const [lastOffset, setLastOffset] = useState(0);
    const [percentExpanded, setPercentExpanded] = useState(0);
    const [{ y }, set] = useSpring(() => ({ y: 0 }));

    const bind = useDrag(
        ({ down, velocity, args, movement, xy }: FullGestureState<'drag'>) => {
            let [expandButtonOffset, lastOffset, setPercentExpanded] = args;
            velocity = clamp(velocity, 1, 8);
            if (Math.abs(movement[1]) < 10) {
                return;
            }
            let y = movement[1] - lastOffset;
            if (!down) {
                if (xy[1] > expandButtonOffset / 2) {
                    toggleExpand(true);
                    return;
                } else {
                    toggleExpand(false);
                    return;
                }
            }
            let percent = (100 / Math.abs(expandButtonOffset)) * y + 100;
            setPercentExpanded(percent);
            set({
                y: y,
                config: {
                    mass: velocity / 2,
                    tension: 500 * velocity,
                    friction: 50,
                },
            });
        }
    );

    useEffect(() => {
        if (
            expandButtonOffset === 0 &&
            expandButton &&
            (expandButton as any).current
        ) {
            let offset: number = (expandButton as any).current.offsetTop;
            setExpandButtonOffset(offset);
            setLastOffset(offset);
            setPercentExpanded(0);
            set({
                y: -offset,
                config: { mass: 1, tension: 200, friction: 50, duration: 0 },
            });
        }
    }, [
        expandButtonOffset,
        setExpandButtonOffset,
        expandButton,
        setLastOffset,
        setPercentExpanded,
        percentExpanded,
        set,
    ]);

    const formatStyle = (y: any) => ({
        transform: y.interpolate((y: any) => `translateY(${y}px)`),
    });

    const toggleExpand = (doExpand?: boolean) => {
        let config = { mass: 1, tension: 500, friction: 50 };
        if (doExpand === true || (doExpand !== false && lastOffset > 0)) {
            setPercentExpanded(100);
            setLastOffset(0);
            set({ y: 0, config });
        } else {
            setPercentExpanded(0);
            setLastOffset(expandButtonOffset);
            set({ y: -expandButtonOffset, config });
        }
    };

    return (
        <animated.div
            {...bind(expandButtonOffset, lastOffset, setPercentExpanded)}
            className="nav-menu"
            style={formatStyle(y)}
            ref={props.containerRef}
        >
            <ExpandButton
                onClick={toggleExpand}
                ref={expandButton}
                percentExpanded={percentExpanded}
            />
            {props.children({ percentExpanded, setIsExpanded: toggleExpand })}
        </animated.div>
    );
}

function FixedMenu(props: MenuPropTypes) {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <div className="nav-menu">
            <ExpandButton
                onClick={() => {
                    setIsExpanded(!isExpanded);
                }}
                className={isExpanded ? 'expand' : ''}
            />
            {props.children({
                percentExpanded: isExpanded ? 100 : 0,
                setIsExpanded,
            })}
        </div>
    );
}

export default class NavMenu extends React.Component<any, NavMenuStateTypes> {
    state = {
        isMobile: false,
        listenersSet: false,
    };
    private containerRef: React.Ref<any>;

    constructor(props: any) {
        super(props);
        this.handleResize = this.handleResize.bind(this);
        this.containerRef = React.createRef();
    }

    componentDidMount() {
        this.handleResize();
        window.addEventListener('resize', this.handleResize);
    }

    componentDidUpdate() {
        if (!this.state.listenersSet && (this.containerRef as any).current) {
            this.setState({ listenersSet: true });
            console.log('adding listeners');
            (this.containerRef as any).current.addEventListener(
                'touchmove',
                (e: TouchEvent) => {
                    e.preventDefault();
                }
            );
        }
    }

    handleResize() {
        this.setState({
            isMobile: ['xs', 'sm'].includes(currentWindowBreakpoint()),
        });
    }

    render() {
        if (this.state.isMobile) {
            return (
                <div ref={this.containerRef}>
                    <FoldableMenu containerRef={this.containerRef}>
                        {({ percentExpanded, setIsExpanded }) => (
                            <NavItemHolder
                                percentExpanded={percentExpanded}
                                onSelect={() =>
                                    setTimeout(() => setIsExpanded(false), 400)
                                }
                            />
                        )}
                    </FoldableMenu>
                </div>
            );
        } else {
            return (
                <FixedMenu containerRef={this.containerRef}>
                    {({ percentExpanded, setIsExpanded }) => (
                        <NavItemHolder
                            percentExpanded={percentExpanded}
                            onSelect={() => setIsExpanded(false)}
                        />
                    )}
                </FixedMenu>
            );
        }
    }
}
