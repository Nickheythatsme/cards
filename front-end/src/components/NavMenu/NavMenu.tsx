import React, {useState} from 'react';
import './NavMenu.scss';
import NavItemHolder from './NavItemHolder';
import { IoIosMenu } from "react-icons/io";

function ExpandButton(props: any) {
    return (
        <div {...props} className="expand-button"><IoIosMenu/></div>
    )
}

function NavMenu(props: any) {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <div className="nav-menu">
            <ExpandButton onClick={() => setIsExpanded(!isExpanded)}/>
            <NavItemHolder isExpanded={isExpanded}/>
        </div>
    );
}

export default NavMenu;
