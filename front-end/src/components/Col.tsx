import React from 'react';

export default function Row(props: any) {
    return (
        <div className={'col'}>
            {props.children}
        </div>
    )
}


