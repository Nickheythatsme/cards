import React from 'react';

export const BreakpointSizes: any = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
}

const ThemeColors: any = {
    light: {
        '--primary': '#E27D60',
        '--secondary': '#85DCB0',
        '--info': '#C38D9E',
        '--text-primary': '#000',
        '--background-primary': '#fff',
        '--background-secondary': 'grey',
        '--warning': '#E8A87C',
        '--danger': '#F64C72',
    },
    dark : {
        '--primary': '#3A7F7F',
        '--secondary': '#907163',
        '--info': '#5cd895',
        '--text-primary': '#fff',
        '--background-secondary': 'grey',
        '--warning': '#edf5e1',
        '--danger': '#F13C20',
    }
}

export const ThemeContext = React.createContext({
    theme: ThemeColors.light,
    toggleTheme: () => {}
});


export default class Theming extends React.Component {
    state = {
        theme: ThemeColors.light,
        formattedStyle: Theming.formatStyle(ThemeColors.light)
    }

    constructor(props: any) {
        super(props);
        this.toggleTheme = this.toggleTheme.bind(this);
    }

    toggleTheme() {
        this.setState((state: any) => {
            state.theme = state.theme === ThemeColors.light ? ThemeColors.dark : ThemeColors.light;
            state.formattedStyle = Theming.formatStyle(state.theme);
            return state;
        }, () => this.forceUpdate());
    };

    static formatStyle(theme: any) {
        let formattedStyle = `body{`;
        Object.keys(theme).forEach(key => {
            formattedStyle += `${key}:${theme[key]};`
        });
        formattedStyle += '}'
        return formattedStyle;
    }

    render() {
        return (
            <ThemeContext.Provider value={{theme: this.state.theme, toggleTheme: this.toggleTheme}}>
                <style>
                    {this.state.formattedStyle}
                </style>
                {this.props.children}
            </ThemeContext.Provider>
        )
    }
}
