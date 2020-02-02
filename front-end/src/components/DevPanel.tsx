import React from 'react';
import {useWindowDimensions} from './Utils'
import {BreakpointSizes} from './Theming';

function showBreakpoint(width: number) {
    let size = 'xs';
    Object.keys(BreakpointSizes).forEach(key => {
        if (width > BreakpointSizes[key]) {
            size = key;
        }
    });
    return size;
}

const ShowAll: React.FC = () => {
    const { height, width } = useWindowDimensions();
    let currentBreakpoint = showBreakpoint(width);

    return (
        <div style={{position: 'fixed', top: 0, left: 0, backgroundColor: 'rgb(168, 168, 168, .5)'}}>
            <span>Window height: {height}</span>
            <br/>
            <span>Window width: {width}</span>
            <br/>
            <span>breakpont: {currentBreakpoint}</span>
        </div>
    )
}

export default ShowAll;
