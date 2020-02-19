import React, {useState, useEffect} from 'react';
import NavItem from '../NavItem';
import { useTrail, animated } from 'react-spring'
import { IoIosHappy, IoMdHome, IoMdSettings, IoIosTrophy } from "react-icons/io";
import { useWindowBreakpoint } from '../../Utils';
import './NavItemHolder.scss'

interface PropTypes {
    children?: React.ReactNode,
    isPeeking: boolean,
}

export default function NavItemHolder(props: PropTypes) {
    const [activeItem, setActiveItem] = useState('Home');
    const [isPeeking, setIsPeeking] = useState(props.isPeeking);
    const [isMobile, setIsMobile] = useState(true);
    const br = useWindowBreakpoint();
    const navItems = [
        {icon: (<IoMdHome/>), name: 'Home'},
        {icon: (<IoIosHappy/>), name: 'Profile'},
        {icon: (<IoMdSettings/>), name: 'Settings'},
        //{icon: (<IoIosTrophy/>), name: 'Find tasks'}
    ];
    const trail = useTrail(navItems.length, {
        x: isPeeking ? 0 : -200,
        from: {
            x: -200
        },
        config: (i: number) => ({ mass: 1, tension: 170 * (i + 1), friction: 26 }),
    });

    useEffect(() => {
        setIsPeeking(props.isPeeking);
        setIsMobile(['xs', 'sm'].includes(br));
    }, [props, setIsPeeking, isPeeking, br, setIsMobile, isMobile]);

    return (
        <div className="nav-item-holder">
            {trail.map(({x}, index) => (
                <animated.div 
                    style={isMobile ? {
                        transform: (x as any).interpolate((x: any)=> `translate3d(0,${x}px,0)`), 
                    } : {}} 
                    key={navItems[index].name}
                >
                    <NavItem
                        icon={navItems[index].icon}
                        name={navItems[index].name}
                        isExpanded={isPeeking} 
                        isActive={activeItem === navItems[index].name}
                        onClick={() => setActiveItem(navItems[index].name)}
                    />
                    </animated.div>
            ))}
        </div>
    )
}
