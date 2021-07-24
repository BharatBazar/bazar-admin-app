import * as React from 'react';
import { Button, Linking, Platform, ScrollView, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { fs14, fs18, NavigationProps } from '../../common';
import { borderColor, mainColor } from '../../common/color';
import {
    BC,
    BGCOLOR,
    BR,
    BW,
    FDR,
    FLEX,
    HP,
    MT,
    PH,
    PV,
    AIC,
    JCC,
    MV,
    colorTransparency,
    ML,
} from '../../common/styles';
import Header from '../../component/Header';
import WrappedDropDown from '../../component/WrappedDropDown';
import WrappedFeatherIcon from '../../component/WrappedFeatherIcon';
import LineHeading from '../../component/LineHeading';
import WrappedText from '../../component/WrappedText';
import { ToastHOC } from '../../core/Toast';
import { getShop, updateShop } from '../../server/api/shop/shop.api';
import {
    IRShop,
    Shop,
    shopMemberInterface,
    shopMemberRole,
    verificationStatus,
} from '../../server/api/shop/shop.interface';
import Loader from '../../component/Loader';
export interface ShopDetailsProps extends NavigationProps {
    route: {
        params: {
            shop: Partial<Shop>;
        };
    };
}

const SectionHorizontal = (propertyName: string, value: string) => (
    <View style={[FDR(), JCC('space-between'), MV(0.1)]}>
        <WrappedText text={propertyName} fontSize={fs14} />

        <WrappedText text={value} textColor={'#8a8a8a'} fontSize={fs14} />
    </View>
);

const SectionVertical = (propertyName: string, value: string) => (
    <View style={[MV(0.1)]}>
        <WrappedText text={propertyName} fontSize={fs14} />

        <WrappedText text={value} textColor={'#8a8a8a'} fontSize={fs14} />
    </View>
);

const showMemberDetails = (details: shopMemberInterface[], role: shopMemberRole, dukanName: string) => {
    const callNumber = (phone) => {
        console.log('callNumber ----> ', phone);
        let phoneNumber = phone;
        if (Platform.OS !== 'android') {
            phoneNumber = `telprompt:${phone}`;
        } else {
            phoneNumber = `tel:${phone}`;
        }
        Linking.canOpenURL(phoneNumber)
            .then((supported) => {
                if (!supported) {
                    ToastHOC.errorAlert('Phone number is not available');
                } else {
                    return Linking.openURL(phoneNumber);
                }
            })
            .catch((err) => {
                ToastHOC.errorAlert(err);
            });
    };
    const sendWhatsApp = (phone) => {
        let msg = 'type something';
        console.log('callNumber ----> ', phone);
        let phoneNumber = phone;
        if (Platform.OS !== 'android') {
            phoneNumber = `telprompt:${phone}`;
        } else {
            phoneNumber = `tel:${phone}`;
        }
        if (phoneNumber) {
            if (msg) {
                let url = 'whatsapp://send?' + 'phone=' + phoneNumber;
                Linking.openURL(url)
                    .then((data) => {
                        console.log('WhatsApp Opened');
                    })
                    .catch(() => {
                        ToastHOC.errorAlert('Make sure WhatsApp installed on your device');
                    });
            } else {
                ToastHOC.errorAlert('Please insert message to send');
            }
        } else {
            ToastHOC.errorAlert('Please insert mobile no');
        }
    };

    if (details.length == 0) {
        return <WrappedText text={'There is no ' + role + ' in your shop.'} />;
    } else {
        return details.map((item) => (
            <View style={[PV(0.2), MT(0.1), PH(), BGCOLOR('#FFFFFF')]}>
                <View style={[FDR(), JCC('space-between'), AIC()]}>
                    <WrappedText text={dukanName + ' ' + role + ' details'} textColor={mainColor} fontSize={fs18} />
                    <View style={[FDR()]}>
                        <WrappedFeatherIcon
                            iconName={'phone-call'}
                            onPress={() => {
                                callNumber(item.phoneNumber);
                            }}
                        />
                        <WrappedFeatherIcon
                            iconName={'message-circle'}
                            onPress={() => {
                                sendWhatsApp(item.phoneNumber);
                            }}
                            containerStyle={[ML(0.2)]}
                        />
                    </View>
                </View>
                <View style={[MT(0.1)]} />
                {SectionHorizontal('First Name', item.firstName)}
                {SectionHorizontal('Last Name', item.lastName)}
                {SectionHorizontal('Phone Number', '+91 ' + item.phoneNumber)}
            </View>
        ));
    }
};

const shopDetails = (shop: Partial<Shop>) => {
    return (
        <View style={[PV(0.2), MT(0.1), PH(), BGCOLOR('#FFFFFF')]}>
            <View style={[]}>
                <WrappedText text={shop.shopName + ' address details'} textColor={mainColor} fontSize={fs18} />
                <WrappedText text={shop.localAddress} textColor={'#8a8a8a'} fontSize={fs14} />
            </View>
            <View style={[MT(0.1)]} />
            {SectionHorizontal('State', shop.state.name)}
            {SectionHorizontal('City', shop.city.name)}
            {SectionHorizontal('Area', shop.area.name)}
            {SectionHorizontal('Pincode', shop.pincode)}
        </View>
    );
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
    const [loader, setLoader] = React.useState(false);
    const [dukanName, setDukanName] = React.useState<string>('');
    const [verificationStatuss, setVerificationStatus] = React.useState<string>(verificationStatus.registered);

    async function getShopFromServer() {
        try {
            setLoader(true);
            const response: IRShop = await getShop({ _id: shop._id });
            setLoader(false);
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
            setLoader(false);
            ToastHOC.errorAlert(error.message);
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
            <ScrollView style={[FLEX(1)]} nestedScrollEnabled={true}>
                <View style={[MT(0.2), BGCOLOR('#FFFFFF'), PV(0.2), PH(0.5)]}>
                    <WrappedText text={shopD.shopName + ' verificaiton status'} />
                    <View style={[MT(0.1)]} />
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
                            console.log('VAlue =>', value);
                            setVerificationStatus(value);
                        }}
                        placeholder={'Verification Status'}
                    />

                    <View style={{ zIndex: -1 }}>
                        <WrappedText
                            text={'Provide message for dukandar about verification.'}
                            containerStyle={[MT(0.4)]}
                        />
                        <TextInput
                            value={''}
                            onChangeText={(experience) => {}}
                            placeholder={'Message for dukandar '}
                            style={[HP(2), { borderWidth: 0.18 }, BC('#646464'), BR(0.05), PH(0.2), PV(0.1), MT(0.2)]}
                            placeholderTextColor={'#58595B'}
                            textAlignVertical={'top'}
                            multiline={true}
                        />
                    </View>
                    <View style={[MT(0.2)]} />
                    <Button title={'Save'} onPress={() => {}} />
                </View>
                <View>{shopDetails(shopD)}</View>
                {showMemberDetails(owner, shopMemberRole.Owner, shopD.shopName)}
                {showMemberDetails(coOwner, shopMemberRole.coOwner, shopD.shopName)}
                {showMemberDetails(worker, shopMemberRole.worker, shopD.shopName)}
            </ScrollView>
            {loader && <Loader />}
        </View>
    );
};

export default ShopDetails;
