import React from 'react';

export default function Col(props: any) {
    return (
        <div className={'col'}>
            {props.children}
        </div>
    )
}
