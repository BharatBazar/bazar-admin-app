import * as React from 'react';
import { View, Image } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { FontFamily, fs12, fs14, fs16, fs17 } from '../../../common';
import { mainColor } from '../../../common/color';
import { getHP, getWP } from '../../../common/dimension';
import {
    BC,
    BGCOLOR,
    BW,
    FDR,
    FLEX,
    PH,
    provideShadow,
    PV,
    BR,
    HP,
    AIC,
    JCC,
    MH,
    MT,
    colorTransparency,
} from '../../../common/styles';
import WrappedRectangleButton from '../../../component/WrappedRectangleButton';
import WrappedText from '../../../component/WrappedText';
import { SvgIconList } from '../../../image/svg';
import HandleSvg from '../../../image/svg/HandleSvg';
import { Shop } from '../../../server/api/shop/shop.interface';

export enum IrequestStatus {
    accepted = 'Accepted',
    rejected = 'Rejected',
    processing = 'Processing',
    completed = 'Completed',
    registered = 'Registered',
}

export interface ShopCardProps {
    onPress: Function;
    shop: Partial<Shop>;
}

const ShopCard: React.FC<ShopCardProps> = ({
    shop: { shopName, localAddress, verificationStatus, isVerified },
    onPress,
}) => {
    return (
        <Ripple
            style={[FDR(), BGCOLOR('#FFFFFF'), BR(0.1), PV(0.2), { borderBottomWidth: 1, borderColor: '#e5e5e5' }]}
            onPress={() => {
                onPress && onPress();
            }}
        >
            <View style={[FLEX(4), JCC()]}>
                <WrappedText
                    text={shopName}
                    fontSize={fs16}
                    textColor={'#1f1f1f'}
                    fontFamily={FontFamily.RobotoMedium}
                />
                <WrappedText
                    text={localAddress}
                    fontSize={fs12}
                    containerStyle={[MT(0.1)]}
                    numberOfLines={1}
                    textColor={'#c1c0c9'}
                    fontFamily={FontFamily.RobotoRegular}
                />
            </View>
            <View style={[FLEX(3), FDR(), JCC('flex-end'), AIC()]}>
                <WrappedRectangleButton
                    containerStyle={[
                        PH(0.3),
                        PV(0.05),
                        BGCOLOR(
                            verificationStatus === IrequestStatus.completed ||
                                verificationStatus === IrequestStatus.accepted
                                ? mainColor
                                : verificationStatus == IrequestStatus.processing
                                ? '#f5a35d'
                                : verificationStatus == IrequestStatus.rejected
                                ? '#e81870'
                                : '#dfe3e5',
                        ),
                        BR(0.05),
                        AIC(),
                        JCC(),
                    ]}
                    onPress={() => {}}
                >
                    <WrappedText
                        text={verificationStatus}
                        textColor={'#FFFFFF'}
                        fontFamily={FontFamily.RobotoRegular}
                        fontSize={fs12}
                    />
                </WrappedRectangleButton>
                {HandleSvg({ marginLeft: getWP(0.5) }, '#1f1f1f', SvgIconList.RightArrowIcon, '14', '14')}
            </View>
        </Ripple>
    );
};

export default ShopCard;
