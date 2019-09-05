import React from 'react';
import Map from './components/Map'


import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
    "Unrecognized WebSocket",
    "Warning: componentWillReceiveProps is deprecated",
    "Warning: componentWillMount is deprecated",
    "Warning: Can't perform a React state update"
]);

const App = () => <Map />

export default App