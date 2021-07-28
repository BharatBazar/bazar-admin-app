import * as React from 'react';
import { Pressable, ViewStyle } from 'react-native';
import Ripple from 'react-native-material-ripple';

export interface WrappedRectangleButtonProps {
    containerStyle?: ViewStyle[] | ViewStyle;
    children: React.ReactChild;
    onPress: Function;
    rippleRadius?: number;
}

const WrappedRectangleButton: React.FC<WrappedRectangleButtonProps> = ({
    containerStyle,
    children,
    onPress,
    rippleRadius,
}) => {
    return (
        <Pressable
            android_ripple={{ color: '#00000033', radius: rippleRadius || 200 }}
            onPress={() => {
                onPress();
            }}
            style={[containerStyle]}
        >
            {children && children}
        </Pressable>
    );
};

export default WrappedRectangleButton;
