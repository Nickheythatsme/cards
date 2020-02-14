import React from 'react';
import NavItem from '../NavItem';
import { IoIosHappy, IoMdHome, IoMdSettings } from "react-icons/io";

interface PropTypes {
    children?: React.ReactNode,
    isExpanded: boolean,
}

interface StateTypes {
    activeItem: string;

}

export default class NavItemHolder extends React.Component<PropTypes, StateTypes> {
    state = {
        activeItem: 'Home'
    }

    private navItems = [
        {icon: (<IoMdHome/>), name: 'Home'},
        {icon: (<IoIosHappy/>), name: 'Profile'},
        {icon: (<IoMdSettings/>), name: 'Settings'},
    ];

    constructor(props: PropTypes) {
        super(props);
    }

    render() {
        return (
            <div className="nav-item-holder">
                {this.navItems.map(item => (
                    <NavItem 
                        key={item.name}
                        icon={item.icon}
                        name={item.name}
                        isExpanded={this.props.isExpanded} 
                        isActive={this.state.activeItem === item.name}
                        onClick={() => this.setState({activeItem: item.name})}
                    />
                ))}
            </div>
        );
    }
}
