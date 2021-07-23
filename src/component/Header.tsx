import React from 'react';
import { View } from 'react-native';
import { getHP } from '../common/dimension';
import { AIC, BGCOLOR, BR, FDR, H, ML, PH, provideShadow, PV } from '../common/styles';
import WrappedText from './WrappedText';
import WrappedRoundButton from './WrappedRoundButton';
import StatusBar from './StatusBar';
import { FontFamily, fs18, fs21 } from '../common';
import HandleSvg from '../image/svg/HandleSvg';
import { SvgIconList } from '../image/svg';
import { mainColor } from '../common/color';

export interface HeaderProps {
    screenName: string;
    onPress: Function;
    arrowColor?: string;
    backgroundColor?: string;
    headingColor?: string;
}

const Header: React.SFC<HeaderProps> = ({ screenName, onPress, headingColor, backgroundColor, arrowColor }) => {
    return (
        <View>
            <StatusBar statusBarColor={backgroundColor || mainColor} />
            <View style={[FDR(), AIC(), PV(0.1), BGCOLOR(backgroundColor || mainColor), PH(0.4)]}>
                <WrappedRoundButton
                    onPress={() => {
                        onPress();
                    }}
                    containerStyle={[{}, BR(3)]}
                    height={getHP(0.35)}
                >
                    {HandleSvg({}, headingColor, SvgIconList.BackArrowIcon, '', '')}
                </WrappedRoundButton>
                <WrappedText
                    text={screenName}
                    fontSize={fs18}
                    textColor={headingColor || '#FFFFFF'}
                    containerStyle={[ML(0.4)]}
                    fontFamily={FontFamily.RobotoMedium}
                />
            </View>
        </View>
    );
};

export default Header;
