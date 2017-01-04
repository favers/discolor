import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import Game from './app/game';

export default class discolor extends Component {
    render() {
        return (
            <Game />
        );
    }
}

AppRegistry.registerComponent('discolor', () => discolor);
