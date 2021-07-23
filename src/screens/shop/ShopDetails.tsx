import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { fs14, fs18, NavigationProps } from '../../common';
import { borderColor, mainColor } from '../../common/color';
import { BC, BGCOLOR, BR, BW, FDR, FLEX, HP, MT, PH, PV, AIC, JCC, MV, colorTransparency } from '../../common/styles';
import Header from '../../component/Header';
import WrappedDropDown from '../../component/WrappedDropDown';
import WrappedFeatherIcon from '../../component/WrappedFeatherIcon';
import WrappedText from '../../component/WrappedText';
import { getShop, updateShop } from '../../server/api/shop/shop.api';
import {
    IRShop,
    Shop,
    shopMemberInterface,
    shopMemberRole,
    verificationStatus,
} from '../../server/api/shop/shop.interface';

export interface ShopDetailsProps extends NavigationProps {
    route: {
        params: {
            shop: Partial<Shop>;
        };
    };
}

const Section = (propertyName: string, value: string) => (
    <View style={[FDR(), JCC('space-between'), MV(0.1)]}>
        <WrappedText text={propertyName} fontSize={fs14} />

        <WrappedText text={value} textColor={'#8a8a8a'} fontSize={fs14} />
    </View>
);

const showMemberDetails = (details: shopMemberInterface[], role: shopMemberRole, dukanName: string) => {
    if (details.length == 0) {
        return <WrappedText text={'There is no ' + role + ' in your shop.'} />;
    } else {
        return details.map((item) => (
            <View style={[PV(0.2), MV(), PH(), BR(0.1), BGCOLOR('#FFFFFF')]}>
                <View style={[FDR(), JCC('space-between'), AIC()]}>
                    <WrappedText text={dukanName + ' ' + role + ' details'} textColor={mainColor} fontSize={fs18} />
                </View>
                <View style={[MT(0.1)]} />
                {Section('First Name', item.firstName)}
                {Section('Last Name', item.lastName)}
                {Section('Phone Number', item.phoneNumber)}
            </View>
        ));
    }
};

const ShopDetails: React.SFC<ShopDetailsProps> = ({
    route: {
        params: { shop },
    },
    navigation,
}) => {
    const [shopD, setShop] = React.useState<Partial<Shop>>({});
    const [owner, setOwnerDetails] = React.useState<[]>([]);
    const [coOwner, setcoOwner] = React.useState<shopMemberInterface[]>([]);
    const [worker, setWorker] = React.useState<shopMemberInterface[]>([]);
    const [dukanName, setDukanName] = React.useState<string>('');
    const [verificationStatuss, setVerificationStatus] = React.useState<string>(verificationStatus.registered);

    async function getShopFromServer() {
        try {
            const response: IRShop = await getShop({ _id: shop._id });
            if (response.status == 1) {
                const shop = response.payload;
                setShop(shop);
                if (shop.owner) {
                    setOwnerDetails([{ ...shop.owner }]);
                }
                if (shop.coOwner.length > 0) {
                    setcoOwner(shop.coOwner);
                }
                if (shop.worker.length > 0) {
                    setWorker(shop.worker);
                }
            }
        } catch (error) {
            console.log('error', error);
        }
    }

    async function updateShopFromServer(data: Partial<Shop>) {
        try {
            const response: IRShop = await updateShop(data);
        } catch (error) {
            console.log('error', error);
        }
    }

    React.useEffect(() => {
        getShopFromServer();
        return () => {};
    }, []);

    return (
        <View style={[FLEX(1)]}>
            <Header screenName={shop.shopName} onPress={navigation.goBack} />
            <ScrollView style={[FLEX(1)]}>
                <View style={[MT(0.2), BGCOLOR('#FFFFFF'), PV(0.2), PH(0.5)]}>
                    <WrappedText text={shopD.shopName + ' verificaiton status'} />
                    <WrappedDropDown
                        data={[
                            { label: verificationStatus.registered, value: verificationStatus.registered },
                            { label: verificationStatus.processing, value: verificationStatus.processing },
                            { label: verificationStatus.verified, value: verificationStatus.verified },
                            { label: verificationStatus.rejected, value: verificationStatus.rejected },
                        ]}
                        callBack={() => {}}
                        arrowColor={'#ff5c01' + colorTransparency[60]}
                        zIndex={5000}
                        zIndexInverse={4000}
                        selectValue={verificationStatuss}
                        setValue={(value) => {
                            setVerificationStatus(value);
                        }}
                        placeholder={'Verification Status'}
                    />
                    <View style={{ zIndex: -1 }}>
                        <TextInput
                            value={''}
                            onChangeText={(experience) => {}}
                            placeholder={'Message for dukandar '}
                            style={[HP(2), { borderWidth: 0.18 }, BC('#646464'), BR(0.1), PH(0.2), PV(0.1), MT(0.2)]}
                            placeholderTextColor={'#58595B'}
                            multiline={true}
                        />
                    </View>
                </View>
                {showMemberDetails(owner, shopMemberRole.Owner, shopD.shopName)}
                {showMemberDetails(coOwner, shopMemberRole.coOwner, shopD.shopName)}
                {showMemberDetails(worker, shopMemberRole.worker, shopD.shopName)}
            </ScrollView>
        </View>
    );
};

export default ShopDetails;
