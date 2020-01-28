import React from 'react';

const darkTheme = {
    h1: {
        color: 'red'
    }
}


export const context = React.createContext(darkTheme);

export default class Theming extends React.Component {

}
