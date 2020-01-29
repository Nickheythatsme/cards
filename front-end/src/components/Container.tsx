import React from 'react';
import './Container.scss';

export default function Container(props: any) {
    return (
        <div className={props.fluid ? 'container fluid' : 'container'}>
            {props.children}
        </div>
    );
}
