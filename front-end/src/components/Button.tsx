import React from 'react';
import CSS from 'csstype';
import './Button.scss';
import {ThemeContext, ThemeType} from './Theming';

interface PropsType {
    variant?: string,
    [propName: string]: any
}

export default function Button(props: PropsType) {

    function makeStyleFromTheme(variant: string, theme: ThemeType) {
        const customButtonStyle: CSS.Properties = {
            backgroundColor: theme[variant],
        };
        if (variant.startsWith('outline-')) {
            variant = variant.replace('outline-', '');
            customButtonStyle.backgroundColor = 'none'; 
            customButtonStyle.border = '2px solid'; 
            customButtonStyle.borderColor = theme[variant]; 
            customButtonStyle.color = theme[variant]; 
        } else {
            customButtonStyle.backgroundColor = theme[variant]
            customButtonStyle.color = theme.textBackground; 
        }
        return customButtonStyle
    }

    function renderButton(theme: ThemeType) {
        const style = makeStyleFromTheme(props.variant || 'primary', theme)
        return (
            <button style={style} {...props}>
                {props.children}
            </button>
        )

    }

    return (
        <ThemeContext.Consumer>
            {({theme}) => renderButton(theme)}
        </ThemeContext.Consumer>
    )
}
