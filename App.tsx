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
import AppNavigation from './src/navigation/AppNavigaiton';
import { initializeAxios } from './src/server';

const App: () => Node = () => {
    React.useEffect(() => {
        initializeAxios();
        return () => {};
    }, []);

    return (
        <>
            <StatusBar translucent={true} backgroundColor={'#00000000'} />
            <AppNavigation />
        </>
    );
};

export default App;
