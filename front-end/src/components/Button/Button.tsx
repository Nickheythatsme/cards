import React from 'react';
import './Button.scss';
import {makeClassName} from '../Utils';

interface PropsType {
    variant?: string,
    [propName: string]: any
}

export default function Button(props: PropsType) {
    let className = props.className || makeClassName({
        base: 'btn',
        prefix: 'btn-',
        classNames: props.variant ? [props.variant] : []
    });

    return (
        <button className={className} onClick={props.onClick}>
            {props.children}
        </button>
    )
}
