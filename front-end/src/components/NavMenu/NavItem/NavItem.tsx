import React from 'react'
import classNames from 'classnames'
import './NavItem.scss'

type HTMLMouseEvent = React.MouseEvent<HTMLDivElement, MouseEvent>
interface PropTypes {
    name: string
    icon: React.ReactNode
    isExpanded?: boolean
    isActive?: boolean
    onClick?: (e: HTMLMouseEvent) => any
}

function NavItem(props: PropTypes) {
    return (
        <div
            onClick={props.onClick}
            className={classNames(
                'nav-item',
                { active: props.isActive },
                { hidden: !props.isExpanded }
            )}
        >
            <div
                className={classNames('nav-item-icon', {
                    active: props.isActive,
                })}
            >
                {props.icon}
            </div>
            <div
                className={classNames('nav-item-content', {
                    hidden: !props.isExpanded,
                })}
            >
                {props.name}
            </div>
        </div>
    )
}

export default NavItem
