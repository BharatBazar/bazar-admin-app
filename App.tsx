/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type { Node } from 'react';
import { View } from 'react-native';
import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';

const App: () => Node = () => {
    return (
        <>
            <StatusBar translucent={true} backgroundColor={'#00000000'} />
            <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}></View>
        </>
    );
};

export default App;
