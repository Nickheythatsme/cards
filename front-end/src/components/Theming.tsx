import React from 'react';
import Button from './Button';


export interface ThemeType {
    primary: string,
    secondary: string,
    info: string,
    warning: string,
    success: string,
    danger: string,
    textBackground: string,
    [themeName: string]: string
}

interface AllThemesType {
    [themeName: string]: ThemeType
}

export const themes: AllThemesType = {
    light: {
        primary: '#cc5cd6',
        secondary: '#5cd6bc',
        info: '#84ffe5',
        warning: '#ffbf80',
        success: '#4dff4d',
        danger: '#ff3333',
        textBackground: '#fff'
    },
    dark: {
        primary: '#5c5cd6',
        secondary: '#5cd65c',
        info: '#80ffe5',
        warning: '#ffbf80',
        success: '#4dff4d',
        danger: '#ff3333',
        textBackground: '#000'
    },
};

export const ThemeContext = React.createContext({
    theme: themes.dark,
    toggleTheme: () => {}
});

export default class Theming extends React.Component {
    state = {
        theme: themes.dark
    }

    constructor(props: any) {
        super(props);
        this.toggleTheme = this.toggleTheme.bind(this);
    }

    toggleTheme() {
        this.setState((state: any) => {
            if (state.theme === themes.dark) {
                state.theme = themes.light;
            } else {
                state.theme = themes.dark;
            }
            return state;
        }, () => {console.log('theme changed to: ' + (this.state.theme === themes.dark ? 'dark' : 'light' ))});
    };

    render() {
        return (
            <ThemeContext.Provider value={{theme: this.state.theme, toggleTheme: this.toggleTheme}}>
                <>
                <Button variant={"primary"} onClick={this.toggleTheme}>Toggle Theme</Button>
                {this.props.children}
                </>
            </ThemeContext.Provider>
        )
    }
}
