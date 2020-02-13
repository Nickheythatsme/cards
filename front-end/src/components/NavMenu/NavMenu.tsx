import React, {useState} from 'react';
import NavItem from './NavItem';
import './NavMenu.scss';
import { IoIosMenu, IoIosHappy, IoMdHome, IoMdSettings } from "react-icons/io";

function ExpandButton(props: any) {
    return (
        <div {...props} className="expand-button"><IoIosMenu/></div>
    )
}

function NavMenu(props: any) {
    const [isExpanded, setIsExpanded] = useState(true);
    const [activeItem, setActiveItem] = useState('Home');

    const navItems = [
        {icon: (<IoMdHome/>), name: 'Home'},
        {icon: (<IoIosHappy/>), name: 'Profile'},
        {icon: (<IoMdSettings/>), name: 'Settings'},
    ]

    return (
        <div className="nav-menu">
            <ExpandButton onClick={() => setIsExpanded(!isExpanded)}/>
            <div className="nav-item-holder">
                {navItems.map(item => (
                    <NavItem 
                        key={item.name}
                        icon={item.icon}
                        name={item.name}
                        isExpanded={isExpanded} 
                        isActive={activeItem === item.name}
                        onClick={() => setActiveItem(item.name)}
                    />
                ))}
            </div>
        </div>
    );
}

export default NavMenu;
