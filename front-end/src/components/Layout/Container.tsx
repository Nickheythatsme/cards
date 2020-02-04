import React from 'react';
import './Layout.scss';

export default function Container(props: any) {
    let className = `${props.fluid ? 'container fluid' : 'container'} ${props.className || ''}`;
    return (
        <div className={className}>
            {props.children}
        </div>
    );
}
