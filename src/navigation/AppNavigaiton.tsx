import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { TransitionSpec } from '@react-navigation/stack/lib/typescript/src/types';
import { Easing } from 'react-native-reanimated';
import { initializeAxios, setUpAxios } from '../server';
import { NavigationKey } from '../labels';
import { Right } from './NavigationEffect';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ListShop from '../screens/shop/ListShop';
import ShopDetails from '../screens/shop/ShopDetails';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const config: TransitionSpec = {
    animation: 'timing',
    config: {
        duration: 150,
        easing: Easing.linear,
    },
};
class AppNavigation extends React.Component {
    constructor(props) {
        super(props);
        initializeAxios();
    }
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                        transitionSpec: {
                            open: config,
                            close: config,
                        },
                    }}
                    initialRouteName={NavigationKey.LISTSHOP}
                >
                    <Stack.Screen
                        name={NavigationKey.LISTSHOP}
                        component={ListShop}
                        options={{ cardStyleInterpolator: Right }}
                    />
                    <Stack.Screen
                        name={NavigationKey.SHOPDETAILS}
                        component={ShopDetails}
                        options={{
                            cardStyleInterpolator: Right,
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

export default AppNavigation;
