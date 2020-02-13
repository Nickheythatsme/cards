import React from 'react';
import classNames from 'classnames';
import './NavItem.scss';

function NavItem(props: any) {
    return (<li>{props.children}</li>)
}

export default NavItem
