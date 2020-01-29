import React from 'react';
import './Container.scss';
import CSS from 'csstype';

const containerStyle: CSS.Properties = {
    width: '100%',
    marginRight: 'auto',
    marginLeft: 'auto',
}

const fluidContainerStyle: CSS.Properties = {
    ...containerStyle,
}

export default function Container(props: any) {
    return (
        <div style={containerStyle}>
            {props.children}
        </div>
    )
}
