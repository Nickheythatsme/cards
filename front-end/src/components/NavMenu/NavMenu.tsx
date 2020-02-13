import React from 'react';
import NavItem from './NavItem';
//import classNames from 'classnames';
import './NavMenu.scss';

function NavMenu(props: any) {
    return (<ul><NavItem>Home</NavItem><NavItem>Profile</NavItem></ul>)
}

export default NavMenu;
