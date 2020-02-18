import React, {useState, useEffect} from 'react';
import NavItem from '../NavItem';
import { useTrail, animated } from 'react-spring'
import { IoIosHappy, IoMdHome, IoMdSettings } from "react-icons/io";
import { useWindowBreakpoint } from '../../Utils';

interface PropTypes {
    children?: React.ReactNode,
    isExpanded: boolean,
}

export default function NavItemHolder(props: PropTypes) {
    const [activeItem, setActiveItem] = useState('Home');
    const [isExpanded, setIsExpanded] = useState(props.isExpanded);
    const [isMobile, setIsMobile] = useState(true);
    const br = useWindowBreakpoint();
    const navItems = [
        {icon: (<IoMdHome/>), name: 'Home'},
        {icon: (<IoIosHappy/>), name: 'Profile'},
        {icon: (<IoMdSettings/>), name: 'Settings'},
    ];
    const trail = useTrail(navItems.length, {
        x: isExpanded ? 0 : -200,
        opacity: isExpanded ? 1 : 1,
        from: { x: -200, opacity: 1 },
        config: (i: number) => ({ mass: 1, tension: 170 * (i + 1), friction: 26 }),
    });

    useEffect(() => {
        setIsExpanded(props.isExpanded);
        console.log('isExpanded? ', isExpanded);
        setIsMobile(['xs', 'sm'].includes(br));
        console.log('isMobile: ', isMobile)
    }, [props, setIsExpanded, isExpanded, br, setIsMobile, isMobile]);

    return (
        <div className="nav-item-holder">
            {trail.map(({x, opacity}, index) => (
                <animated.div 
                    style={{
                        transform: (x as any).interpolate((x: any)=> `translate3d(0,${x}px,0)`), 
                        opacity: opacity
                    }} 
                    key={navItems[index].name}
                >
                    <NavItem
                        icon={navItems[index].icon}
                        name={navItems[index].name}
                        isExpanded={isExpanded} 
                        isActive={activeItem === navItems[index].name}
                        onClick={() => setActiveItem(navItems[index].name)}
                    />
                    </animated.div>
            ))}
        </div>
    )
}
