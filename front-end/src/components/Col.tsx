import React from 'react';
//import CSS from 'csstype';

export default function Row(props: any) {
    return (
        <div className={'col'}>
            {props.children}
        </div>
    )
}


