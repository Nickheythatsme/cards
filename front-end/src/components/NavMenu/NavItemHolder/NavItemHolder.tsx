import React, { useState, useEffect } from 'react';
import NavItem from '../NavItem';
import { useTrail, animated } from 'react-spring';
import {
    IoIosTrophy,
    IoIosHappy,
    IoMdHome,
    IoMdSettings,
} from 'react-icons/io';
import { useWindowBreakpoint } from '../../Utils';
import './NavItemHolder.scss';

interface PropTypes {
    children?: React.ReactNode;
    percentExpanded: number;
    onSelect?: (name: string) => void;
}

export const navItems = [
    { icon: <IoMdHome />, name: 'Home' },
    { icon: <IoIosHappy />, name: 'Profile' },
    { icon: <IoMdSettings />, name: 'Settings' },
    { icon: <IoIosTrophy />, name: 'Tasks' },
];

export default function NavItemHolder(props: PropTypes) {
    const [activeItem, setActiveItem] = useState('Home');
    const [isPeeking, setIsPeeking] = useState(false);
    const [isMobile, setIsMobile] = useState(true);
    const br = useWindowBreakpoint();
    const trail = useTrail(navItems.length, {
        x: isPeeking ? 0 : -200,
        from: {
            x: -200,
        },
        config: (i: number) => ({
            mass: 1,
            tension: 170 * (i + 1),
            friction: 26,
        }),
    });

    useEffect(() => {
        if (props.percentExpanded > 70) {
            setIsPeeking(true);
        } else {
            setIsPeeking(false);
        }
        setIsMobile(['xs', 'sm'].includes(br));
    }, [props, setIsPeeking, br, setIsMobile, isMobile]);

    const handleClick = (name: string) => {
        setActiveItem(name);
        props.onSelect && props.onSelect(name);
    };

    return (
        <div className="nav-item-holder">
            {trail.map(({ x }, index) => (
                <animated.div
                    style={
                        isMobile
                            ? {
                                  transform: (x as any).interpolate(
                                      (x: any) => `translate3d(0,${x}px,0)`
                                  ),
                              }
                            : {}
                    }
                    key={navItems[index].name}
                >
                    <NavItem
                        icon={navItems[index].icon}
                        name={navItems[index].name}
                        isExpanded={isPeeking}
                        isActive={activeItem === navItems[index].name}
                        onClick={() => handleClick(navItems[index].name)}
                    />
                </animated.div>
            ))}
        </div>
    );
}
