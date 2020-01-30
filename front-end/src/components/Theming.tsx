import React from 'react';
import themeColors from './Theming.module.scss';

export const ThemeContext = React.createContext({
    theme: themeColors.light,
    toggleTheme: () => {}
});

export default class Theming extends React.Component {
    state = {
        theme: 'red' 
    }

    constructor(props: any) {
        super(props);
        this.toggleTheme = this.toggleTheme.bind(this);
    }

    toggleTheme() {
        this.setState((state: any) => {
            state.theme = (state.theme === 'green' ? 'red' : 'green')
            return state;
        }, () => this.forceUpdate());
    };

    render() {
        return (
            <ThemeContext.Provider value={{theme: this.state.theme, toggleTheme: this.toggleTheme}}>
                <style>
                    {`:root{--primary:${this.state.theme}}`}
                </style>
                {this.props.children}
            </ThemeContext.Provider>
        )
    }
}
