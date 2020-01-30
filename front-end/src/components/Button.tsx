import React from 'react';
import './Button.scss';

interface PropsType {
    variant?: string,
    [propName: string]: any
}

export default function Button(props: PropsType) {
    let className: string = props.className || 'btn'
    if (className.indexOf('btn') < 0) {
        className = 'btn ' + className;
    }

    return (
        <button className={'btn-primary'} {...props}>
            {props.children}
        </button>
    )
}
